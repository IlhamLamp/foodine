"use client";
import UserForm from "@/components/Dashboard/Profile/UserForm";
import UnauthorizedPage from "@/components/layout/UnauthorizedPage";
import { UserInformation } from "@/types/user-information";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProfilePage: React.FC = () => {

    const router = useRouter();
    const { status, data: session } = useSession();
    const [profileFetched, setProfileFetched] = useState<boolean>(false);

    const [user, setUser] = useState<UserInformation>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        if (status === 'authenticated') {
            fetch('/api/dashboard/profile').then(response => {
                response?.json().then(data => {
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            });
        }
    }, [session, status])

    // UPDATE USER PROFILE
    async function handleProfileInfoUpdate(ev: any, data: any) {
        try {
            ev.preventDefault();
            const savingPromise = new Promise<void>(async (resolve, reject) => {
                const response = await fetch('/api/dashboard/profile', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                });
                if (response.ok) {
                    router.refresh();
                    resolve();
                } else {
                    reject();
                }
                
                //  SET TOAST
                await toast.promise(savingPromise, {
                    loading: 'Saving...',
                    success: 'Profile Saved!',
                    error: 'Password must be at least 5 character',
                });
                return response;
            })

        } catch (error) {
            console.log(error.message)
        }
    }

    if (status === 'loading' || !profileFetched) {
        return 'Loading user info...!'
    }

    if (status === 'unauthenticated') {
        return redirect('/login');
    }

    return(
        <div id="profile">
            <UserForm user={user} onSave={handleProfileInfoUpdate}/>
            { status !== "authenticated" && (
                <UnauthorizedPage />
            )}
        </div>
    )
}

export default ProfilePage;