import { ObjectId } from "mongoose";

type TransactionItem = {
    productId: ObjectId;
    quantity: number;
    selectedSizes: string;
    totalPrice: number;
}

export type TypesTransaction = {
    _id?: string;
    transactionId?: string;
    email: string;
    items?: TransactionItem[];
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