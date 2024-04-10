"use client";
import Pagination from "@/components/Buttons/Pagination";
import { BackArrow, RightArrow } from "@/components/icons/Arrow";
import UseProfile from "@/components/UseProfile"
import { Category, MenuItems } from "@/types/menu";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage( {searchParams}: {
    searchParams: { page: string },
} ) {

    const { loading, data } = UseProfile();
    const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
    const [totalItem, setTotalItem] = useState<number>();
    const [categories, setCategories] = useState<Category[]>([]);

    // pagination
    let page = parseInt(searchParams.page, 10);
    page = !page || page < 1 ? 1 : page;
    const perPage = 9;

    const totalPages = Math.ceil(totalItem / perPage);
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const isPageOutOfRange = page > totalPages;

    const pageNumbers: number[] = [];
    const offsetNumber = 3;
    for ( let i = page - offsetNumber; i <= page + offsetNumber; i++ ) {
        if (i >= 1 && i <=  totalPages) {
            pageNumbers.push(i);
        }
    }
    
    useEffect(() => {
        fetchMenuItems(page);
        fetchAllCategories();
    }, [searchParams]);

    function fetchMenuItems(pageNumber: number = 1) {
        fetch(`/api/dashboard/menu-items?page=${pageNumber}&per_page=${perPage}`)
        .then(res => {
            res.json().then(data => {
                setMenuItems(data.menuItem);
                setTotalItem(data.totalItem);
            })
        })
    }

    function fetchAllCategories() {
        fetch('/api/dashboard/categories/all').then(res => {
            res.json().then(data => {
                setCategories(data);
            })
        })
    }

    if (loading) {
        return 'Loading user info...'
    }

    if (!data.admin) {
        return 'Not an Admin!'
    }

    return (
        <div id="menu-items">
            {/* HEADER */}
            <div className="flex flex-row">
                <div className="basis-3/4">
                    Yahuu
                </div>
                <div className="basis-1/4">
                    <Link className="button bg-canvas flex" href={'/dashboard/menu-items/new'}>
                        <span>Add Menu</span>
                        <RightArrow />
                    </Link>
                </div>
            </div>
            <div>
                <h2 className="text-sm text-secondary mt-8">Edit menu item: </h2>
                <div className="flex flex-row">
                    <div className="flex flex-col bg-primary text-white rounded-xl p-2">
                        <h1 className="mx-auto font-semibold">Filter by Categories</h1>
                        {categories?.length > 0 && categories.map(c => (
                            <div key={c._id} className="my-1">
                                <span key={c._id}>{c.name}</span>
                                <hr/>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-3 gap-2 mx-auto">
                        {menuItems?.length > 0 && menuItems.map(item => (
                            <Link href={'/menu-items/edit/'+item._id} className="button mb-1 flex-col bg-canvas border-none" key={item._id} >
                                <div className="relative mx-auto text-center">
                                    <Image src={item.image !== "" ? item.image : "/images/image-not-found.png"} alt={''} width={100} height={100} className="rounded-lg" />
                                </div>
                                <div className="text-center">
                                    {item.name}
                                </div>
                            </Link>
                        ))}
                    </div>
                    {menuItems?.length === 0 && (
                        <div className="mx-auto text-center">Menu items not found!</div>
                    )}
                </div>
            </div>
            {isPageOutOfRange ? (
                <div className="mx-auto text-center flex flex-col">
                    <h1 className="text-xl">No more pages...</h1>
                    <div className="my-3 mx-auto">
                        <Link href={`?page=1`} className="flex flex-row bg-primary hover:bg-secondary text-white hover:text-canvas p-4 rounded-2xl"><BackArrow /></Link>
                    </div>
                </div>
            ) : (
                <Pagination page={page} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} />
            )}
        </div>
    )
}