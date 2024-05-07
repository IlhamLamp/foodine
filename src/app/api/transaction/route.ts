import { connect } from "@/libs/dbConnect";
import { Cart } from "@/models/Cart";
import { Checkout } from "@/models/Checkout";
import { MenuItem } from "@/models/MenuItem";
import { Transaction } from "@/models/Transaction";
import { TypesCheckout } from "@/types/checkout";
import { MenuItems } from "@/types/menu";
import { TypesMidtransPayload } from "@/types/midtrans";
import { TypesTransaction } from "@/types/transaction";
import { MIDTRANS_AUTH_STRING, MIDTRANS_SERVER_KEY } from "@/utils/constant";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const data: TypesTransaction = await req.json();
        const { email } = data;

        if (!email) {
            return NextResponse.json({ msg: 'Invalid request data'}, {status: 400});
        }

        const checkout: TypesCheckout = await Checkout.findOne({ email });
        const cart = checkout.items;
        const userTransactionId = checkout.transactionId;

        const mappedItems = await Promise.all(cart.map(async (item) => {
            const menuItem: MenuItems = await MenuItem.findById(item.productId);

            if (!menuItem) {
                // Handle jika MenuItem tidak ditemukan
                return null;
            }

            const matchedSize = menuItem.sizes.find((size) => size._id.toString() === item.selectedSizes);
            return {
                id: menuItem._id,
                price: item.totalPrice,
                quantity: item.quantity,
                name: menuItem.name,
                selectedSizes: matchedSize.name,
            }
        }));

        const payload = {
            transaction_details: {
                order_id: userTransactionId,
                gross_amount: data.totalTransactionPrice,
            },
            item_details: mappedItems,
        }

        console.log(payload);
        
        return NextResponse.json({ msg: 'Transaction created successfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'An error occured'}, {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    try {
        return NextResponse.json({ msg: 'Transaction updated succesfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }
}