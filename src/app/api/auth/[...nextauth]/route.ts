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
    secret: process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET
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
    // session: {
    //   strategy: "jwt",
    // },
    pages: {
      signIn: "/login"
    },
  }
  
  const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST }