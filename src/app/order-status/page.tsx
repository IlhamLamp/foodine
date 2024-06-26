"use client";
import OrderStatusFailed from "@/components/Order/status/order-status-failed";
import OrderStatusPending from "@/components/Order/status/order-status-pending";
import OrderStatusSuccess from "@/components/Order/status/order-status-success";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

interface MidtransSearchParams {
    order_id: string;
    status_code: string;
    transaction_id: string;
    transaction_status: string; 
}

function OrderStatusResponse () {
    const searchParams = useSearchParams();
    const order_id = searchParams.get('order_id');
    const status_code = searchParams.get('status_code');
    const transaction_id = searchParams.get('transaction_id');
    const transaction_status = searchParams.get('transaction_status');

    const renderContent = React.useCallback(() => {
        switch(transaction_status) {
            case 'settlement':
                return <OrderStatusSuccess transactionID={transaction_id} />;
            case 'pending':
                return <OrderStatusPending transactionID={transaction_id} />;
            case 'failed':
                return <OrderStatusFailed transactionID={transaction_id} />;
            default:
                return null;
        }
    }, [transaction_status, transaction_id]);

    return renderContent();
}

const OrderStatusPage: React.FC = () => {

    return (
        <section id="order-status" className="mt-28 mx-auto">
            <div className="max-w-6xl mx-auto">
                <Suspense fallback={<div>Loading...</div>}>
                    <OrderStatusResponse />
                </Suspense>
            </div>
        </section>
    )
}

export default OrderStatusPage;