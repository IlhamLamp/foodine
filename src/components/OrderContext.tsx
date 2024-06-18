"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TypesOrderHistory } from "@/types/order";
import { ProfileContext } from "./AppContext";

interface OrderContextType {
    order: TypesOrderHistory;
    setOrder: React.Dispatch<React.SetStateAction<TypesOrderHistory>>;
    delOrderID: string;
    setDelOrderID: React.Dispatch<React.SetStateAction<string>>;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }) {
    const { userData } = useContext(ProfileContext);
    const [order, setOrder] = useState<TypesOrderHistory>([]);
    const [delOrderID, setDelOrderID] = useState<string>('');

    useEffect(() => {
        const fetchOrderHistory = async () => {
            if (userData && userData.email) {
                const response = await fetch(`/api/transaction/me?email=${userData.email}`); 
                if (!response.ok) {
                    console.log('Failed get user order history');
                }
                if (response.ok) {
                    const orderData = await response.json();
                    setOrder(orderData.data);
                }
            };
        };
        fetchOrderHistory();
    }, [userData]);

    const orderMemo = useMemo(() => ({ order, setOrder, delOrderID, setDelOrderID }), [ order, setOrder, delOrderID, setDelOrderID ]);

    return(
        <OrderContext.Provider value={orderMemo}>
            { children }
        </OrderContext.Provider>
    )
}