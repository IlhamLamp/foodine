import { connect } from "@/libs/dbConnect";
import { MenuItem } from "@/models/MenuItem";
import { TypesCartItemsDatabase } from "@/types/cart";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(req: NextRequest) {
    try {
        const { pathname } = new URL(req?.url);
        const id = pathname.split('/').pop();
        const menuItems = await MenuItem.findOne({ _id: id}).lean();
        if (!menuItems) return NextResponse.json({msg: `${id} not found`}, {status: 400});
        return NextResponse.json({msg: 'ok', data: menuItems}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An erorr occured'}, {status: 500})
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { pathname } = new URL(req?.url);
        const data: any = await req.json();
        const items: TypesCartItemsDatabase[] | any = data.items;
        if (!Array.isArray(items)) {
            throw new Error("Invalid data format: items is not an array");
        }
        const id = pathname.split('/').pop();
        // FEATURE: STOCK UPDATE
        // if (id === 'updateProductsStock') {
        //     const updatePromises = items.map((item) => {
        //         const productId = item.productId.$oid;
        //         return MenuItem.findOneAndUpdate(
        //             { _id: new mongoose.Types.ObjectId(productId) },
        //             { $inc: { stock: -item.quantity } }
        //         ).exec();
        //     });
        //     await Promise.all(updatePromises);
        //     return NextResponse.json({ msg: 'Stock updated successfully!' });
        // }
        return NextResponse.json({ msg: 'Invalid path' }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An erorr occured'}, {status: 500});
    }
}