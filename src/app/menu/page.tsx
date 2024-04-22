"use client";

import CategorySide from "@/components/Menu/Content/CategorySide";
import MenuSide from "@/components/Menu/Content/MenuSide";
import SelectedCategoryContext from "@/components/Menu/Context/SelectedCategoryContext";
import MenuSearchBar from "@/components/Menu/Header/MenuSearchBar";
import { useState } from "react";

export default function MenuUserPage({ searchParams } : Readonly<{
    searchParams? : {
        category?: string;
        search?: string;
    }
}>) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const searchQuery = searchParams?.search || "";

    return (
        <SelectedCategoryContext.Provider value={{ selectedCategory, setSelectedCategory}}>
            <section id="menu-user">
                <div className="flex py-5">
                    <MenuSearchBar />
                </div>
                <div className="flex flex-row gap-2">
                    <CategorySide />
                    <MenuSide searchQuery={searchQuery}/>
                </div>
            </section>
        </SelectedCategoryContext.Provider>
    )
}