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

connect();

export async function POST(req: NextRequest) {
    try {
        const data: TypesTransaction = await req.json();
        const { email, items, shippingAddress, shippingCosts } = data;

        const formattedCartItems: TypesCartItemsDatabase[] = await itemsDB(items);

        if (!email) {
            return NextResponse.json({ msg: 'Invalid request data'}, {status: 400});
        }
        const user: BasicUser = await User.findOne({ email });
        const userInfo: UserInformation = await UserInfo.findOne({ email });

        const userName = userSplittedName(user.name);
        const { first_name, last_name} = userName;
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