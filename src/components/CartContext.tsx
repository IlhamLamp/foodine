"use client";

import { CartItems } from "@/types/cart";
import { MenuItems } from "@/types/menu";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ProfileContext } from "./AppContext";

interface CartContextType {
    cartProducts: CartItems[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addToCart: (product: MenuItems, sizes?: any) => void;
    removeFromCart: (productId: string, sizeName: string) => void;
    clearCart: () => void;
    countQty: () => number;
    totalPrice: () => number;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }) {

    const { userData } = useContext(ProfileContext);

    const [cartProducts, setCartProducts] = useState<CartItems[]>([]);
    const [cartLoaded, setCartLoaded] = useState<boolean>(false);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    // STORE DATA ON DATABASE
    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                if (userData && userData.email) {

                    const getCart = await fetch(`/api/cart/${userData?.email}`);

                    if (getCart.ok) {
                        const cartData = await getCart.json();
                        if (cartData) {
                            setCartProducts(cartData.items || []);
                            setCartLoaded(true);
                        }
                    } else {
                        // Jika pengguna belum memiliki keranjang, buat keranjang baru dan post ke database
                        const cartData = { email: userData.email, items: [] };
                        const response = await fetch('/api/cart', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(cartData)
                        });
                        if (response.ok) {
                            setCartProducts([]);
                            setCartLoaded(true);
                        }
                    }

                } else {
                    setCartProducts( JSON.parse( ls.getItem('cart') ) );     
                }
            } catch (error) {
                console.error('Error fetching user cart:', error);
            }
        }
        fetchUserCart();
    }, [userData]);

    useEffect(() => {
        if (!userData && !cartLoaded && ls) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }, [cartProducts, userData, cartLoaded, ls]);

    async function savingCartToDB() {
        const data = {email: userData.email, items: cartProducts}
        const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            console.error('Error updating cart in database:', await response.text());
            return toast.error('Error updating cart in database');
        }
    }

    const clearCart = () => {
        setCartProducts([]);
    }

    const removeFromCart = async (productId: string, sizeName: string) => {
        setCartProducts(prevProducts => 
            prevProducts.map(product => 
                (product.product._id === productId && product.sizes?.name === sizeName && product.quantity > 0)
                ? { ...product, quantity: Math.max(0, product.quantity - 1)}
                : product
            ).filter(product => product.quantity !== 0)
        );
        toast('Product removed!', {
            icon: '😢'
        });
    }

    const addToCart = async (product: MenuItems, sizes: any) => {
        setCartProducts(prevProducts => {
            const existingProductIndex = prevProducts.findIndex((p: CartItems) => p.product._id === product._id && p.sizes.name === sizes.name);
            if (existingProductIndex !== -1) {
                // Produk sudah ada dalam keranjang, tingkatkan kuantitasnya
                const updatedProducts = [...prevProducts];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    quantity: updatedProducts[existingProductIndex].quantity + 1
                };
                return updatedProducts;
            } else {
                // Produk belum ada dalam keranjang, tambahkan sebagai produk baru
                const cartProduct = {product, sizes, quantity: 1 };
                const newProducts = [...prevProducts, cartProduct];
                return newProducts;
            };
        });

        if (userData && userData.email && cartLoaded) {
            await savingCartToDB();
        }
    }

    const countQty = () => {
        const totalQuantity = cartProducts.reduce((acc, item) => acc + item.quantity, 0);
        return totalQuantity;
    }

    const totalPrice = () => {
        const totalPrices = cartProducts.map((item) => {
            const selectedSize = item.sizes._id;
            const productSize = item.product.sizes.find(size => size._id === selectedSize);
            const productPrice = productSize ? productSize.price + item.product.basePrice : item.product.basePrice; 
            const quantity = item.quantity;
            const totalPricePerItem = productPrice * quantity;
            return totalPricePerItem;
        });
        const totalCartPrice = totalPrices.reduce((acc, price) => acc + price, 0);
        return totalCartPrice;  
    }

    useEffect(() => {
        if (userData && userData.email && cartLoaded) {
            savingCartToDB();
        }
    }, [cartProducts, userData, cartLoaded]);

    // To avoid additional rerenders wrap the value in a useMemo hook. Use the useCallback() hook if the value is a function.
    const cartMemo = useMemo(() => ({ cartProducts, setCartProducts, addToCart, clearCart, removeFromCart, countQty, totalPrice }), [
        cartProducts, setCartProducts,
        addToCart, clearCart, removeFromCart,
        countQty, totalPrice
    ]);
    
    return (
        <CartContext.Provider value={cartMemo}>
            {children}
        </CartContext.Provider>
    )
    
}