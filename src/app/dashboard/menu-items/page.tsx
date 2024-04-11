"use client";
import Pagination from "@/components/Buttons/Pagination";
import { BackArrow } from "@/components/icons/Arrow";
import { SolidPlusCircle } from "@/components/icons/Symbol";
import UseProfile from "@/components/UseProfile"
import { Category, MenuItems } from "@/types/menu";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MenuItemsPage( {searchParams}: {
    searchParams: { page: string },
} ) {

    const { loading, data } = UseProfile();
    const [menuItems, setMenuItems] = useState<MenuItems[]>([]);
    const [totalItem, setTotalItem] = useState<number>(0);
    const [categories, setCategories] = useState<Category[]>([]);
    
    const [selectedCategory, setSelectedCategory] = useState<ObjectId | string | null>("All");
    const [selectedCtgName, setSelectedCtgName] = useState<string>('');
    
    // pagination
    let page = parseInt(searchParams.page, 10);
    page = !page || page < 1 ? 1 : page;
    const perPage: number = 9;

    const totalPages = Math.ceil(totalItem / perPage);
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;
    const isPageOutOfRange: boolean = page > totalPages;

    const pageNumbers: number[] = [];
    const offsetNumber = 3;
    for ( let i = page - offsetNumber; i <= page + offsetNumber; i++ ) {
        if (i >= 1 && i <=  totalPages) {
            pageNumbers.push(i);
        }
    }

    useEffect(() => {
        fetchAllCategories();
        fetchMenuItems(page, selectedCategory);
    }, [searchParams, selectedCategory]);

    function fetchMenuItems(pageNumber: number = 1, categoryId?: ObjectId | string | null) {
        if (categoryId) {
            fetch(`/api/dashboard/menu-items?page=${pageNumber}&per_page=${perPage}&category=${selectedCategory}`)
            .then(res => {
                res.json().then(data => {
                    setMenuItems(data.menuItem);
                    setTotalItem(data.totalItem);
                })
            })
        } else {
            fetch(`/api/dashboard/menu-items?page=${pageNumber}&per_page=${perPage}`)
            .then(res => {
                res.json().then(data => {
                    setMenuItems(data.menuItem);
                    setTotalItem(data.totalItem);
                })
            })
        }
    }

    function fetchAllCategories() {
        fetch('/api/dashboard/categories/all').then(res => {
            res.json().then(data => {
                setCategories(data);
            })
        })
    }

    const handleCategoryChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = ev.target.value;
        const categoryName = categories.find(c => c._id === categoryId)?.name || "All";
        setSelectedCategory(categoryId ?? "All");
        setSelectedCtgName(categoryName ?? "All");

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('category', categoryName);
        window.history.pushState({}, '', newUrl.toString());
    };

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
                        <SolidPlusCircle />
                    </Link>
                </div>
            </div>
            <div>
                <h2 className="text-sm text-secondary mt-8">Edit menu item: </h2>
                <div className="flex flex-row">
                    <div className="flex flex-col bg-primary text-white rounded-xl p-6">
                        <h1 className="mx-auto font-semibold">Filter by Categories</h1>
                        <div key="All" className="my-1">
                            <input type="radio" id="All" name="categories" value={"All"} checked={selectedCategory === "All"} onChange={handleCategoryChange} className="cursor-pointer bg-canvas"/>
                            <label htmlFor="All" className="cursor-pointer px-2">All({totalItem})</label>
                            <hr/>
                        </div>
                        {categories?.length > 0 && categories.map(c => (
                            <div key={c._id} className="my-1">
                                <input type="radio" id={c._id} name="categories" value={c._id} checked={selectedCategory === c._id} onChange={handleCategoryChange} className="cursor-pointer bg-canvas"/>
                                <label htmlFor={c._id} className="cursor-pointer px-2">{c.name}</label>
                                <hr/>
                            </div>
                        ))}
                    </div>
                    <div className="mx-auto">
                        {selectedCategory !== "All" ? <span>Filtered Category: {selectedCtgName}</span> : ''}
                        <div className="grid grid-cols-3 gap-2 mx-auto">
                            {menuItems?.length === 0 && (
                                <div className="mx-auto text-center flex flex-col col-start-1 col-end-4">
                                    <h1 className="text-xl">No more pages...</h1>
                                    <div className="my-3 mx-auto">
                                        <Link href={`?page=1`} className="flex flex-row bg-primary hover:bg-secondary text-white hover:text-canvas p-4 rounded-2xl"><BackArrow /></Link>
                                    </div>
                                </div>
                            )}
                            { selectedCategory !== "All" ? (
                                menuItems?.length > 0 && menuItems.filter(item => item.category === selectedCategory).map(item => (
                                    <Link href={'/menu-items/edit/'+item._id} className="button mb-1 flex-col bg-canvas border-none" key={item._id} >
                                        <div className="relative mx-auto text-center">
                                            <Image src={item.image || "/images/image-not-found.png"} alt={''} width={100} height={100} className="rounded-lg" />
                                        </div>
                                        <div className="text-center">
                                            {item.name}
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                menuItems?.length > 0 && menuItems.map(item => (
                                    <Link href={'/menu-items/edit/'+item._id} className="button mb-1 flex-col bg-canvas border-none" key={item._id} >
                                        <div className="relative mx-auto text-center">
                                            <Image src={item.image || "/images/image-not-found.png"} alt={''} width={100} height={100} className="rounded-lg" />
                                        </div>
                                        <div className="text-center">
                                            {item.name}
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {isPageOutOfRange ? ('') : (
                <Pagination page={page} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} />
            )}
        </div>
    )
}