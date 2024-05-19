import { MenuItem } from "@/models/MenuItem";
import { Transaction } from "@/models/Transaction";
import { TypesOrderHistoryDB } from "@/types/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req?.url);
    const email = searchParams.get('email');
    try {
        const userOrderHistory: TypesOrderHistoryDB = await Transaction.find({ email }).lean();
        const allProductIds = userOrderHistory.flatMap((transaction) => transaction.items.map((item) => item.productId));
        const menuItems = await MenuItem.find({ '_id': { '$in': allProductIds } }).lean();
        const productMap = menuItems.reduce((acc, item) => {
            acc[item._id.toString()] = item;
            return acc;
        }, {});
        const transformedOrderHistory = userOrderHistory.map((transaction) => {
            return {
                ...transaction,
                items: transaction.items.map((item) => ({
                    ...item,
                    product: productMap[item.productId.toString()],
                })),   
            }
        })
        return NextResponse.json({msg: 'ok', data: transformedOrderHistory}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An erorr occured'}, {status: 500});
    }
}