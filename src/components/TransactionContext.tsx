"use client";
import { TypesTransaction } from "@/types/transaction";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ProfileContext } from "./AppContext";
import { CartContext } from "./CartContext";
import { ShippingContext } from "./ShippingContext";
import toast from "react-hot-toast";

interface TransactionContextType {
    transaction: TypesTransaction;
    addTransaction: (paymentMethod: string) => void;
}

export const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }) {

    const { userData } = useContext(ProfileContext);
    const { totalPrice, totalQty } = useContext(CartContext);
    const { distance, costShipping } = useContext(ShippingContext);

    const [transaction, setTransaction] = useState<TypesTransaction | null>(null);
    const [transactionLoaded, setTransactionLoaded] = useState<boolean>(false);
    const serviceFee: number = 0;

    useEffect(() => {
        fetchLatestTransaction();
    }, [userData])

    const fetchLatestTransaction = async () => {
        try {
            if (userData && userData.email) {

                const latestTransaction = await fetch(`/api/transaction/${userData.email}`);
                
                if (latestTransaction.ok) {
                    const checkout = await latestTransaction.json();
                    setTransaction(checkout);
                    setTransactionLoaded(true);
                } else {
                    setTransaction(null);
                    console.log("No transaction exist!");
                }
            }
        } catch (error) {
            console.log('An error occured');
        }
    };

    const savingTransactionToDB = async() => {
        if (transaction) {
            try {
                const method = transactionLoaded ? 'PUT' : 'POST';
                console.log(method);
                const response = await fetch('/api/transaction', {
                    method: transactionLoaded ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(transaction)
                });
                if (response.ok) {
                    setTransactionLoaded(true);
                } 
            } catch (error) {
                console.error('Error saving transaction:', error);
                toast.error('An error occurred while saving transaction, please try again later');
            }
        }
    }

    const addTransaction = async (paymentMethod: string) => {



        const data: TypesTransaction = {
            email: userData.email,
            totalItemsQty: totalQty,
            totalItemsPrice: totalPrice,
            shippingAddress: userData.address,
            shippingCosts: costShipping,
            deliveryDistance: distance,
            paymentMethod,
            serviceFee,
            totalTransactionPrice: totalPrice + costShipping + serviceFee,
            status: 'unpaid',
        }
        setTransaction(data);

        if (userData && userData.email) {
            await savingTransactionToDB();
        }
    }

    useEffect(() => {
        if (userData && userData.email) {
            savingTransactionToDB();
        }
    }, [transaction, userData])

    const transactionMemo = useMemo(() => ({ transaction, addTransaction }), [ transaction, addTransaction])

    return (
        <TransactionContext.Provider value={transactionMemo}>
            { children }
        </TransactionContext.Provider>
    )

}