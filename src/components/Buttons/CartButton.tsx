"use client";

import Link from "next/link";
import { useContext } from "react";
import { IoCartOutline } from "react-icons/io5";
import { CartContext } from "../AppContext";

const ShoppingCart: React.FC = () => {

    const { cartProducts } = useContext(CartContext);

    return (
        <Link href={'/'} className={`
            z-10 items-center justify-center right-6 bottom-8 !flex bg-secondary 
            text-canvas font-bold p-4 rounded-full btn-hover hover:bg-primary fixed
        `}>
            <IoCartOutline className="w-8 h-8" />
            <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full p-3 leading-3">
                <span>{ cartProducts?.length }</span>
            </span>
        </Link>
    )
}

export default ShoppingCart;