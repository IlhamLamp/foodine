import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";
import { connect } from "@/libs/dbConnect";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        allowDangerousEmailAccountLinking: true,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID ,
        clientSecret: process.env.FACEBOOK_SECRET,
      }),
      CredentialsProvider({
        name: 'Credentials',
        id: 'credentials',
        credentials: {
          email: { label: "Email", type: "email", placeholder: "test@example.com" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          const email = credentials?.email;
          const password = credentials?.password;
          if(!email || !password) return null;
  
          try {
            connect();
            const user = await User.findOne({email});
            const passwordOk = user && bcrypt.compareSync(password, user.password);
  
            if (passwordOk) {
              return user;
            }
  
            return null;
    
          } catch (e) {
            console.error(e);
            return null;
          }
        }
      })
    ],
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ user, account}: { user: any; account: any}) {
        if (account.provider !== "google") {
          return user;
        }
        console.log(user);
        console.log(account);
        try {
          const { name, email } = user;
          await connect();

          const existingUser = await User.findOne({ email });
          if (existingUser) {
            return existingUser;
          }

          const newUser = new User({ name, email });
          const savedUser = await newUser.save();

          if (savedUser) {
            return savedUser;
          } else {
            console.error("Error creating user");
            throw new Error("Failed to create user during Google sign-in");
          }
        } catch (error) {
          console.error("Error signing in with Google:", error);
          throw error;
        }
      },
      async jwt({token, user}) {
        if (user) {
          token.email = user.email;
          token.name = user.name;
        }
        return token;
      },
      async session({session, token}:{session: any, token: any}) {
        if (session.user) {
          session.user.email = token.email;
          session.user.name = token.name;
        }
        console.log("this session ->", session);
        return session;
      },
    },
    pages: {
      signIn: "/login"
    },
  }
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST }