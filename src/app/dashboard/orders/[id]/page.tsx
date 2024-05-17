"use client"
import TransactionPriceSummary from "@/components/Order/History/invoice/TransactionPriceSummary";
import TransactionProductDetails from "@/components/Order/History/invoice/TransactionProductDetails";
import TransactionProfileAddress from "@/components/Order/History/invoice/TransactionProfileAddress";
import { OrderContext } from "@/components/OrderContext";
import { useParams, useRouter } from "next/navigation";
import { useContext } from "react";

const OrderByTransactionIdPage: React.FC = () => {

    const router = useRouter();
    const { id } = useParams();
    const { order } = useContext(OrderContext);
    const orderID = order.find((transaction) => transaction.transactionId === id);
    

    return (
        <div id="order-by-transaction-id-page" className="mt-6">
            <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg">
                <div className="flex flex-col gap-4">
                    <TransactionProfileAddress transaction={orderID} />
                    <TransactionProductDetails transaction={orderID} />
                    <TransactionPriceSummary transaction={orderID} />
                </div>
            </div>
        </div>
    )
}

export default OrderByTransactionIdPage;