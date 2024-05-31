"use client"
import TransactionPriceSummary from "@/components/Order/History/invoice/TransactionPriceSummary";
import TransactionProductDetails from "@/components/Order/History/invoice/TransactionProductDetails";
import TransactionProfileAddress from "@/components/Order/History/invoice/TransactionProfileAddress";
import { OrderContext } from "@/components/OrderContext";
import { useSnap } from "@/hooks/useSnap";
import { transactionService } from "@/services/TransactionService";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FaBackspace } from "react-icons/fa";

const OrderByTransactionIdPage: React.FC = () => {

    const router = useRouter();
    const { id } = useParams();
    const { order } = useContext(OrderContext);
    const orderID = order.find((transaction) => transaction.transactionId === id);

    const [snapShow, setSnapShow] = useState<boolean>(false);
    const { snapEmbed } = useSnap();

    const handlePayment = () => {
        setSnapShow(true);
        snapEmbed(orderID.snapToken, 'snap-container', {
            onSuccess: async (result) => {
                // kenapa route nya tidak berubah ya
                console.log('Sucess', result);
                await transactionService.updateTransaction(orderID.transactionId, 'settlement', result);
                setSnapShow(false);
            },
            onPending: async (result) => {
                console.log('Pending', result);
                await transactionService.updateTransaction(orderID.transactionId, 'pending', result);
                setSnapShow(false);
            },
            onError: async (result) => {
                console.log('Failed', result);
                await transactionService.updateTransaction(orderID.transactionId, 'failed', result);
            },
            onClose: async () => {
                await transactionService.updateTransaction(orderID.transactionId, 'failed');
                setSnapShow(false);
            }
        })
    }
    
    return (
        <div id="order-by-transaction-id-page">
            {!snapShow && (
                <div>
                    <div className="flex justify-between">
                        <FaBackspace className="w-10 h-10 text-red-400 cursor-pointer" onClick={() => router.back()} />
                    </div>
                    <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg">
                        <div className="flex flex-col gap-4">
                            <TransactionProfileAddress transaction={orderID} />
                            <TransactionProductDetails transaction={orderID} />
                            <TransactionPriceSummary transaction={orderID} pay={handlePayment} />
                        </div>
                    </div>
                </div>
            )}
            <div className="w-1/2 mx-auto p-4">
                <div id="snap-container" className="w-full text-center mx-auto"/>
            </div>
        </div>
    )
}

export default OrderByTransactionIdPage;