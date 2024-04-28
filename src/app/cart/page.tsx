"use client";
import BackShopping from "@/components/Cart/Button/BackShopping";
import DeleteCartPopup from "@/components/Cart/Button/DeleteCartPopup";
import DeleteCartProduct from "@/components/Cart/Button/DeleteCartProduct";
import CartProductTable from "@/components/Cart/CartProductTable";
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

            <div className="sm:flex max-w-6xl mx-auto">

                <div className="w-full sm:w-3/4 bg-white px-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                        <h2 className="font-semibold text-2xl">{cartProducts?.length || 0} item</h2>
                    </div>
                    <CartProductTable cartProduct={cartProducts} />

                    <div className="flex items-center text-center justify-between">
                        <BackShopping />
                        { cartProducts.length > 0 ? <DeleteCartProduct openPopup={handleOpenPopup} /> : ''}
                    </div>
                </div>

                <div id="summary" className=" w-full sm:w-1/4 md:w-1/2 px-8">
                    <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
                    <div className="flex justify-between mt-10 mb-5">
                        <span className="font-semibold text-sm uppercase">Items 3</span>
                        <span className="font-semibold text-sm">590$</span>
                    </div>
                    <div>
                        <label className="font-medium inline-block mb-3 text-sm uppercase">
                            Shipping
                        </label>
                        <select className="block p-2 text-gray-600 w-full text-sm">
                            <option>Standard shipping - $10.00</option>
                        </select>
                    </div>
                    <div className="py-10">
                        <label
                            htmlFor="promo"
                            className="font-semibold inline-block mb-3 text-sm uppercase"
                            >
                            Promo Code
                            </label>
                        <input
                            type="text"
                            id="promo"
                            placeholder="Enter your code"
                            className="p-2 text-sm w-full"
                            />
                    </div>
                    <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">
                            Apply
                    </button>
                    <div className="border-t mt-8">
                        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                        <span>Total cost</span>
                        <span>$600</span>
                        </div>
                        <button className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                            Checkout
                            </button>
                    </div>
                </div>
            </div>
        </section>   
    )
}

export default CartPage;