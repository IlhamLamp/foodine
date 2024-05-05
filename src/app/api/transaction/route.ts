import { connect } from "@/libs/dbConnect";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'An error occured'}, {status: 500});
    }
}