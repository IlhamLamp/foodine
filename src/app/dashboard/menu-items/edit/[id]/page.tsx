"use client";
import DeleteButton from "@/components/Buttons/DeleteButon";
import MenuItemForm from "@/components/Dashboard/MenuItems/MenuItemForm";
import { ChevronLeft } from "@/components/icons/Arrow";
import { Trash } from "@/components/icons/Symbol";
import UseProfile from "@/components/UseProfile";
import { MenuItems } from "@/types/menu";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditMenuItemPage() {

    const { id } = useParams();
    const {loading, data} = UseProfile();
    const [menuItem, setMenuItem] = useState<MenuItems>(null);
    const router = useRouter();

    useEffect(() => {
        fetchMenuItems();
    }, [id])

    const handleBackButton = () => {
        router.push('/dashboard/menu-items')
    }

    function fetchMenuItems() {
        fetch('/api/dashboard/menu-items/all').then(res => {
            res.json().then(items => {
                const item = items.find((i: {_id: string | string[];}) => i._id === id);
                setMenuItem(item);
            });
        });
    };
    
    async function handleFormSubmit(ev: any, data: any) {
        try {
            ev.preventDefault();
            data = {...data, _id: id};

            const savingPromise = new Promise<void>(async(resolve, reject) => {
                const response = await fetch('/api/dashboard/menu-items/', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                console.log(response);
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
                return response;
            });

            await toast.promise(savingPromise, {
                loading: 'Saving menu...',
                success: 'Menu Saved!',
                error: 'Error',
            });

            handleBackButton();
        } catch (error: any) {
            console.error(error)
        }
    }

    async function handleDeleteClick() {
        try {
            const promise = new Promise<void>(async (resolve, reject) => {
                const response = await fetch('/api/dashboard/menu-items?_id='+id, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            });
    
            await toast.promise(promise, {
                loading: 'Deleting...',
                success: 'Deleted',
                error: 'Error',
            });
    
            handleBackButton();
        } catch (error: any) {
            console.error(error)
        }
    }

    if (loading) {
        return 'Loading menu items...'
    }

    if (!data.admin) {
        return 'Not an admin!'
    }

    return (
        <div id="edit-menu-items">
            <div className="w-full flex justify-between">
                <div>
                    <div className="w-[50px] rounded-full">
                        <button className="back-button" onClick={handleBackButton}>
                            <ChevronLeft />
                        </button>
                    </div>
                </div>
                <div>
                    <DeleteButton label={<span><Trash /></span>} onDelete={handleDeleteClick}/>
                </div>
            </div>
            <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem} />
        </div>
    )
}