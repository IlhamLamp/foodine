import { Cart } from "@/models/Cart";
import { MenuItem } from "@/models/MenuItem";
import { MenuItems } from "@/types/menu";
import { NextRequest, NextResponse } from "next/server";

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

        const mappedItems = await Promise.all(cart.items.map(async (item) => {
            const menuItem: MenuItems = await MenuItem.findById(item.productId);

            if (!menuItem) {
                // Handle jika MenuItem tidak ditemukan
                return null;
            }

            const matchedSize = menuItem.sizes.find((size) => size._id.toString() === item.selectedSizes._id);  

            return {
                product: menuItem,
                quantity: item.quantity,
                selectedSizes: matchedSize,
                totalPrices: item.totalPrices,
            }
        }))

        const loadedCart = {...cart.toObject(), items: mappedItems}

        return NextResponse.json(loadedCart, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An erorr occured'}, {status: 500})
    }
}