import { connect } from "@/libs/dbConnect";
import { User } from "@/models/User";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        connect();
        const body = await req.json();
        const { email, password } = body;
        const user = await User.findOne({ email });
        const passwordMatch = user && bcrypt.compareSync(password, user.password);
        if (!user || !passwordMatch) {
            return NextResponse.json({ message: "Invalid credentials" }, {status: 400});
        }
        if (passwordMatch) {
            return NextResponse.json({ message: 'Login successful' }, {status: 200});
        }
        
        console.log("Dari sign in: ", user)
        return user;

  } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal Server Error' });
  }
}
