import { TypesCartItemsDatabase } from "@/types/cart";
import { TypesTransaction } from "@/types/transaction";

export class TransactionHelper {
    createTransaction(data: TypesTransaction, items: TypesCartItemsDatabase[], userTransactionId: string, token: string, redirect_url: string) {
        const response = {
            transactionId: userTransactionId,
            email: data.email,
            name: data.name,
            items,
            totalItemsQty: data.totalItemsQty,
            totalItemsPrice: data.totalItemsPrice,
            shippingAddress: data.shippingAddress,
            shippingCosts: data.shippingCosts,
            deliveryDistance: data.deliveryDistance,
            deliveryStatus: "packed",
            paymentMethod: data.paymentMethod,
            serviceFee: data.serviceFee,
            snapToken: token,
            snapRedirectUrl: redirect_url,
            totalTransactionPrice: data.totalTransactionPrice,
            status: "pending",
            returnProduct: false,
        };
        return response;
    }
}

export const transactionHelper = new TransactionHelper();