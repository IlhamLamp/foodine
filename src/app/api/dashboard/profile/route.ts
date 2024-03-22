import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connect } from "@/libs/dbConnect";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";

interface UserWithEmail {
  _id: string;
  email: string;
}

export async function PUT(req: NextRequest) {
  try {
    connect();
    const data = await req.json();
    const { _id, name, image, ...otherUserInfo } = data;

    let filter = {};
    if (_id) {
      filter = {_id};
    } else {
      const session = await getServerSession(authOptions);
      const email = session.user.email;
      filter = {email};
    }

    const user = await User.findOne(filter) as UserWithEmail;
    await User.updateOne(filter, {name, image});
    await UserInfo.findOneAndUpdate({email: user?.email}, otherUserInfo, {upsert:true});

    return NextResponse.json(true);
  } catch (error: any) {
    console.log(error);
  }
}

export async function GET(req: any) {
  try {
    connect();

    const url = new URL(req?.url);
    const _id = url.searchParams.get('_id');

    let filterUser = {};
    if (_id) {
      filterUser = {_id};
    } else {
      const session = await getServerSession(authOptions);
      const email = session?.user?.email;
      if (!email) {
        return NextResponse.json({ msg: 'User not logged in!' }, {status: 401})
      }
      filterUser = {email};
    }

    const user = await User.findOne(filterUser).lean() as UserWithEmail;
    const userInfo = await UserInfo.findOne({email: user?.email}).lean();

    return NextResponse.json({...user, ...userInfo}, {status: 200});

  } catch (error: any) {
    console.log(error);
  }
}