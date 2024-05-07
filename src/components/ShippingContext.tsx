"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ProfileContext } from "./AppContext";
import { calculateShippingCost, RoutingLocation } from "@/libs/geoPosition";

interface ShippingContextType {
    distance: number;
    costShipping: number;
}

export const ShippingContext = createContext<ShippingContextType | null>(null);

export function ShippingProvider({ children }) {

    const { userData } = useContext(ProfileContext);
    const [distance, setDistance] = useState<number>(0);
    const [costShipping, setCostShipping] = useState<number>(0);

    useEffect(() => {
        const getDistanceAndCostShipping = async (): Promise<void> => {
            try {
                if (!userData) return;
                const data = await RoutingLocation(userData?.location);
                if (data?.features && data.features[0]?.properties) {
                    const resDistance = data.features[0].properties.distance;
                    const resCostShipping = calculateShippingCost(resDistance);
                    setDistance(resDistance);
                    setCostShipping(resCostShipping);
                } else {
                    console.error("Error: Unable to retrieve distance data from the response.");
                }
            } catch (error) {
                console.error('Error getting distance to shop!', error)
            }
        };
        getDistanceAndCostShipping();
    }, [userData]);

    const shippingMemo = useMemo(() => ({ distance, costShipping }), [ distance, costShipping ])
    
    return (
        <ShippingContext.Provider value={shippingMemo}>
            {children}
        </ShippingContext.Provider>
    )
}