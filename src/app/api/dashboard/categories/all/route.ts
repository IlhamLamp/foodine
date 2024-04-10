import { connect } from "@/libs/dbConnect";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

connect();

export async function GET() {
    try {
        // return NextResponse.json(await Category.find({}));
        const data = await Category.find(); // Fetch all categories
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({msg: "Error getting categories"}, {status: 500});
    }
}