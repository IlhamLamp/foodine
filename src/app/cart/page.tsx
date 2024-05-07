"use client";
import BackShopping from "@/components/Cart/Button/BackShopping";
import DeleteCartPopup from "@/components/Cart/Button/DeleteCartPopup";
import DeleteCartProduct from "@/components/Cart/Button/DeleteCartProduct";
import CartProductTable from "@/components/Cart/CartProductTable";
import CartSummary from "@/components/Cart/CartSummary";
import { CartContext } from "@/components/CartContext";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

const CartPage: React.FC = () => {

    const { cartProducts, clearCart } = useContext(CartContext);
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const handleDeleteCart = () => {
        clearCart();
        handleClosePopup();
        toast.success('Succes delete cart!');
    }

    const handleOpenPopup = () => {
        setShowPopup(true);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
    }

    return (
        <section className="mt-28 mx-auto">

            { showPopup ? <DeleteCartPopup closePopup={handleClosePopup} handleDelete={handleDeleteCart} /> : '' }

            <div className={`flex flex-col max-w-6xl mx-auto ${showPopup ? '' : 'relative' }`}>

                <div className={`w-3/4 bg-white px-10 mb-5 ${showPopup ? '' : 'relative' }`}>
                    <CartProductTable cartProduct={cartProducts.items} />
                    <div className="flex items-center text-center justify-between">
                        <BackShopping />
                        { cartProducts.items.length > 0 ? <DeleteCartProduct openPopup={handleOpenPopup} /> : ''}
                    </div>
                </div>

                <div className={`w-1/4 px-8 right-10 ${showPopup ? 'hidden' : 'fixed' }`}>
                    <CartSummary />
                </div>

            </div>
        </section>   
    )
}

export default CartPage;