import { connect } from "@/libs/dbConnect";
import { Cart } from "@/models/Cart";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    
    try {
        const data = await req.json();

        // Periksa apakah email ada dalam data
        const { email, items } = data;
        console.log("dari server ", data)
        if (!email || !Array.isArray(items)) {
            return NextResponse.json({ msg: 'Invalid request data' }, { status: 400 });
        }

        if (items.length > 0) {
            // Membuat array item untuk disimpan dalam schema Cart
            const cartItems = items.map(item => ({
                productId: item.product._id,
                quantity: item.quantity || 1, 
                sizes: item.sizes || "",
            }));

            // Menyimpan data dalam schema Cart
            await Cart.create({email, items: cartItems});
        } else {
            await Cart.create({email, items});
        }

        return NextResponse.json({ msg: 'Cart created successfully' }, {status: 201});

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

        const formattedCart = items.map(p => ({
            productId: p.product._id,
            quantity: p.quantity,
            sizes: p.sizes
        }));

        // Perbarui keranjang belanja
        await Cart.findOneAndUpdate({ email }, { email, items: formattedCart }, { new: true });
        return NextResponse.json({ msg: 'Cart updated successfully'}, {status: 201});
    } catch(error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }
}