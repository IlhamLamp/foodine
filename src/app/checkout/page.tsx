"use client";
import { CartContext } from "@/components/CartContext";
import CheckoutPriceSummary from "@/components/Checkout/CheckoutPriceSummary";
import CheckoutProductDetails from "@/components/Checkout/CheckoutProductDetails";
import CheckoutProfileAddress from "@/components/Checkout/CheckoutProfileAddress";
import { TransactionContext } from "@/components/TransactionContext";
import { useSnap } from "@/hooks/useSnap";
import { TypesTransactionDB } from "@/types/transaction";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

interface TransactionResponse {
    msg: string;
    status: string;
    data: TypesTransactionDB;
}

const CheckoutPage: React.FC = () => {

    const router = useRouter();
    const [snapShow, setSnapShow] = useState<boolean>(false);

    const { clearCart } = useContext(CartContext);
    const {transaction, clearTransaction } = useContext(TransactionContext);
    const { snapEmbed } = useSnap();
    
    const handleTransaction = async () => {
        if (transaction) {
            try {
                const response: TransactionResponse = await fetch('/api/transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(transaction),
                }).then((res) => res.json());

                if (response && response.status === 'success') {
                    router.replace(`/checkout?transaction_id=${response.data.transactionId}`);
                    clearCart();
                    clearTransaction();
                    setSnapShow(true);
                    snapEmbed(response.data.snapToken, 'snap-container', {
                        onSuccess: async (result) => {
                            // kenapa route nya tidak berubah ya
                            console.log('Sucess', result);
                            await updateTransaction(response.data.transactionId, 'settlement', result);
                            router.push(`/order-status?transaction_id=${response.data.transactionId}&transaction_status=settlement`);
                            setSnapShow(false);
                        },
                        onPending: async (result) => {
                            console.log('Pending', result);
                            await updateTransaction(response.data.transactionId, 'pending', result);
                            router.push(`/order-status?transaction_id=${response.data.transactionId}&transaction_status=pending`);
                            setSnapShow(false);
                        },
                        onError: async (result) => {
                            console.log('Failed', result);
                            await updateTransaction(response.data.transactionId, 'failed', result);
                            router.push(`/order-status?transaction_id=${response.data.transactionId}&transaction_status=failed`);
                        },
                        onClose: async () => {
                            await updateTransaction(response.data.transactionId, 'failed');
                            router.push(`/order-status?transaction_id=${response.data.transactionId}&transaction_status=failed`);
                            setSnapShow(false);
                        }
                    })
                } else {
                    return toast.error('Error add transaction, please try again later.');
                }

            } catch (error) {
                console.error('Error saving transaction:', error);
                return toast.error('An error occurred while saving transaction, please try again later');
            }
        } 
    }

    const updateTransaction = async (transaction_id: string, status: string, data?: any) => {

        if (!transaction_id) {
            return;
        }

        try {
            const response = await fetch(`/api/transaction`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transaction_id, status, data }),
            })
            if (!response.ok) {
                console.log('Failed update transaction');
                return;
            }
            console.log(`Transaction ${transaction_id} status updated to ${status}`);
        } catch (error) {
            console.error('Error updating transaction: ', error);
        }
    }


    return (
        <section id="checkout" className={`mt-20 mx-auto ${snapShow ? 'bg-slate-800' : 'bg-gray-50'}`}>
            { !snapShow && (
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col gap-4">
                        <CheckoutProfileAddress />
                        <CheckoutProductDetails />
                        <CheckoutPriceSummary transaction={transaction} handleTransaction={handleTransaction} />
                    </div>
                </div>
            )}
            <div className="w-1/2 mx-auto p-4">
                <div id="snap-container" className="w-full text-center mx-auto"/>
            </div>
        </section>
    )
}

export default CheckoutPage;