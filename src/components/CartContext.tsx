"use client";
import { CartItems, defaultCart, ProductSize, TypesCart } from "@/types/cart";
import { MenuItems } from "@/types/menu";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ProfileContext } from "./AppContext";

interface CartContextType {
    cartProducts: TypesCart;
    totalQty: number;
    totalPrice: number;
    addToCart: (product: MenuItems, sizes?: ProductSize) => void;
    removeFromCart: (productId: string, selectedSizes: ProductSize) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }) {
    const { userData } = useContext(ProfileContext);
    // CART
    const [cartProducts, setCartProducts] = useState<TypesCart>(defaultCart);
    const [cartLoaded, setCartLoaded] = useState<boolean>(false);
    const [totalQty, setTotalQty] = useState<number>(cartProducts.totalItemsQty);
    const [totalPrice, setTotalPrice] = useState<number>(cartProducts.totalItemsPrice);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    // STORE DATA ON DATABASE
    useEffect(() => {
        const fetchUserCart = async () => {
            try {
                if (userData && userData.email) {

                    const getCart = await fetch(`/api/cart/${userData.email}`);

                    if (!getCart.ok) {
                        console.log('Creating new cart...');
                    }

                    if (getCart.ok) {
                        const cartData = await getCart.json();
                        if (cartData) {
                            setCartProducts(cartData);
                            setCartLoaded(true);
                        }
                    } else {
                        // Jika pengguna belum memiliki keranjang, buat keranjang baru dan post ke database
                        const cartData = { ...cartProducts, email: userData.email};
                        const response = await fetch('/api/cart', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(cartData),
                        });
                        if (response.ok) {
                            setCartProducts(cartData);
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
            countTotalQty();
            countTotalPrice();
        }
    }, [cartProducts, userData, cartLoaded, ls]);

    async function savingCartToDB() {
        if (cartProducts) {
            const payload: TypesCart = { ...cartProducts, totalItemsQty: totalQty, totalItemsPrice: totalPrice, };
            const response = await fetch('/api/cart', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                console.error('Error updating cart in database:', await response.text());
                return toast.error('Error updating cart in database');
            }
        }
    }

    const clearCart = () => {
        setCartProducts((prevCartProucts) => ({ ...prevCartProucts, items: [] }));
    }

    const removeFromCart = async (productId: string, selectedSizes: ProductSize) => {
        setCartProducts((prevCartProducts) => ({
            ...prevCartProducts,
            items: prevCartProducts.items.map((item) =>
                item.product._id === productId && item.selectedSizes.name === selectedSizes.name
                ? { ...item, quantity: Math.max(0, item.quantity -1 )}
                : item
            ).filter(item => item.quantity !== 0)
        }));
        toast('Product removed!', {
            icon: '😢'
        });
    }

    const addToCart = async (product: MenuItems, sizes: ProductSize) => {
        setCartProducts((prevCartProducts) => {
            const existingCartItemIndex = prevCartProducts.items.findIndex(
                (item) => item.product._id === product._id && item.selectedSizes.name === sizes.name
            );
            if (existingCartItemIndex !== -1) {
                // Produk sudah ada dalam keranjang, tingkatkan kuantitasnya
                const updatedCartItems = prevCartProducts.items.map(item => {
                    if (item.product._id === product._id && item.selectedSizes.name === sizes.name) {
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });
                const updatedCartProducts = { ...prevCartProducts, items: updatedCartItems };
                return updatedCartProducts;
            } else {
                // Produk belum ada dalam keranjang, tambahkan sebagai produk baru
                const newCartItem: CartItems = {
                    product,
                    quantity: 1,
                    selectedSizes: sizes,
                    totalPrices: sizes ? product.basePrice + sizes.price : product.basePrice,
                };
                const newItems = [...prevCartProducts.items, newCartItem];
                const newCartProduct = { ...prevCartProducts, items: newItems };
                return newCartProduct;
            }
        });

        if (userData && userData.email && cartLoaded) {
            await updateData();
        }
    }

    const countTotalQty = async () => {
        const totalQuantity = cartProducts.items.reduce((acc, item) => acc + item.quantity, 0);
        setTotalQty(totalQuantity);
    }

    const countTotalPrice = async () => {
        const totalPrices = cartProducts.items.map((item) => {
            const selectedSize = item.selectedSizes._id;
            const productSize = item.product.sizes.find(size => size._id === selectedSize);
            const productPrice = productSize ? productSize.price + item.product.basePrice : item.product.basePrice; 
            const quantity = item.quantity;
            const totalPricePerItem = productPrice * quantity;
            return totalPricePerItem;
        });
        const totalCartPrice = totalPrices.reduce((acc, price) => acc + price, 0);
        setTotalPrice(totalCartPrice);  
    }

    const updateData = async () => {
        if (userData && userData.email && cartLoaded) {
            await countTotalQty();
            await countTotalPrice();
            await savingCartToDB();
        }
    }

    useEffect(() => {
        updateData();
    }, [cartProducts, userData, cartLoaded, totalQty, totalPrice,]);

    // To avoid additional rerenders wrap the value in a useMemo hook. Use the useCallback() hook if the value is a function.
    const cartMemo = useMemo(() => ({ cartProducts, totalQty, totalPrice, addToCart, clearCart, removeFromCart, }), [
        cartProducts, totalQty, totalPrice, addToCart, clearCart, removeFromCart,
    ]);
    
    return (
        <CartContext.Provider value={cartMemo}>
            {children}
        </CartContext.Provider>
    )
    
}