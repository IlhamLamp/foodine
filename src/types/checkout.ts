import { ObjectId } from "mongoose";

type CheckoutItem = {
    productId: ObjectId;
    quantity: number;
    selectedSizes: string;
    totalPrice: number;
}

export type TypesCheckout = {
    _id?: string;
    transactionId?: string;
    email: string;
    items?: CheckoutItem[];
    totalItemsQty: number;
    totalItemsPrice: number;
    shippingAddress: string;
    shippingCosts: number;
    deliveryDistance: number;
    paymentMethod: string;
    serviceFee: number;
    totalTransactionPrice: number;
    status: string; 
}