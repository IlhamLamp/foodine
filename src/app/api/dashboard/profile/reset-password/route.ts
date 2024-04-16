import bcrypt from "bcrypt";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const { email, lastPassword, newPassword } = data;

        const user = await User.findOne({ email });
        const filter = { email };
        console.log(filter);
        const passwordMatch = user && await bcrypt.compareSync(lastPassword, user.password);
        console.log(passwordMatch);
        console.log(newPassword)
        // validation
        if (!newPassword?.length || newPassword.length < 5) {
            return NextResponse.json({error: "Password must be at least 5 characters"}, {status: 400});
        }

        if (passwordMatch && newPassword.length >= 5) {
            // hash password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(newPassword, salt);
            await User.updateOne(filter, { password: hashedPassword});
        } else {
            return NextResponse.json({error: "An error occured"}, {status: 500});    
        }

        return NextResponse.json({message: "Succesfully Change Password"}, {status: 200});
    } catch (error: any) {
        console.log(error);
        return NextResponse.json(error);
    }
}