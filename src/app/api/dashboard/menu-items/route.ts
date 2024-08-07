import { connect } from "@/libs/dbConnect";
import { DeleteImage, ExtractPublicId } from "@/libs/uploadHandler";
import { MenuItem } from "@/models/MenuItem";
import { NextRequest, NextResponse } from "next/server";

connect();

interface MenuQuery {
    name?: { $regex: RegExp };
}

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
    const searchQuery = searchParams.get('q')?.trim() || "";
    const category = searchParams.get('category');
    
    try {
        if (isNaN(recentPage) || recentPage < 1) {
            throw new Error('Invalid page number');
        }
        const skip = (recentPage - 1) * perPage;

        // filtering
        const query: MenuQuery = {};
        if (searchQuery !== "") {
            query.name = { $regex: new RegExp(searchQuery, 'i')};
        }

        if (category === "All") {
            // Fetch all menu items (unchanged)
            const menuItem = await MenuItem.find(query).skip(skip).limit(perPage);
            const totalItem = await MenuItem.countDocuments(query);
            return NextResponse.json({
                menuItem,
                totalItem,
            }, {status: 200});
        } else {
            // handle pagination based on category
            const menuItem = await MenuItem.find({ category: category }).skip(skip).limit(perPage);
            const totalItem = await MenuItem.countDocuments({ category: category }); // Count filtered items
            const categoryTotals = await MenuItem.aggregate([ // Calculate category-wise total directly
                { $group: { _id: '$category', count: { $sum: 1 } } },
            ]);
            const categoryTotalMap = categoryTotals.reduce((acc, cur) => {
                acc[cur._id] = cur.count;
                return acc;
              }, {}); // Convert aggregation result to map
            return NextResponse.json({ menuItem, totalItem, categoryTotalMap });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 }); 
    }
}

export async function PUT(req: NextRequest) {
    try {
        const { _id, ...data } = await req.json();
        const modifiedMenu = await MenuItem.findByIdAndUpdate(_id, data);
        return NextResponse.json(modifiedMenu, {status: 202});
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 }); 
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const url = new URL(req?.url);
        const _id = url?.searchParams.get('_id');

        // DELETE IMAGE ON CLOUDINARY
        const menuItems = await MenuItem.findById(_id);
        if (menuItems && menuItems.image) {
            const publicId = ExtractPublicId(menuItems.image);
            await DeleteImage('menu-items/' + publicId)
        }
        await MenuItem.deleteOne({_id});
        return NextResponse.json({ msg: 'Succes Delete Menu'}, { status: 200 })
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'An error occured' }, { status: 500 });
    }
}