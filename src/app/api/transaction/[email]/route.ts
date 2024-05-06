import { Transaction } from "@/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req?.url);
        const parts = url?.pathname.split('/')
        const email = parts[parts.length - 1];

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ msg: 'Invalid email' }, { status: 400 });
        }

        const transaction = await Transaction.findOne({ email });

        if (!transaction) {
            return NextResponse.json({ msg: 'Transaction not found '}, { status: 404 });
        }

        return NextResponse.json(transaction);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An erorr occured'}, {status: 500})
    }
}