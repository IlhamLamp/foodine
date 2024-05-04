"use client";

import CategorySide from "@/components/Menu/Content/CategorySide";
import MenuSide from "@/components/Menu/Content/MenuSide";
import SelectedCategoryContext from "@/components/Menu/Context/SelectedCategoryContext";
import MenuSearchBar from "@/components/Menu/Header/MenuSearchBar";
import { useMemo, useState } from "react";

export default function MenuUserPage({ searchParams } : Readonly<{
    searchParams? : {
        category?: string;
        search?: string;
    }
}>) {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const searchQuery = searchParams?.search || "";

    const ctgMemo = useMemo(() => ({ selectedCategory, setSelectedCategory }), [
        selectedCategory, setSelectedCategory
    ])

    return (
        <SelectedCategoryContext.Provider value={ctgMemo}>
            <section id="menu-user">
                <div className="relative">
                    <div className="flex flex-col fixed w-1/4">
                        <div className="flex py-5">
                            <MenuSearchBar />
                        </div>
                        <div>
                            <CategorySide />
                        </div>
                    </div>
                    <div className="flex w-3/4 absolute right-0 pl-6">
                        <MenuSide searchQuery={searchQuery}/>
                    </div>
                </div>
            </section>
        </SelectedCategoryContext.Provider>
    )
}