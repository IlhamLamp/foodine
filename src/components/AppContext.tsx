"use client";
import { RoutingLocation } from "@/libs/geoPosition";
import { UserInformation } from "@/types/user-information";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useMemo, useState } from "react";

interface ProfileContextType {
    userData: UserInformation;
    distance: number | null;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export function AppProvider({ children }) {

    const [userData, setUserData] = useState<UserInformation | null>(null);
    const [distance, setDistance] = useState<number | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/dashboard/profile');
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response?.status}`);
                }
                const data =  await response?.json();
                setUserData(data);
            } catch (error) {
                console.error('Error fetching user data!')
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        const getDistance = async (): Promise<number | null> => {
            try {
                if (!userData) return null;
                const data = await RoutingLocation(userData?.location);
                if (data?.features && data.features[0]?.properties) {
                    const result = data.features[0].properties.distance;
                    setDistance(result);
                } else {
                    console.error("Error: Unable to retrieve distance data from the response.");
                    return null;
                }
            } catch (error) {
                console.error('Error getting distance to shop!')
                return error;
            }
        };
        getDistance();
    }, [userData])


    const profileMemo = useMemo(() => ({ userData, distance }), [userData, distance])

    return (
        <SessionProvider>
            <ProfileContext.Provider value={profileMemo}>
                {children}
            </ProfileContext.Provider>
        </SessionProvider>
    )
}