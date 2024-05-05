type TransactionItem = {
    productId: string;
    quantity: number;
    selectedSizes: string;
    totalPrice: number;
}

export type Transaction = {
    _id?: string;
    transactionId?: string;
    email: string;
    items: TransactionItem[];
    shippingAddress: string;
    shippingCosts: number;
    deliveryDistance: string;
    paymentMethod: string;
    serviceFee: number;
    totalPrice: number;
    status: string; 
}