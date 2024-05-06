import { connect } from "@/libs/dbConnect";
import { Cart } from "@/models/Cart";
import { Transaction } from "@/models/Transaction";
import { TypesTransaction } from "@/types/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        return NextResponse.json({ msg: 'Transaction created successfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'An error occured'}, {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    try {
        return NextResponse.json({ msg: 'Transaction updated succesfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }
}