import { Cart } from "@/models/Cart";
import { MenuItem } from "@/models/MenuItem";
import { CartItems } from "@/types/cart";
import { MenuItems } from "@/types/menu";
import { NextRequest, NextResponse } from "next/server";


type ProductSize = {
    _id?: string | number;
    name: string;
    price: number;
}

interface CartProducts {
    product: MenuItems,
    quantity: Number,
    sizes: ProductSize,
}

export async function GET(req: NextRequest) {
    try {
        const url = new URL(req?.url);
        const parts = url?.pathname.split('/')
        const email = parts[parts.length - 1];

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ msg: 'Invalid email' }, { status: 400 });
        }

        const cart = await Cart.findOne({ email });

        if (!cart) {
            return NextResponse.json({ msg: 'Cart not found' }, { status: 404 });
        }

        const mappedItems = await Promise.all(cart.items.map(async (item: CartItems) => {
            const menuItem: MenuItems = await MenuItem.findById(item._id);
            return {
                product: menuItem,
                quantity: item.quantity,
                sizes: item.sizes,
            }
        }))

        console.log("isi mapped =>", mappedItems)

        return NextResponse.json({items: mappedItems}, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An erorr occured'}, {status: 500})
    }
}