"use client";
import UserForm from "@/components/Dashboard/Profile/UserForm";
import { ChevronLeft } from "@/components/icons/Arrow";
import UseProfile from "@/components/UseProfile";
import { UserInformation } from "@/types/user-information";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoAlertCircle } from "react-icons/io5";

export default function EditUsersPage() {

    const { id } = useParams();
    const {loading, data} = UseProfile();
    const [user, setUser] = useState<UserInformation>(null);
    const router = useRouter();

    const handleBackButton = () => {
        router.push('/dashboard/users')
    }

    useEffect(() => {
        fetch('/api/dashboard/profile?_id='+id).then(res => {
            res.json().then(user => {
                setUser(user);
            });
        });
    }, [id]);

    async function handleProfileInfoUpdate(ev: any, data: any) {
        try {
            ev.preventDefault();
            const promise = new Promise<void>(async (resolve, reject) => {
                const response = await fetch('/api/dashboard/profile', {
                    method: 'PUT',
                    headers: {'Content-Type' : 'application/json'},
                    body: JSON.stringify({...data, _id:id}),
                })
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            })
            await toast.promise(promise, {
                loading: 'Saving user...',
                success: 'User saved!',
                error: 'An error has occurred while saving the user',
            })
        } catch (error: any) {
            console.log(error);
        }
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an admin!'
    }

    return (
        <div id="users">
            <div className="flex justify-between items-center">
                <div className="w-[50px] rounded-full">
                    <button className="back-button" onClick={handleBackButton}>
                        <ChevronLeft />
                    </button>
                </div>
                <div className="flex items-center bg-red-200 text-white text-sm p-2 rounded-xl select-none">
                    Be careful
                    <IoAlertCircle className="w-4 h-4" />
                </div>
            </div>
            <UserForm user={user} onSave={handleProfileInfoUpdate}/>
        </div>
    )
}