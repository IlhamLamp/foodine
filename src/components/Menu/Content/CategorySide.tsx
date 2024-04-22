"use client";
import { Category } from "@/types/menu";
import { useContext, useEffect, useState } from "react";
import { IoCaretForward } from "react-icons/io5";
import SelectedCategoryContext from "../Context/SelectedCategoryContext";

const CategorySide: React.FC = () => {

    const [categories, setCategories] = useState<Category[]>([]);
    const { selectedCategory, setSelectedCategory } = useContext(SelectedCategoryContext);

    useEffect(() => {
        fetchAllCategories();
    }, []);

    function fetchAllCategories() {
        fetch('/api/dashboard/categories/all').then(res => {
            res.json().then(data => {
                setCategories(data);
            })
        })
    }

    const handleSelectedCategory = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const categoryId = ev.target.value;
        setSelectedCategory(categoryId ?? "All");
    }

    return (
        <div className="flex flex-col bg-white text-slate-700 rounded-xl p-6 w-[300px] shadow-xl h-fit">
            <h1 className="mx-auto my-2 font-semibold">Filter by Categories</h1>
            <div key="All" className={`p-2 text-sm rounded-lg ${selectedCategory === "All" ? 'bg-gray-200' : ''}`}>
                <label htmlFor="All" className="cursor-pointer w-full flex flex-row items-center mx-auto">
                    {selectedCategory === "All" ? <span><IoCaretForward /></span> : ''}
                    All
                    <input type="radio" id="All" name="categories" value={"All"} checked={selectedCategory === "All"} onChange={handleSelectedCategory} className="cursor-pointer bg-canvas hidden"/>
                </label>
            </div>
            { categories?.length > 0 && categories.map(c => (
                <div key={c._id} className={`p-2 text-sm rounded-lg ${selectedCategory === c._id ? 'bg-gray-200' : ''}`}>
                    <label htmlFor={c._id} className="cursor-pointer w-full flex flex-row items-center mx-auto">
                        {selectedCategory === c._id ? <span><IoCaretForward /></span> : ''}
                        {c.name}
                        <input type="radio" id={c._id} name="categories" value={c._id} checked={selectedCategory === c._id} onChange={handleSelectedCategory} className="cursor-pointer bg-canvas hidden"/>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default CategorySide;