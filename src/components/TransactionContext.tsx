"use client";
import { TypesTransaction } from "@/types/transaction";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ProfileContext } from "./AppContext";
import { CartContext } from "./CartContext";
import { ShippingContext } from "./ShippingContext";
import toast from "react-hot-toast";
import { TypesCheckout } from "@/types/checkout";

interface TransactionContextType {
    transaction: TypesCheckout;
    addCheckout: (paymentMethod: string) => void;
    addOrderTransaction: () => void;
}

export const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }) {

    const { userData } = useContext(ProfileContext);
    const { totalPrice, totalQty } = useContext(CartContext);
    const { distance, costShipping } = useContext(ShippingContext);

    const [transaction, setTransaction] = useState<TypesCheckout | null>(null);
    const [orderTransaction, setOrderTransaction] = useState<TypesTransaction | null>(null);
    const [checkoutLoaded, setCheckoutLoaded] = useState<boolean>(false);
    const serviceFee: number = 0;

    useEffect(() => {
        fetchLatestCheckout();
    }, [userData])

    const fetchLatestCheckout = async () => {
        try {
            if (userData && userData.email) {

                const latestCheckout = await fetch(`/api/checkout/${userData.email}`);
                
                if (latestCheckout.ok) {
                    const checkout = await latestCheckout.json();
                    setTransaction(checkout);
                    setCheckoutLoaded(true);
                } else {
                    setTransaction(null);
                    console.log("No transaction exist!");
                }
            }
        } catch (error) {
            console.log('An error occured');
        }
    };

    const savingCheckoutToDB = async() => {
        if (transaction) {
            try {
                const method = checkoutLoaded ? 'PUT' : 'POST';
                console.log(method);
                const response = await fetch('/api/checkout', {
                    method: checkoutLoaded ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(transaction),
                });
                if (response.ok) {
                    setCheckoutLoaded(true);
                } 
            } catch (error) {
                console.error('Error saving transaction:', error);
                toast.error('An error occurred while saving transaction, please try again later');
            }
        }
    }

    const savingTransactionToDB = async() => {
        if (orderTransaction) {
            try {
                const response = await fetch('/api/transaction', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(orderTransaction),
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

    const addCheckout = async (paymentMethod: string) => {

        const data: TypesCheckout = {
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
            await savingCheckoutToDB();
        }
    }

    const addOrderTransaction = async () => {
        if (transaction) {
            const data: TypesTransaction = {
                ...transaction,
                deliveryStatus: "pending",
                returnProduct: false,
            };
            setOrderTransaction(data);
        }

        if (userData && userData.email) {
            await savingTransactionToDB();
        }
    }

    useEffect(() => {
        if (userData && userData.email) {
            savingCheckoutToDB();
        }
    }, [transaction, userData])

    useEffect(() => {
        if (userData && userData.email) {
            savingTransactionToDB();
        }
    }, [orderTransaction, userData])

    const transactionMemo = useMemo(() => ({ transaction, addCheckout, addOrderTransaction }), [ transaction, addCheckout, addOrderTransaction])

    return (
        <TransactionContext.Provider value={transactionMemo}>
            { children }
        </TransactionContext.Provider>
    )

}