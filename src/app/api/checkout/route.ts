import { connect } from "@/libs/dbConnect";
import { Cart } from "@/models/Cart";
import { Checkout } from "@/models/Checkout";
import { TypesCheckout } from "@/types/checkout";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const data: TypesCheckout = await req.json();
        const { email, status } = data;

        if (!email) {
            return NextResponse.json({ msg: 'Invalid request data' }, { status: 400 });
        }

        const cart = await Cart.findOne({ email });
        const userCart = cart.items;

        const formattedCheckout: any = {
            items: userCart,
            status,
            ...data
        }
        
        await Checkout.create(formattedCheckout);
        return NextResponse.json({ msg: 'Transaction created successfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'An error occured'}, {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    try {
        const data: TypesCheckout = await req.json();
        const { email, status } = data;

        if (!email) {
            return NextResponse.json({ msg: 'Invalid request data' }, { status: 400 });
        }

        const cart = await Cart.findOne({ email });
        const userCart = cart.items;

        const formattedCheckout: any = {
            email,
            items: userCart,
            status,
            ...data
        }

        await Checkout.findOneAndUpdate({ email }, formattedCheckout, { new: true });
        return NextResponse.json({ msg: 'Transaction updated succesfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }
}