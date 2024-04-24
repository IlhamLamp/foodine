import { connect } from "@/libs/dbConnect";
import { MenuItem } from "@/models/MenuItem";
import { NextRequest, NextResponse } from "next/server";

connect();

interface MenuQuery {
    name?: { $regex: RegExp};
}

export async function GET(req: NextRequest) {
    const url = new URL(req?.url);
    const searchParams = new URLSearchParams(url?.searchParams);
    const category = searchParams.get('category');
    const searchQuery = searchParams.get('search')?.trim() || "";

    try {

        const query: MenuQuery = {};
        if (searchQuery !== "") {
            query.name = { $regex: new RegExp(searchQuery, 'i')};
            const searchResult = await MenuItem.find(query);
            return NextResponse.json(searchResult);
        }

        if (category === "All") {
            const menuItem = await MenuItem.find({});
            return NextResponse.json(menuItem);
        } else {
            const menuItem = await MenuItem.find({ category: category });
            return NextResponse.json(menuItem);
        }

    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 }); 
    }
}