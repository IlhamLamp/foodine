"use client";
import UserForm from "@/components/Dashboard/Profile/UserForm";
import { ChevronLeft } from "@/components/icons/Arrow";
import UseProfile from "@/components/UseProfile"
import { BasicUser } from "@/types/user-information";
import { useRouter } from "next/navigation";

export default function CreateUsersPage() {

    const {loading, data} = UseProfile();

    const BasicUser: BasicUser = {};
    const router = useRouter();

    const handleBackButton = () => {
        router.push('/dashboard/users')
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an admin!'
    }
    
    return (
        <div id="new-user">
            <div className="w-[50px] rounded-full">
                <button className="back-button" onClick={handleBackButton}>
                    <ChevronLeft />
                </button>
            </div>
            <UserForm user={BasicUser} onSave={null}/>
        </div>
    )
}