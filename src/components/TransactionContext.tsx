"use client";
import { Transaction } from "@/types/transaction";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ProfileContext } from "./AppContext";
import { CartContext } from "./CartContext";

interface TransactionContextType {
    addTransaction: () => void;
}

export const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }) {

    const { userData } = useContext(ProfileContext);
    const { cartProducts } = useContext(CartContext);
    const [transaction, setTransaction] = useState<Transaction | null>(null);

    const addTransaction = async () => {
        const data: Transaction = {
            email: userData.email,
            items: [],
            shippingAddress: userData.address,
            shippingCosts: 0,
            deliveryDistance: "",
            paymentMethod: "",
            serviceFee: 0,
            totalPrice: 0,
            status: ""
        }
    }

    const transactionMemo = useMemo(() => ({ addTransaction }), [addTransaction])

    return (
        <TransactionContext.Provider value={transactionMemo}>
            { children }
        </TransactionContext.Provider>
    )

}