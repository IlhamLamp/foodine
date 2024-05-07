import { ObjectId } from "mongoose";

type CheckoutItem = {
    productId: ObjectId;
    quantity: number;
    selectedSizes: string;
    totalPrice: number;
}

export type TypesTransaction = {
    _id?: string;
    transactionId?: string;
    email: string;
    items?: CheckoutItem[];
    totalItemsQty: number;
    totalItemsPrice: number;
    shippingAddress: string;
    shippingCosts: number;
    deliveryDistance: number;
    deliveryStatus: string;
    paymentMethod: string;
    serviceFee: number;
    totalTransactionPrice: number;
    status: string;
    returnProduct: boolean;
}