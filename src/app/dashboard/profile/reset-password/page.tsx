"use client";
import ResetPasswordForm from "@/components/Dashboard/Profile/ResetPasswordForm";
import { ChevronLeft } from "@/components/icons/Arrow";
import UseProfile from "@/components/UseProfile";
import { BasicUser } from "@/types/user-information";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {

    const { loading } = UseProfile();
    const router = useRouter();
    const [user, setUser] = useState<BasicUser>(null);
    const [isValid, setIsValid] = useState<boolean>(false);

    const handleBackButton = () => {
        router.push('/');
    }

    useEffect(() => {
        fetch('/api/dashboard/profile').then(response => {
            response?.json().then(data => {
                console.log(data);
                setUser(data);
            })
        });
    }, [])

    async function SubmitPasswordChanges(ev: any, data: any) {
        try {
            ev.preventDefault();
            setIsValid(false);

            const savingPromise = new Promise<void>(async (resolve, reject) => {    
                const response = await fetch('/api/dashboard/profile/reset-password', {
                    method: 'PUT',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data),
                });

                if (response.ok) {
                    setIsValid(true);
                    const logout = signOut();
                    toast.promise(logout, {
                        loading: 'Loading...',
                        success: 'Logout Succesfully!',
                        error: 'Error',
                    });
                    resolve();
                } else {
                    reject();
                }
                
                //  SET TOAST
                await toast.promise(savingPromise, {
                    loading: 'Saving...',
                    success: 'Password changes!',
                    error: 'Invalid current password!',
                });
                return response;
            })

        } catch (error) {
            console.log(error);
            toast.error("An unexpected error occurred. Please try again.");
        }
    }

    if (loading) {
        return 'Loading user info...'
    }

    return (
    <div id="reset-password">
        <div className="w-[50px] rounded-full">
            <button className="back-button" onClick={handleBackButton}>
                <ChevronLeft />
            </button>
        </div>
        <ResetPasswordForm user={user} onSave={SubmitPasswordChanges} isValid={isValid} />
    </div>
    )
}