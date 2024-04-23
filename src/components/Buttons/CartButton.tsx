"use client";

import { useContext, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "../AppContext";

const ShoppingCart: React.FC = () => {

    const [ showMiniCart, setShowMiniCart] = useState<boolean>(false);
    const { cartProducts, clearCart } = useContext(CartContext);

    const handleButtonCart = () => {
        clearCart();
    }

    return (
        <>
            { showMiniCart && (
                <div className="z-10 right-0 bottom-1/2 !flex bg-white shadow-lg fixed">
                    ASDSA
                </div>
            )}
            <div className={`
                z-10 items-center justify-center right-6 bottom-8 !flex bg-secondary 
                text-canvas font-bold p-4 rounded-full btn-hover hover:bg-primary fixed
            `} role="button" onClick={handleButtonCart}>
                <IoCartOutline className="w-8 h-8" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full p-3 leading-3">
                    <span>{ cartProducts?.length }</span>
                </span>
            </div>
        </>
    )
}

export default ShoppingCart;