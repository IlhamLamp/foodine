import { connect } from "@/libs/dbConnect";
import { Cart } from "@/models/Cart";
import { Transaction } from "@/models/Transaction";
import { TypesTransaction } from "@/types/transaction";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const data: TypesTransaction = await req.json();
        const { email, status } = data;

        if (!email) {
            return NextResponse.json({ msg: 'Invalid request data' }, { status: 400 });
        }

        const cart = await Cart.findOne({ email });
        const userCart = cart.items;

        const formattedTransaction: any = {
            items: userCart,
            status,
            ...data
        }
        
        await Transaction.create(formattedTransaction);
        return NextResponse.json({ msg: 'Transaction created successfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'An error occured'}, {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    try {
        const data: TypesTransaction = await req.json();
        const { email, status } = data;

        if (!email) {
            return NextResponse.json({ msg: 'Invalid request data' }, { status: 400 });
        }

        const cart = await Cart.findOne({ email });
        const userCart = cart.items;

        const formattedTransaction: any = {
            email,
            items: userCart,
            status,
            ...data
        }

        await Transaction.findOneAndUpdate({ email }, formattedTransaction, { new: true });
        return NextResponse.json({ msg: 'Transaction updated succesfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }
}