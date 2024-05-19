"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { TypesOrderHistory } from "@/types/order";
import { ProfileContext } from "./AppContext";

interface OrderContextType {
    order: TypesOrderHistory;
    setOrder: React.Dispatch<React.SetStateAction<TypesOrderHistory>>;
}

export const OrderContext = createContext<OrderContextType | null>(null);

export function OrderProvider({ children }) {
    const { userData } = useContext(ProfileContext);
    const [order, setOrder] = useState<TypesOrderHistory>([]);

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

    const orderMemo = useMemo(() => ({ order, setOrder }), [ order, setOrder ]);

    return(
        <OrderContext.Provider value={orderMemo}>
            { children }
        </OrderContext.Provider>
    )
}