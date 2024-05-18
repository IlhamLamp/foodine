"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UseProfile from "../UseProfile";

export default function UserTabs() {

    const path = usePathname();
    const {data} = UseProfile();

    return (
        <div className="flex mx-auto gap-2 tabsUserProfile justify-center">
            <Link href={'/dashboard/profile'} className={path.includes('/dashboard/profile') ? 'active' : ''} >Profile</Link>
            <Link href={'/dashboard/orders'} className={path.includes('/dashboard/orders') ? 'active' : ''}>Orders</Link>
            { data.admin && (
                <>
                    <Link href={'/dashboard/categories?page=1'} className={path === '/dashboard/categories' ? 'active' : ''}>Categories</Link>
                    <Link href={'/dashboard/menu-items?page=1'} className={path.includes('/dashboard/menu-items') ? 'active' : ''}>Menu Items</Link>
                    <Link href={'/dashboard/users'} className={path.includes('/dashboard/users') ? 'active' : ''}>Users</Link>
                    <Link href={'/dashboard/transactions'} className={path.includes('/dashboard/transactions') ? 'active' : '' }>Transactions</Link>
                </>
            )}
        </div>
    )
}