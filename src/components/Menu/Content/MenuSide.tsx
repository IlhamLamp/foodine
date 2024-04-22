import { MenuItems } from "@/types/menu";
import { useContext, useEffect, useState } from "react";
import SelectedCategoryContext from "../Context/SelectedCategoryContext";
import Link from "next/link";
import { BackArrow } from "@/components/icons/Arrow";
import MenuCard from "./MenuCard";
import MenuPopup from "./MenuPopup";

const MenuSide: React.FC<{ searchQuery?: string}> = ({ searchQuery }) => {

    const { selectedCategory } = useContext(SelectedCategoryContext);
    const [allMenu, setAllMenu] = useState<MenuItems[]>([]);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<MenuItems | null>(null);

    const menuFilter = allMenu.filter(item => item.category === selectedCategory);
    const menuToShow = selectedCategory === "All" ? allMenu : menuFilter;

    useEffect(() => {
        fetchMenuItems(selectedCategory, searchQuery);
    }, []);

    function fetchMenuItems(category: string, query: string = "") {
        if (query !== "") {
            fetch(`/api/menu?category=${category}&search=${query}`).then(res => {
                res.json().then(data => (
                    setAllMenu(data)
                ));
            });
        } else {
            fetch(`/api/menu?category=${category}`).then(res => {
                res.json().then(data => (
                    setAllMenu(data)
                ));
            });
        }
    };

    const handleBackButton = () => {
        fetchMenuItems("All", "");
    }

    const handleOpenPopup = (item: MenuItems) => {
        setSelectedItem(item);
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    return (
        <div className="mx-auto items-center p-2">
            {showPopup && (
                <MenuPopup item={selectedItem} btnClose={handleClosePopup}/>
            )}
            <div className="grid grid-cols-4 gap-4">
                { menuToShow.length > 0 ? (
                    menuToShow.map((item) => (
                        <div key={item._id} className={`h-fit w-48 bg-white shadow-md rounded-xl ${!showPopup && item.active ? 'duration-500 hover:scale-105 hover:shadow-xl' : ''}`}>
                            <MenuCard item={item} openPopup={() => {handleOpenPopup(item)}} />
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col col-start-1 col-end-5">
                        <ItemNotFound searchQuery={searchQuery} backButton={handleBackButton} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MenuSide;

function ItemNotFound({ searchQuery, backButton }) {
    return (
        <div className="text-center flex flex-col">
            <h1 className="text-xl">Search: <span className="text-primary font-bold">{searchQuery || ""}</span> no results found...</h1>
            <div className="my-3 mx-auto">
                <Link href={`/menu`} className="flex flex-row bg-primary hover:bg-secondary text-white hover:text-canvas p-4 rounded-2xl" onClick={backButton}><BackArrow /></Link>
            </div>
        </div>
    )
}