import { MenuItems } from "./menu";

export type ProductSize = {
    _id?: string | number;
    name: string;
    price: number;
}

export type TypesCartItemsDatabase = {
    productId: string;
    quantity: number;
    selectedSizes: ProductSize;
    totalPrices: number;
}

export type CartItems = { 
    product: MenuItems; 
    quantity?: number; 
    selectedSizes?: ProductSize;
    totalPrices?: number;
}

export type TypesCart = {
    email: string;
    items: CartItems[];
    transactionId: string;
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

export type TypesCartDB = {
    email: string;
    items: TypesCartItemsDatabase[];
    transactionId: string;
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

export const defaultCart: TypesCart = {
    email: '', 
    items: [], 
    transactionId: '', 
    totalItemsQty: 0, 
    totalItemsPrice: 0, 
    shippingAddress: '', 
    shippingCosts: 0, 
    deliveryDistance: 0, 
    paymentMethod: '', 
    serviceFee: 0, 
    totalTransactionPrice: 0, 
    status: '' 
};