export type TypeMidtransItemDetails = {
    id: string;
    price: number;
    quantity: number;
    name: string;
    selectedSizes?: string;
    totalPrices?: number;
}

export type TypeMidtransAddress = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    country_code: string;
}

type TypeCustomerDetails = {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    billing_address?: TypeMidtransAddress;
}

export type TypesMidtransPayload = {
    transaction_details: {
        order_id: string;
        gross_amount: number;
    };
    credit_card?: {
        secure: boolean;
    };
    item_details: TypeMidtransItemDetails[];
    customer_details: TypeCustomerDetails;
    shipping_address?: TypeMidtransAddress;
    callbacks: {
        finish: string;
        error: string;
        pending: string;
    }
}

export type TypesMidtransResponse = {
    token: string;
    redirect_url: string;
}

export type TypesMidtransSnapResponse = {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string
    transaction_time: string;
    transaction_status: string
    fraud_status: string
    finish_redirect_url: string;
}