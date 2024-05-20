import { midtransHelper } from "@/helpers/MidtransHelper";
import { transactionHelper } from "@/helpers/TransactionHelper";
import { connect } from "@/libs/dbConnect";
import { userSplittedName } from "@/libs/formattedUser";
import { generateTransactionId, itemsDB } from "@/libs/formattedTransaction";
import { Transaction } from "@/models/Transaction";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import { TypesMidtransResponse } from "@/types/midtrans";
import { TypesTransaction, TypesTransactionDB } from "@/types/transaction";
import { BasicUser, UserInformation } from "@/types/user-information";
import { MIDTRANS_APP_URL, MIDTRANS_AUTH_STRING} from "@/utils/constant";
import { NextRequest, NextResponse } from "next/server";
import { TypesCartItemsDatabase } from "@/types/cart";
import { TypesOrderHistoryDB } from "@/types/order";
import { MenuItem } from "@/models/MenuItem";

connect();

interface UserQuery {
    transactionId?: { $regex: RegExp};
    status?: string;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req?.url);
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const per_page = parseInt(searchParams.get('per_page'), 10) || 5;
    const search = searchParams.get('search')?.trim() || "";
    const status = searchParams.get('status') || "All";

    try {
        if (isNaN(page) || page < 1) {
            throw new Error('Invalid page number');
        };
        const skip = (page - 1) * per_page;
        const query: UserQuery = {};
        if (search !== "") {
            query.transactionId = { $regex: new RegExp(search, 'i')};
        };
        if (status !== "All") {
            query.status = status;
        }
        const userOrderHistory: TypesOrderHistoryDB = await Transaction.find(query).skip(skip).limit(per_page).lean();
        const allProductsIds = userOrderHistory.flatMap((transaction) => transaction.items.map((item) => item.productId));
        const menuItems = await MenuItem.find({ '_id': { '$in': allProductsIds }});
        const productMap = menuItems.reduce((acc, item) => {
            acc[item._id.toString()] = item;
            return acc;
        }, {});
        const transformedOrderHistory = userOrderHistory.map((transaction) => {
            return {
                ...transaction,
                items: transaction.items.map((item) => ({
                    ...item,
                    product: productMap[item.productId.toString()],
                })),   
            }
        });
        const total = await Transaction.countDocuments(query);
        const response = {
            error: false,
            total,
            page,
            per_page,
            data: transformedOrderHistory,
        }
        return NextResponse.json(response, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 }); 
    }
}

export async function POST(req: NextRequest) {
    try {
        const data: TypesTransaction = await req.json();
        const { email, items, shippingAddress, shippingCosts } = data;

        const formattedCartItems: TypesCartItemsDatabase[] = await itemsDB(items);

        if (!email) {
            return NextResponse.json({ msg: 'Invalid request data'}, {status: 400});
        }
        const user: BasicUser = await User.findOne({ email }).lean();
        const userInfo: UserInformation = await UserInfo.findOne({ email }).lean();

        const userName = userSplittedName(user.name);
        const { first_name, last_name} = userName;
        // GENERATE
        const userTransactionId = generateTransactionId();

        const mappedItems = await midtransHelper.getMappedItems(items, shippingCosts);
        const getAddress = midtransHelper.getAddress(first_name, last_name, userInfo, shippingAddress);
        const payload = midtransHelper.createPayload(userTransactionId, data, mappedItems, first_name, last_name, userInfo, getAddress);

        const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${MIDTRANS_AUTH_STRING}`
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            return NextResponse.json({ msg: 'Failed to create transaction'}, { status: 500 });
        }

        const midtransResponseData: TypesMidtransResponse = await response.json();
        const { token, redirect_url } = midtransResponseData;
        
        const transactionData = transactionHelper.createTransaction(data, formattedCartItems, userTransactionId, token, redirect_url);
        const savedTransaction = await Transaction.create(transactionData);

        return NextResponse.json(
            { msg: 'Transaction created successfully', status: 'success', data: savedTransaction },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'An error occured'}, {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    try {
        const reqData = await req.json();
        const { transaction_id, status, data } = reqData;
        const { payment_type, transaction_status } = data;

        let deliveryStatus: string;

        if (transaction_status === 'settlement') {
            deliveryStatus = 'packed';
        } else if (transaction_status === 'pending') {
            deliveryStatus = 'pending';
        } else {
            deliveryStatus = 'failed';
        }

        const transaction: TypesTransactionDB = await Transaction.findOneAndUpdate(
            { transactionId: transaction_id },
            { $set: { status: transaction_status, paymentMethod: payment_type, deliveryStatus }},
            { new: true },
        );
        return NextResponse.json({ msg: 'Transaction updated succesfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }   
}