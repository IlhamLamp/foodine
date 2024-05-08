import { connect } from "@/libs/dbConnect";
import { userSplittedName } from "@/libs/formattedUser";
import { generateTransactionId } from "@/libs/transactionHelper";
import { Transaction } from "@/models/Transaction";
import { User } from "@/models/User";
import { UserInfo } from "@/models/UserInfo";
import { TypesMidtransPayload } from "@/types/midtrans";
import { TypesTransaction } from "@/types/transaction";
import { BasicUser, UserInformation } from "@/types/user-information";
import { FRONT_END_URL, MIDTRANS_APP_URL, MIDTRANS_AUTH_STRING} from "@/utils/constant";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
    try {
        const data: TypesTransaction = await req.json();
        const { email, items, shippingAddress, shippingCosts, totalTransactionPrice } = data;
        if (!email) {
            return NextResponse.json({ msg: 'Invalid request data'}, {status: 400});
        }
        const user: BasicUser = await User.findOne({ email });
        const userInfo: UserInformation = await UserInfo.findOne({ email });

        const userName = userSplittedName(user.name);
        const { first_name, last_name} = userName;
        const userTransactionId = generateTransactionId();

        const mappedItems = await Promise.all([
            ...items.map(async (item) => ({
                id: item.product._id,
                price: item.selectedSizes.price + item.product.basePrice,
                quantity: item.quantity,
                name: item.product.name,
                selectedSizes: item.selectedSizes.name,
                totalPrices: item.totalPrices,
            })),
            {
                id: 'shipping',
                price: shippingCosts, 
                quantity: 1,
                name: 'Shipping Cost',
                selectedSizes: '',
                totalPrices: shippingCosts,
            },
        ]);

        const type_address = {
            first_name,
            last_name,
            email,
            phone: userInfo.phone,
            address: shippingAddress,
            city: userInfo.regencies,
            postal_code: userInfo.postalCode,
            country_code: 'IDN',
        }

        const payload: TypesMidtransPayload = {
            transaction_details: {
                order_id: userTransactionId,
                gross_amount: totalTransactionPrice,
            },
            item_details: mappedItems,
            customer_details: {
                first_name,
                last_name,
                email,
                phone: userInfo.phone,
                billing_address: type_address,
            },
            shipping_address: type_address,
            callbacks: {
                finish: `${FRONT_END_URL}/order-status?transaction_id=${userTransactionId}`,
                error: `${FRONT_END_URL}/order-status?transaction_id=${userTransactionId}`,
                pending: `${FRONT_END_URL}/order-status?transaction_id=${userTransactionId}`,
            },
        };

        const response = await fetch(`${MIDTRANS_APP_URL}/snap/v1/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${MIDTRANS_AUTH_STRING}`
            },
            body: JSON.stringify(payload)
        });

        const midtrans_response_data = await response.json();
        console.log(midtrans_response_data);
          
        return NextResponse.json({ msg: 'Transaction created successfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: 'An error occured'}, {status: 500});
    }
}

export async function PUT(req: NextRequest) {
    try {
        return NextResponse.json({ msg: 'Transaction updated succesfully' }, {status: 201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({msg: 'An error has occured'}, {status: 500});
    }
}