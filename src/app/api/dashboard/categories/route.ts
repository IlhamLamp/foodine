import { connect } from "@/libs/dbConnect";
import { Category } from "@/models/Category";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const { name } = await req.json();
        const categoryDoc = await Category.create({ name });
        return Response.json(categoryDoc);
    } catch (error: any) {
        console.log(error)
    }
}

export async function PUT(req: NextRequest) {
    try {
        const {_id, name} = await req.json();
        await Category.updateOne({_id}, {name});
        return NextResponse.json(true);
    } catch (error: any) {
        console.log(error);
    }
}

export async function GET(req: NextRequest) {
    const url = new URL(req?.url);
    const searchParams = new URLSearchParams(url?.searchParams);
    const recentPage = parseInt(searchParams.get('page'), 10);
    const perPage = parseInt(searchParams.get('per_page'), 10);
    
    try {
        if (isNaN(recentPage) || recentPage < 1) {
            throw new Error('Invalid page number');
        }
        const skip = (recentPage - 1) * perPage;

        // Fetch paginated categories
        const categories = await Category.find({}).skip(skip).limit(perPage);
        const totalItem = await Category.countDocuments({});
        return NextResponse.json({
            categories,
            totalItem,
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 }); 
    }
}

export async function DELETE(req: any) {
    try {
        const url = new URL(req?.url);
        const _id = url.searchParams.get('_id');
        await Category.deleteOne({_id});
        return Response.json(true);
    } catch (error: any) {
        return NextResponse.json(error);
    }
}