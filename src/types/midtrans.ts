type TypeItemDetails = {
    id: string;
    price: number;
    quantity: number;
    name: string;
    selectedSizes?: string;
}

type TypeAddress = {
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
    billing_address?: TypeAddress;
}

export type TypesMidtransPayload = {
    transaction_details: {
        order_id: string;
        gross_amount: number;
    };
    credit_card?: {
        secure: boolean;
    };
    item_details: TypeItemDetails[];
    customer_details: TypeCustomerDetails;
    shipping_address?: TypeAddress;
}