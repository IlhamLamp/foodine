"use client";
import { TypesTransaction } from "@/types/transaction";
import { createContext, useContext, useMemo, useState } from "react";
import { ProfileContext } from "./AppContext";
import { CartContext } from "./CartContext";
import { ShippingContext } from "./ShippingContext";
import toast from "react-hot-toast";

interface TransactionContextType {
    paymentMethod: string;
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
    transaction: TypesTransaction;
    addTransaction: (totalPrice: number, costShipping: number, totalQty: number) => void;
    savingTransactionToDB: () => void;
}

export const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }) {

    const { userData, userAddress } = useContext(ProfileContext);
    const { cartProducts } = useContext(CartContext);
    const { distance, costShipping } = useContext(ShippingContext);

    const [paymentMethod, setPaymentMethod] = useState<string>("COD");
    const serviceFee: number = 0;

    const [transaction, setTransaction] = useState<TypesTransaction>({
        ...cartProducts,
        shippingAddress: userAddress,
        shippingCosts: costShipping,
        deliveryDistance: distance,
        serviceFee,
        paymentMethod,
        totalTransactionPrice: 0,
        status: 'unpaid',
        deliveryStatus: "pending",
        returnProduct: false,
    });

    const savingTransactionToDB = async() => {
        if (transaction) {
            try {
                const response = await fetch('/api/transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(transaction),
                });
                if (response.ok) {
                    console.log("ok");
                }
            } catch (error) {
                console.error('Error saving transaction:', error);
                toast.error('An error occurred while saving transaction, please try again later');
            }
        } 
    }

    const addTransaction = async (totalPrice: number, costShipping: number, totalQty: number,) => {

        if (!cartProducts) {
            console.error('Cart products data not available');
            return;
        }

        if (cartProducts) {

            const data: TypesTransaction = {
                ...cartProducts,
                totalItemsQty: totalQty,
                totalItemsPrice: totalPrice,
                shippingAddress: userAddress,
                shippingCosts: costShipping,
                deliveryDistance: distance,
                serviceFee,
                paymentMethod,
                totalTransactionPrice: (totalPrice + costShipping),
                status: 'unpaid',
                deliveryStatus: "pending",
                returnProduct: false,
            };
            setTransaction(data);
        }
    }

    const transactionMemo = useMemo(() => ({ transaction, addTransaction, paymentMethod, setPaymentMethod, savingTransactionToDB }), [ transaction, addTransaction, paymentMethod, setPaymentMethod, savingTransactionToDB])

    return (
        <TransactionContext.Provider value={transactionMemo}>
            { children }
        </TransactionContext.Provider>
    )

}