"use client";
import { UserInformation } from "@/types/user-information";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useMemo, useState } from "react";

interface ProfileContextType {
    userData: UserInformation;
}

export const ProfileContext = createContext<ProfileContextType | null>(null);

export function AppProvider({ children }) {

    const [userData, setUserData] = useState<UserInformation | null>(null);

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

    const profileMemo = useMemo(() => ({userData}), [userData])


    return (
        <SessionProvider>
            <ProfileContext.Provider value={profileMemo}>
                {children}
            </ProfileContext.Provider>
        </SessionProvider>
    )
}