import { CartItems } from "./cart";

export type TypesTransaction = {
    _id?: string;
    transactionId: string;
    email: string;
    items: CartItems[];
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