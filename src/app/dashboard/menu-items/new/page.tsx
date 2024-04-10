"use client";
import MenuItemForm from "@/components/Dashboard/MenuItems/MenuItemForm";
import { ChevronLeft } from "@/components/icons/Arrow";
import UseProfile from "@/components/UseProfile";
import { MenuItems } from "@/types/menu";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function NewMenuItemPage() {

    const {loading, data} = UseProfile();
    const MenuItem: MenuItems = {};
    const router = useRouter();

    const handleBackButton = () => {
        router.push('/dashboard/menu-items')
    }

    async function handleFormSubmit(ev: any, data: any) {
        try {
            ev.preventDefault();
            const savingPromise = new Promise<void>(async(resolve, reject) => {
                const response = await fetch('/api/dashboard/menu-items', {
                    method: 'POST',
                    headers: { 'Content-Type' : 'application/json' },
                    body: JSON.stringify(data),
                })
                console.log(response);
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
                return response;
            })

            //  SET TOAST
            await toast.promise(savingPromise, {
                loading: 'Saving menu...',
                success: 'Menu Saved!',
                error: 'Error',
            });

            handleBackButton();
        } catch (error) {
            console.log(error.message)
        }
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an admin!'
    }

    return (
        <div id="new-menu-items">
            <div className="w-[50px] rounded-full">
                <button className="back-button" onClick={handleBackButton}>
                    <ChevronLeft />
                </button>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={MenuItem} />
        </div>
    )
}