import { connect } from "@/libs/dbConnect";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    const data = await req.json();
    console.log(data);
    return NextResponse.json({ msg: 'ok', data}, {status: 201});
}