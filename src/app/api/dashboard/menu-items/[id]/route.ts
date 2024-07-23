import { MenuItem } from "@/models/MenuItem";
import { NextRequest, NextResponse } from "next/server";

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