"use client";
import Pagination from "@/components/Buttons/Pagination";
import CategoryItem from "@/components/Dashboard/Categories/CategoryItem";
import { BackArrow} from "@/components/icons/Arrow";
import UseProfile from "@/components/UseProfile";
import { Category, MenuItems } from "@/types/menu";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategoriesPage( {searchParams} : Readonly<{
    searchParams: {page: string}
}>) {

    const { loading, data } = UseProfile();
    const [categoryName, setCategoryName] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [totalCategories, setTotalCategories] = useState<number>();
    const [editCategory, setEditCategory] = useState<Category>(null);
    const [menuItems, setMenuItems] = useState<MenuItems[]>([]);

    // pagination
    const page = parseInt(searchParams.page, 10) || 1;
    // page = !page || page < 1 ? 1 : page;
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
        fetch('/api/dashboard/menu-items/all')
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
        <div id="categories" className="mt-2">
            <form className="" onSubmit={handleCategorySubmit}>
                <div className="flex gap-2 items-end">
                    <div className="grow">
                        <label>
                            {editCategory ? 'Update category name' : 'New category name'}
                            {editCategory && (
                                <>:&nbsp;<b>{editCategory.name}</b></>
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
                    <CategoryItem key={c._id} category={c} menuItems={menuItems} setEditCategory={setEditCategory} setCategoryName={setCategoryName} onDelete={() => handleDeleteClick(c._id)} />
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
                <Pagination page={page} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} />
            )}
        </div>
    )
}