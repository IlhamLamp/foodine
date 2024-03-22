"use client";
import UserTabs from "@/components/layout/UserTabs";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage: React.FC = () => {

    const { status, data: session } = useSession();
    const [profileFetched, setProfileFetched] = useState(false);

    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(true);

    // useEffect(() => {
    //     if (status === 'authenticated') {
    //         fetch('/api/profile').then(response => {
    //             response?.json().then(data => {
    //                 setUser(data);
    //                 setIsAdmin(data.admin);
    //                 setProfileFetched(true);
    //             })
    //         });
    //     }
    // }, [session, status])

    // if (status === 'loading' || !profileFetched) {
    //     return 'Loading ...'
    // }

    // if (status === 'unauthenticated') {
    //     return redirect('/login');
    // }

    return (
        <section className="mt-24 mx-auto">
            <UserTabs isAdmin={isAdmin}/>
            DASHBOARD
        </section>
    )
}

export default DashboardPage;