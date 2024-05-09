import { CartItems } from "./cart";

export type TypesTransaction = {
    _id?: string;
    transactionId: string;
    email: string;
    name: string;
    items: CartItems[];
    totalItemsQty: number;
    totalItemsPrice: number;
    shippingAddress: string;
    shippingCosts: number;
    deliveryDistance: number;
    deliveryStatus: string;
    paymentMethod: string;
    serviceFee: number;
    snapToken: string;
    snapRedirectUrl: string;
    totalTransactionPrice: number;
    status: string;
    returnProduct: boolean;
}