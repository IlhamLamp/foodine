import { CartItems, TypesCartItemsDatabase } from "./cart";

export type TypesTransaction = {
    _id?: string;
    transactionId: string;
    email: string;
    name: string;
    phone: string;
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
    createdAt?: string;
    updatedAt?: string;
}

export type TypesTransactionDB = Omit<TypesTransaction, 'items'> & { items: TypesCartItemsDatabase[] };

export type TypesTransactionPagination = {
    error: false;
    total: number;
    page: number;
    per_page: number;
    data: TypesTransaction[],
}