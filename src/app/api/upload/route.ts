import { connect } from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { DeleteImage, ExtractPublicId, UploadImage } from "@/libs/uploadHandler";
import { User } from "@/models/User";
import { MenuItem } from "@/models/MenuItem";
import { MenuItems } from "@/types/menu";
import { UserInformation } from "@/types/user-information";
import { authOptions } from "@/utils/authOptions";

interface FormData {
    form: any;
    path: string | null;
    image: any;
    uid: string;
}

connect();

async function UsersFromAdminUpload(formData: FormData) {
    const user: UserInformation = await User.findById(formData.uid);
    try {
        const data: any = await UploadImage(formData.image, "profile-image");
        const img_link = data?.secure_url;
        if (user && user.image) {
            const publicId = ExtractPublicId(user.image);
            await DeleteImage('profile-image/' + publicId)
            await User.updateOne({email: user.email}, {image: img_link})
        }
        return NextResponse.json(img_link, {status:200});
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({msg: "Error uploading profile menu"}, {status: 500})
    }
}

async function MenuItemUpload(formData: FormData) {
    try {
        const data: any = await UploadImage(formData.image, "menu-items");
        const img_link = data?.secure_url;

        if (formData?.uid !== 'new') {
            const menuItem: MenuItems = await MenuItem.findById(formData.uid) ?? null;

            if (!menuItem) {
                return NextResponse.json({msg: "Menu item with id not found"}, {status: 404})
            }

            const publicId = ExtractPublicId(menuItem.image);
            await DeleteImage('menu-items/'+publicId);
            await MenuItem.updateOne({_id: formData.uid}, {image: img_link});
            return NextResponse.json(img_link, {status: 200})    
        }
        return NextResponse.json(img_link, {status: 200})
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({msg: "Error uploading profile menu"}, {status: 500})
    }
}

async function ProfileImageUpload(formData: FormData) {
    try {
        const session = await getServerSession(authOptions);
        const email = session.user?.email;
        const userPreviousProfile = session.user?.image;
        const publicId = ExtractPublicId(userPreviousProfile);
    
        await DeleteImage('profile-image/'+publicId);
        const data: any = await UploadImage(formData.image, "profile-image");
        const imgLink: any = data?.secure_url;
        await User.updateOne({email}, {image: imgLink});
        
        return NextResponse.json(imgLink, {status: 200});
    } catch (error: any) {
        return NextResponse.json(error);
    }
}

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const path = formData.get('path') as string;
        const image = formData.get('file') as unknown as File;
        const uid = formData.get('id') as string;

        const formDataPass = {
            form: formData,
            path: path,
            image: image,
            uid: uid,
        }

        switch (path) {
            case 'profile':
                return ProfileImageUpload(formDataPass);
            case 'menu-items':
                return MenuItemUpload(formDataPass); 
            case 'users':
                return UsersFromAdminUpload(formDataPass);
            default:
                console.log("no documents uploaded!");
                break;
        }

    } catch (error: any) {
        return NextResponse.json(error);
    }
}