import { Transaction } from "@/models/Transaction";
import { TypesTransactionDB } from "@/types/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const transactions: TypesTransactionDB[] = await Transaction.find().lean();
        return NextResponse.json({msg: 'Successfully get all transaction', status: 'success', data: transactions}, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error occured'}, {status: 500});
    }
}