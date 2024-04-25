"use client";
import { CartItems } from "@/types/cart";
import { MenuItems } from "@/types/menu";
import { UserInformation } from "@/types/user-information";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
interface CartContextType {
    cartProducts: CartItems[];
    setCartProducts: React.Dispatch<React.SetStateAction<any[]>>;
    addToCart: (product: MenuItems, sizes?: any) => void;
    removeFromCart: (productId: string, sizeName: string) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);
export const ProfileContext = createContext<UserInformation | null>(null);

export const cartProductPrice = (cartProduct: CartItems): number => {
    const price = cartProduct.basePrice;
    const sizePrice = cartProduct.sizes?.[0]?.price;
    const total = price + sizePrice;
    return total;
}

export function AppProvider({ children }) {

    const [cartProducts, setCartProducts] = useState<CartItems[]>([]);
    const [userData, setUserData] = useState<UserInformation | null>(null);
    const [cartLoaded, setCartLoaded] = useState<boolean>(false);

    const ls = typeof window !== 'undefined' ? window.localStorage : null;

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/dashboard/profile');
                if (!response.ok) {
                    throw new Error(`API request failed with status ${response?.status}`);
                }
                const data = await response?.json();
                setUserData(data);

                // Periksa apakah pengguna sudah memiliki keranjang belanja
                if (data && data.email) {
                    const responseCart = await fetch(`/api/cart/${data.email}`);

                    if (!responseCart.ok) {
                        // Jika pengguna belum memiliki keranjang, buat keranjang baru dan post ke database
                        const cartData = { email: data.email, items: [] };
                        const response = await fetch('/api/cart', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(cartData)
                        });
                        if (response.ok) {
                            setCartProducts([]);
                            setCartLoaded(true);
                        }
                        return response;
                    }

                    if (responseCart.ok) {
                        const cartData = await responseCart.json();
                        if (cartData) {
                            setCartProducts(cartData.items || []);
                            setCartLoaded(true);
                        }
                    } 
                    
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };
        fetchUserData();
    }, [])

    // get local storage cart
    useEffect(() => {
        if (!cartLoaded && ls && ls.getItem('cart')) {
            setCartProducts( JSON.parse( ls.getItem('cart') ) );
        }
    }, []); 

    // store item to local storage
    const saveCartProductsToLocalStorage = (cartProducts: CartItems[]) => {
        if (!cartLoaded && ls && !userData) {
            ls.setItem('cart', JSON.stringify(cartProducts));
        }
    }

    const clearCart = () => {
        setCartProducts([]);
        saveCartProductsToLocalStorage([]);
    }

    const removeFromCart = (productId: string, sizeName: string) => {
        setCartProducts(prevProducts => 
            prevProducts.map(product => 
                (product._id === productId && product.sizes?.name === sizeName && product.quantity > 0)
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
            const existingProductIndex = prevProducts.findIndex((p: any) => p._id === product._id && p.sizes.name === sizes.name);
            if (existingProductIndex !== -1) {
                // Produk sudah ada dalam keranjang, tingkatkan kuantitasnya
                const updatedProducts = [...prevProducts];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    quantity: updatedProducts[existingProductIndex].quantity + 1
                };
                if (!userData && !cartLoaded) {
                    saveCartProductsToLocalStorage(updatedProducts);
                    return updatedProducts;
                }
                setCartProducts(updatedProducts);
                return updatedProducts;
            } else {
                // Produk belum ada dalam keranjang, tambahkan sebagai produk baru
                const cartProduct = { ...product, sizes, quantity: 1 };
                const newProducts = [...prevProducts, cartProduct];
                if (!userData && !cartLoaded) {
                    saveCartProductsToLocalStorage(newProducts);
                    return newProducts;
                }
                setCartProducts(newProducts);
                return newProducts;
            };
        });
    }

    useEffect(() => {
        // Panggil savingCartToDB setiap kali cartProducts berubah
        if (userData && userData.email && cartLoaded) {
            savingCartToDB();
        }
    }, [cartProducts, userData]);    

    async function savingCartToDB() {
        const cartCopy = [...cartProducts];
        const data = {email: userData.email, items: cartCopy}
        const response = await fetch('/api/cart', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response;
    }

    // To avoid additional rerenders wrap the value in a useMemo hook. Use the useCallback() hook if the value is a function.
    const objCart = useMemo(() => ({ cartProducts, setCartProducts, addToCart, clearCart, removeFromCart }), [
        cartProducts, setCartProducts,
        addToCart, clearCart, removeFromCart
    ]);

    return (
        <SessionProvider>
            <ProfileContext.Provider value={userData}>
                <CartContext.Provider value={objCart}>
                    {children}
                </CartContext.Provider>
            </ProfileContext.Provider>
        </SessionProvider>
    )
}