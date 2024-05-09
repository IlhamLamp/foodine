"use client";
import { TypesTransaction } from "@/types/transaction";
import { createContext, useContext, useMemo, useState } from "react";
import { ProfileContext } from "./AppContext";
import { CartContext } from "./CartContext";
import { ShippingContext } from "./ShippingContext";

interface TransactionContextType {
    paymentMethod: string;
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
    transaction: TypesTransaction;
    addTransaction: (totalPrice: number, costShipping: number, totalQty: number) => void;
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
        transactionId: '',
        name: userData?.name,
        shippingAddress: userAddress,
        shippingCosts: costShipping,
        deliveryDistance: distance,
        serviceFee,
        paymentMethod,
        totalTransactionPrice: 0,
        snapToken: '',
        snapRedirectUrl: '',
        status: 'unpaid',
        deliveryStatus: "pending",
        returnProduct: false,
    });

    const addTransaction = async (totalPrice: number, costShipping: number, totalQty: number,) => {

        if (!cartProducts) {
            console.error('Cart products data not available');
            return;
        }

        if (cartProducts) {

            const data: TypesTransaction = {
                ...cartProducts,
                transactionId: '',
                name: userData?.name,
                totalItemsQty: totalQty,
                totalItemsPrice: totalPrice,
                shippingAddress: userAddress,
                shippingCosts: costShipping,
                deliveryDistance: distance,
                serviceFee,
                paymentMethod,
                totalTransactionPrice: (totalPrice + costShipping),
                snapToken: '',
                snapRedirectUrl: '',
                status: 'unpaid',
                deliveryStatus: "pending",
                returnProduct: false,
            };
            setTransaction(data);
        }
    }

    const transactionMemo = useMemo(() => ({ transaction, addTransaction, paymentMethod, setPaymentMethod }), [ transaction, addTransaction, paymentMethod, setPaymentMethod])

    return (
        <TransactionContext.Provider value={transactionMemo}>
            { children }
        </TransactionContext.Provider>
    )

}