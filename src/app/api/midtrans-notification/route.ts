import { connect } from "@/libs/dbConnect";
import { Transaction } from "@/models/Transaction";
import { midtransNotificationService } from "@/services/MidtransNotificationService";
import { TypesTransactionDB } from "@/types/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    const data = await req.json();

    const transaction: TypesTransactionDB = await Transaction.findOne({ transactionId: data.order_id }).lean();
    if (transaction) {
        const ntf = midtransNotificationService.updateStatusByMidtransResponse(transaction.transactionId, data);
        console.log(ntf);
    }
    return NextResponse.json({ msg: 'ok', data}, {status: 201});
}