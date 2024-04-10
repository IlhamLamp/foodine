"use client";
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function UserTabs({ isAdmin }) {

    const path = usePathname();

    return (
        <div className="flex mx-auto gap-2 tabsUserProfile justify-center">
            <Link href={'/dashboard/profile'} className={path === '/dashboard/profile' ? 'active' : ''} >Profile</Link>
            { isAdmin && (
                <>
                    <Link href={'/dashboard/categories?page=1'} className={path === '/dashboard/categories' ? 'active' : ''}>Categories</Link>
                    <Link href={'/dashboard/menu-items?page=1'} className={path.includes('/dashboard/menu-items') ? 'active' : ''}>Menu Items</Link>
                    <Link href={'/dashboard/users'} className={path.includes('/dashboard/users') ? 'active' : ''}>Users</Link>
                    <Link href={'/dashboard/orders'} className={path === '/dashboard/orders' ? 'active' : ''}>Orders</Link>
                </>
            )}
        </div>
    )
}