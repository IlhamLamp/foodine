import { connect } from "@/libs/dbConnect";
import { Cart } from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    
    try {
        const data = await req.json();
        const cartItem = await Cart.create(data);
        return NextResponse.json({data: cartItem}, {status: 201});
    } catch(error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500})
    }
}