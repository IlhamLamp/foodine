"use client";
import DeleteButton from "@/components/Buttons/DeleteButon";
import { BackArrow, Backward, Blocked, Forward } from "@/components/icons/Arrow";
import UseProfile from "@/components/UseProfile";
import { Category, MenuItems } from "@/types/menu";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage( {searchParams} : {
    searchParams: {page: string}
}) {

    const { loading, data } = UseProfile();
    const [categoryName, setCategoryName] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalCategories, setTotalCategories] = useState<number>();
    const [editCategory, setEditCategory] = useState<Category>(null);
    const [menuItems, setMenuItems] = useState<MenuItems[]>([]);

    // pagination
    let page = parseInt(searchParams.page, 10);
    page = !page || page < 1 ? 1 : page;
    const perPage = 5;

    const totalPages = Math.ceil(totalCategories / perPage);
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
    // 

    useEffect(() => {
        fetchCategories(page);
        fetchMenuItems();
    }, [searchParams]);

    function fetchMenuItems() {
        fetch('/api/dashboard/menu-items')
        .then(res => {
            res.json().then(data => (
                setMenuItems(data)
            ))
        })
    }

    function fetchCategories(pageNumber: number = 1) {
        fetch(`/api/dashboard/categories?page=${pageNumber}&per_page=${perPage}`)
        .then(res => {
            res.json().then(data => {
                setCategories(data.categories);
                setTotalCategories(data.totalItem);
            })
        })
    };

    async function handleDeleteClick(_id: string) {
        const promise = new Promise<void>(async (resolve, reject) => {
            const response = await fetch('/api/dashboard/categories?_id='+_id, {
                method: 'DELETE',
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
        })

        setEditCategory(null);
        setCategoryName('');
        fetchCategories(page);

    }

    async function handleCategorySubmit(ev: any) {
        try {
            ev.preventDefault();
            const creationPromise = new Promise<void>(async (resolve, reject) => {
                const data: {_id?: string; name: string;} = {name: categoryName};
                if (editCategory) {
                    data._id = editCategory._id;
                }
                const response = await fetch('/api/dashboard/categories', {
                    method: editCategory ? 'PUT' : 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(data)
                })
                setCategoryName('');
                fetchCategories(page);
                setEditCategory(null);
                if (response.ok) {
                    resolve();
                } else {
                    reject();
                }
            });

            await toast.promise(creationPromise, {
                loading: editCategory
                        ? 'Updating Category...'
                        : 'Creating new category...',
                success: editCategory
                        ? 'Category updated'
                        : 'Category created',
                error: 'Error, sorry...',
            })
        } catch (error: any) {
            console.log(error);
        }
    }

    if (loading) {
        return 'Loading categories info...!'
    }

    if (!data.admin) {
        return redirect('/login');
    }

    return (
        <div id="categories">
            <form className="" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editCategory ? 'Update category name' : 'New category name'}
                            {editCategory && (
                                <>: <b>{editCategory.name}</b></>
                            )}
                        </label>
                        <input
                            type="text"
                            value={categoryName}
                            onChange={(ev) => setCategoryName(ev.target.value)}
                         />
                    </div>
                    <div className="pb-2 flex gap-2">
                        <button className="border border-primary" type="submit">
                            {editCategory ? 'Update' : 'Create'}
                        </button>
                        <button 
                            type="button"
                            onClick={() => {
                                setEditCategory(null);
                                setCategoryName('');
                            }}
                            className="bg-gray-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
            <div>
                <h2 className="mt-4 text-sm text-secondary">List category:</h2>
                {categories?.length > 0 && categories.map(c => (
                    <div
                        key={c._id}
                        className="bg-canvas rounded-xl p-2 px-4 flex gap-1 mb-2 border-none items-center"
                    >
                        <div className="grow flex flex-row mx-auto">
                            <span className="font-semibold">{c.name}</span>
                            <div className="flex flex-row gap-2 mx-auto ">
                                {menuItems.filter(item => item.category?.toString() === c._id).map(item => (
                                    <div key={item._id}>
                                        <span className="text-gray-400">{item.name},</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button 
                                type="button"
                                onClick={() => {
                                    setEditCategory(c);
                                    setCategoryName(c.name);
                                }}
                                className="bg-tertiary border-none"
                            >
                                Edit
                            </button>
                            <DeleteButton label={'Delete'} onDelete={() => handleDeleteClick(c._id)} />
                        </div>
                    </div>
                ))}
            </div>
            {isPageOutOfRange ? (
                <div className="mx-auto text-center flex flex-col">
                    <h1 className="text-xl">No more pages...</h1>
                    <div className="my-3 mx-auto">
                        <Link href={`?page=1`} className="flex flex-row bg-primary hover:bg-secondary text-white hover:text-canvas p-4 rounded-2xl"><BackArrow /></Link>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center mt-5">
                    <div className="flex border-[1px] gap-4 rounded-[10px] border-primary h-14 items-center">
                        { page === 1 ? (
                            <div className="opacity-60 cursor-not-allowed flex items-center bg-primary size-full p-3 rounded-l-lg" aria-disabled="true">
                                <span className="text-white"><Blocked /></span>
                            </div>
                        ) : (
                            <Link className="flex items-center bg-primary text-canvas font-semibold hover:opacity-50 size-full p-3 rounded-l-lg" href={`?page=${prevPage}`} aria-label="Previous page"><Backward /></Link>
                        )}

                        {pageNumbers.map((pageNumber, index) => (
                            <Link
                                key={index}
                                className={ page === pageNumber
                                    ? "bg-primary font-bold px-2 rounded-md text-white"
                                    : "hover:bg-primary px-1 rounded-md hover:text-white"
                                }
                                href={`?page=${pageNumber}`}
                            >
                                {pageNumber}
                            </Link>
                        ))}

                        { page === totalPages ? (
                            <div className="opacity-60 cursor-not-allowed flex items-center bg-primary size-full p-3 rounded-r-lg" aria-disabled="true">
                                <span className="text-white"><Blocked /></span>
                            </div>
                        ) : (
                            <Link className="flex items-center bg-primary text-canvas font-semibold hover:opacity-50 size-full p-3 rounded-r-lg" href={`?page=${nextPage}`} aria-label="Next page"><Forward /></Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}