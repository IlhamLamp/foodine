import { connect } from "@/libs/dbConnect";
import { Cart } from "@/models/Cart";
import { CartItems, TypesCart } from "@/types/cart";
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

        // Cari keranjang belanja berdasarkan email pengguna
        const existingCart = await Cart.findOne({ email });

        if (existingCart) {
            // Jika keranjang belanja sudah ada, lakukan pembaruan dengan menambahkan item baru
            existingCart.items.push(...items);
            await existingCart.save();
        } else {
            // Jika keranjang belanja belum ada, buat keranjang belanja baru
            await Cart.create(data);
        }

        return NextResponse.json({ msg: 'Cart created successfully' }, {status: 201});

    } catch(error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500})
    }
}

export async function PUT(req: NextRequest) {
    try {
        const data: TypesCart = await req.json();
        console.log(data);
        
        // Periksa apakah email ada dalam data
        const { email, items } = data;
        
        if (!email || !Array.isArray(items)) {
            return NextResponse.json({ msg: 'Invalid request data' }, { status: 400 });
        }

        const formattedCart = items.map((p) => ({
            productId: p.product._id,
            quantity: p.quantity,
            selectedSizes: p.selectedSizes,
            totalPrices: (p.product.basePrice + p.selectedSizes.price) * p.quantity,
        }));

        console.log(formattedCart);

        // Perbarui keranjang belanja
        await Cart.findOneAndUpdate({ email }, { ...data, items: formattedCart, }, { new: true });
        return NextResponse.json({ msg: 'Cart updated successfully'}, {status: 201});
    } catch(error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }
}