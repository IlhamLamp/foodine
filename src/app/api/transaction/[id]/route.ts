import { MenuItem } from "@/models/MenuItem";
import { Transaction } from "@/models/Transaction";
import { TypesCartItemsDatabase } from "@/types/cart";
import { MenuItems } from "@/types/menu";
import { TypesTransactionDB } from "@/types/transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req?.url);
        const transactionId = pathname.split('/').pop();

        const transaction: TypesTransactionDB = await Transaction.findOne({ transactionId }).lean();
        if (!transaction) return NextResponse.json({msg: `${transactionId} not found`}, {status: 400});

        const mappedItems = await Promise.all(transaction.items.map(async (item: TypesCartItemsDatabase) => {
            const menuItem: MenuItems = await MenuItem.findById(item.productId);
            if (!menuItem) return null;
            const matchedSize = menuItem.sizes.find((size) => size._id.toString() === item.selectedSizes._id);  

            return {
                product: menuItem,
                quantity: item.quantity,
                selectedSizes: matchedSize,
                totalPrices: item.totalPrices,
            }
        }))

        const transformedTransactionHistory = {...transaction, items: mappedItems}

        return NextResponse.json({ msg: 'ok', data: transformedTransactionHistory}, {status: 200})
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error occured'}, {status: 500});
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { pathname } = new URL(req?.url);
        const transactionId = pathname.split('/').pop();

        const transaction: TypesTransactionDB = await Transaction.findOne({ transactionId }).lean();
        if (!transaction) return NextResponse.json({msg: `${transactionId} not found`}, {status: 400});

        await Transaction.deleteOne({_id: transaction._id});
        return NextResponse.json({msg: 'Successfully Delete Tranasction'}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error occured'}, {status: 500});
    }
}