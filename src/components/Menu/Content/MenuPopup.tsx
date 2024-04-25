import { CartContext} from "@/components/AppContext";
import Close from "@/components/icons/Close";
import { MenuItems } from "@/types/menu";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const MenuPopup: React.FC<{btnClose: any, item?: MenuItems}> = ({ btnClose, item }) => {

    const { image, name, description, category, basePrice, sizes, stock, active } = item;
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const { addToCart } = useContext(CartContext);

    const handleAddToCartButtonClick = () => {
        console.log(selectedSize);
        addToCart(item, selectedSize);
        btnClose();
        toast.success('Added to cart');
    }

    // Price
    let selectedPrice = basePrice;
    if (selectedPrice) {
       selectedPrice += selectedSize?.price;
    }
    
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-xl justify-center max-h-fit relative" onClick={ev => ev.stopPropagation()}>
                <span className="absolute -top-4 -right-2 p-2 cursor-pointer bg-red-400 btn-hover hover:bg-red-200 rounded-full text-white" role="button" onClick={btnClose}>
                    <Close />
                </span>
                <div className="flex flex-col">
                    <div className="flex flex-row gap-2 justify-center md:col-span-2">
                        <img src={image} alt={name} width={200} height={200} className="mx-auto"/>
                        <div className="flex flex-col mx-2">
                            <h2 className="text-lg font-bold text-start">{name}</h2>
                            <p className="text-justify text-gray-500 text-sm">{description}</p>
                        </div>
                    </div>
                    <div className="grid">
                        {sizes?.length > 0 && (
                            <div className="">
                                <h3 className="text-center text-gray-700">- Pick your size -</h3>
                                {sizes.map(size => (
                                    <label key={size._id} className="flex bg-tertiary text-gray-800 items-center gap-2 p-2 border rounded-md mb-1">
                                        <input 
                                            type="radio"
                                            name="size"
                                            onClick={() => setSelectedSize(size)}
                                            defaultChecked={selectedSize?.name === size.name}
                                        />
                                        {size.name} Rp.{basePrice + size.price}
                                    </label>
                                ))}
                            </div>
                        )}
                        <button
                            className="primary bg-primary text-canvas btn-hover hover:bg-secondary flex flex-col items-center justify-center my-auto "
                            type="button"
                            onClick={handleAddToCartButtonClick}
                        >
                            Add to cart RP.{selectedPrice}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuPopup;