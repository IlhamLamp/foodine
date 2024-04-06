import { connect } from "@/libs/dbConnect";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { DeleteImage, ExtractPublicId, UploadImage } from "@/libs/uploadHandler";
import { User } from "@/models/User";

interface FormData {
    form: any;
    path: string | null;
    image: any;
    uid: string;
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
        connect();
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
            default:
                console.log("no documents uploaded!");
                break;
        }

    } catch (error: any) {

    }
}