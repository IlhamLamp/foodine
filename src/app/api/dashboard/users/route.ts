import { connect } from "@/libs/dbConnect";
import { DeleteImage, ExtractPublicId } from "@/libs/uploadHandler";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

connect();

interface UserQuery {
    name?: { $regex: RegExp};
}

export async function GET(req: NextRequest) {
    const url = new URL(req?.url);
    const searchParams = new URLSearchParams(url?.searchParams);
    const recentPage = parseInt(searchParams.get('page'), 10);
    const perPage = parseInt(searchParams.get('per_page'), 10);
    const searchQuery = searchParams.get('q')?.trim() || "";

    try {
        if (isNaN(recentPage) || recentPage < 1) {
            throw new Error('Invalid page number');
        }
        const skip = (recentPage - 1) * perPage;

        // build query for filtering
        const query: UserQuery = {};
        if (searchQuery !== "") {
            query.name = { $regex: new RegExp(searchQuery, 'i')};
        }

        // fetch paginated users
        const users = await User.find(query).skip(skip).limit(perPage);
        const totalUser = await User.countDocuments(query);
        return NextResponse.json({
            users,
            totalUser
        }, {status: 200})
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: 'An error occured'}, {status: 500});
    }
}

export async function DELETE(req: NextRequest) {
    const url = new URL(req?.url);
    const _id = url?.searchParams.get('_id');

    // DELETE IMAGE ON CLOUDINARY
    const user = await User.findById(_id);
    if (user && user.image) {
        const publicId = ExtractPublicId(user.image);
        await DeleteImage('profile-image/' + publicId)
    }
    await User.deleteOne({_id});
    return NextResponse.json({ msg: 'Success Delete User'}, { status: 200 })
}