"use client";
import { CartContext } from "@/components/CartContext";
import CheckoutPriceSummary from "@/components/Checkout/CheckoutPriceSummary";
import CheckoutProductDetails from "@/components/Checkout/CheckoutProductDetails";
import CheckoutProfileAddress from "@/components/Checkout/CheckoutProfileAddress";
import { TransactionContext } from "@/components/TransactionContext";
import { useContext } from "react";
import toast from "react-hot-toast";

interface TransactionResponse {
    msg: string;
    status: string;
    data: any;
}

const CheckoutPage: React.FC = () => {

    const { clearCart } = useContext(CartContext);
    const {transaction } = useContext(TransactionContext);
    
    const handleTransaction = async () => {
        if (transaction) {
            try {
                const response: TransactionResponse = await fetch('/api/transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(transaction),
                }).then((res) => res.json());

                if (response && response.status === 'success') {
                    clearCart();
                    console.log('Succesfully Delete Cart');
                }

            } catch (error) {
                console.error('Error saving transaction:', error);
                return toast.error('An error occurred while saving transaction, please try again later');
            }
        } 
    }


    return (
        <section id="checkout" className="mt-20 mx-auto bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-4">
                    <CheckoutProfileAddress />
                    <CheckoutProductDetails />
                    <CheckoutPriceSummary transaction={transaction} handleTransaction={handleTransaction} />
                </div>
            </div>
        </section>
    )
}

export default CheckoutPage;