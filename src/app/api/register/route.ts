import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { connect } from "@/libs/dbConnect";
import bcrypt from 'bcrypt';

connect();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        const user = await User.findOne({ where: { email } });
        if(user) {
            return NextResponse.json({error: "Email already exists"}, {status: 400});
        }

        if (!password?.length || password.length < 5) {
            return NextResponse.json({error: "Password must be at least 5 characters"}, {status: 400});
        }

        // extract name
        const extractedName = email.split('@')[0] || '';

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
            name: extractedName,
            email,
            password: hashedPassword,
            image: '',
        })
        return NextResponse.json(newUser, {status: 201});
    } catch (error: any) {
        return NextResponse.json(error);
    }
}