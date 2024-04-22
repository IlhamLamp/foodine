"use client";
import { MenuItems } from "@/types/menu";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useMemo, useState } from "react";

type CartItem = MenuItems & { quantity?: number};

interface CartContextType {
    cartProducts: any[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addToCart: (product: CartItem, sizes?: any) => void;
    clearCart: () => void;
    // removeCartProduct: (indexToRemove: any) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const cartProductPrice = (cartProduct: CartItem): number => {
    const price = cartProduct.basePrice;
    const sizePrice = cartProduct.sizes?.[0]?.price;
    const total = price + sizePrice;
    return total;
}

export function AppProvider({ children }) {

    const [cartProducts, setCartProducts] = useState<CartItem[]>([]);
    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    // get local storage cart
    useEffect(() => {
        if (ls && ls.getItem('cart')) {
            setCartProducts( JSON.parse( ls.getItem('cart') ) );
        }
    }, []);

    const saveCartProductsToLocalStorage = (cartProducts: CartItem[]) => {
        if (ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    const clearCart = () => {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    const addToCart = (product: CartItem, sizes: any) => {
        setCartProducts(prevProducts => {
            const existingProductIndex = prevProducts.findIndex((p: any) => p._id === product._id && p.sizes.name === sizes.name);
            if (existingProductIndex !== -1) {
                // Produk sudah ada dalam keranjang, tingkatkan kuantitasnya
                const updatedProducts = [...prevProducts];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    quantity: updatedProducts[existingProductIndex].quantity + 1
                };
                saveCartProductsToLocalStorage(updatedProducts);
                return updatedProducts;
            } else {
                // Produk belum ada dalam keranjang, tambahkan sebagai produk baru
                const cartProduct = { ...product, sizes, quantity: 1 };
                const newProducts = [...prevProducts, cartProduct];
                saveCartProductsToLocalStorage(newProducts);
                return newProducts;
            }
        })
    }

    // To avoid additional rerenders wrap the value in a useMemo hook. Use the useCallback() hook if the value is a function.
    const objCart = useMemo(() => ({ cartProducts, setCartProducts, addToCart, clearCart }), [
        cartProducts, setCartProducts,
        addToCart, clearCart
    ]);

    return (
        <SessionProvider>
            <CartContext.Provider value={objCart}>
                {children}
            </CartContext.Provider>
        </SessionProvider>
    )
}