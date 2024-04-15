import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await User.find();
        return NextResponse.json(data, {status: 200});
    } catch (error: any) {
        return NextResponse.json(error, {status: 500})
    }
}