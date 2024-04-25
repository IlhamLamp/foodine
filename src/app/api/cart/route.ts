import { connect } from "@/libs/dbConnect";
import { Cart } from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    
    try {
        const data = await req.json();

        // Periksa apakah email ada dalam data
        const { email, items } = data;
        if (!email || !Array.isArray(items)) {
            return NextResponse.json({ msg: 'Invalid request data' }, { status: 400 });
        }

        // Membuat array item untuk disimpan dalam schema Cart
        // const cartItems = items.map(item => ({
        //     _id: item._id,
        //     quantity: item.quantity || 1, 
        //     sizes: item.sizes || "",
        // }));

        // Menyimpan data dalam schema Cart
        // const cart = await Cart.findOneAndUpdate({ email },
        //     { email, $push: { items: { $each: cartItems } } }, 
        //     { upsert: true, new: true },
        // );

        return NextResponse.json({ msg: 'Cart updated successfully' }, {status: 201});

    } catch(error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500})
    }
}

export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();

        // Periksa apakah email ada dalam data
        const { email, items } = data;
        if (!email || !Array.isArray(items)) {
            return NextResponse.json({ msg: 'Invalid request data' }, { status: 400 });
        }

        // Perbarui keranjang belanja
        const cart = await Cart.findOneAndUpdate({ email }, { email, items }, { new: true });
        console.log("isi dari cart => ", cart);
        return NextResponse.json({ msg: 'Cart updated successfully'}, {status: 201});
    } catch(error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }
}