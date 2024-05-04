import { MenuItems } from "@/types/menu";
import { BsCartPlus } from "react-icons/bs";

const MenuCard: React.FC<{item: MenuItems, openPopup?: any}> = ({ item, openPopup}) => {

    const { image, name, sizes, active, basePrice } = item;

    return (
        <div className={active ? "cursor-pointer" : "cursor-not-allowed"}>
            <img src={image} alt={name} className="h-30 w-48 object-cover rounded-t-xl"/>
            <div className="px-4 py-3 w-48">
                <span className="text-gray-400 mr-3 text-xs">{sizes?.[0].name}</span>
                <p className="text-md font-bold text-black truncate block capitalize">{name}</p>
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-black my-3 cursor-pointer">{active ? `Rp. ` + basePrice.toString() || '' : 'Out of stock'}</p>
                    { active ? (
                        <div className="bg-primary text-white p-2 rounded-full btn-hover hover:bg-secondary hover:text-canvas" role="button" onClick={openPopup}>
                        <BsCartPlus className="w-6 h-6"/>
                    </div>
                    ): ('')}
                </div>
            </div>
        </div>
    )
}

export default MenuCard;