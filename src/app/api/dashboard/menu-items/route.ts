import { connect } from "@/libs/dbConnect";
import { MenuItem } from "@/models/MenuItem";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const menuItems = await MenuItem.create(data);
        return NextResponse.json({menuItems}, {status: 201});
    } catch (error: any) {
        return NextResponse.json(error)
    }
}

export async function GET(req: NextRequest) {

    const url = new URL(req?.url);
    const searchParams = new URLSearchParams(url?.searchParams);
    const recentPage = parseInt(searchParams.get('page'), 10);
    const perPage = parseInt(searchParams.get('per_page'), 10);
    const category = searchParams.get('category');
    
    try {
        if (isNaN(recentPage) || recentPage < 1) {
            throw new Error('Invalid page number');
        }
        const skip = (recentPage - 1) * perPage;
        if (category === "All") {
            // Fetch all menu items (unchanged)
            const menuItem = await MenuItem.find({}).skip(skip).limit(perPage);
            const totalItem = await MenuItem.countDocuments({});
            return NextResponse.json({
                menuItem,
                totalItem,
            });
        } else {
            // handle pagination based on category
            const menuItem = await MenuItem.find({ category: category }).skip(skip).limit(perPage);
            const totalItem = await MenuItem.countDocuments({ category: category }); // Count filtered items
            const categoryTotals = await MenuItem.aggregate([ // Calculate category-wise total directly
                { $group: { _id: '$category', count: { $sum: 1 } } },
            ]);
            console.log(categoryTotals);
            const categoryTotalMap = categoryTotals.reduce((acc, cur) => {
                acc[cur._id] = cur.count;
                return acc;
              }, {}); // Convert aggregation result to map
            console.log(categoryTotalMap);
            return NextResponse.json({ menuItem, totalItem, categoryTotalMap });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 }); 
    }
}