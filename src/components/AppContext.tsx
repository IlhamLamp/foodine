"use client";
import { UserInformation } from "@/types/user-information";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useMemo, useState } from "react";

interface ProfileContextType {
    userData: UserInformation;
    updateUserData: (updatedData: UserInformation) => void;
    userAddress: string;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export function AppProvider({ children }) {

    const [userData, setUserData] = useState<UserInformation | null>(null);
    const [userAddress, setUserAddress] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/dashboard/profile');
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response?.status}`);
                }
                const data = await response?.json();
                const dataAddress = `${data?.address || ''},${data?.villages || ''},${data?.district || ''},${data?.regencies || ''},${data?.province || ''}`;
                setUserData(data);
                setUserAddress(dataAddress);
            } catch (error) {
                console.error('Error fetching user data!')
            }
        };
        fetchUserData();
    }, []);

    const updateUserData = (updatedData: UserInformation) => {
        const dataAddress = `${updatedData?.address || ''},${updatedData?.villages || ''},${updatedData?.district || ''},${updatedData?.regencies || ''},${updatedData?.province || ''}`;
        setUserData(updatedData);
        setUserAddress(dataAddress);
    }

    const profileMemo = useMemo(() => ({ userData, updateUserData, userAddress }), [ userData, updateUserData, userAddress ])

    return (
        <SessionProvider>
            <ProfileContext.Provider value={profileMemo}>
                {children}
            </ProfileContext.Provider>
        </SessionProvider>
    )
}