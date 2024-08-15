import { useContext } from "react";
import { CartContext } from "../CartContext";
import { ShowDistanceInKilometer } from "@/libs/geoPosition";
import { formatPrice } from "@/libs/formattedCurrency";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ShippingContext } from "../ShippingContext";
import { TransactionContext } from "../TransactionContext";

const CartSummary: React.FC = () => {

    const router = useRouter();
    const { cartProducts, totalQty, totalPrice } = useContext(CartContext);
    const { distance, costShipping } = useContext(ShippingContext);
    const { addTransaction, paymentMethod, setPaymentMethod } = useContext(TransactionContext);

    const distanceInKm = ShowDistanceInKilometer(distance);


    // formatted price
    const formattedTotalPrice = formatPrice(totalPrice);
    const formattedShippingCost = formatPrice(costShipping);
    const formattedTotalCost = formatPrice(totalPrice + costShipping);

    const handleCheckout = () => {
        if (distance >= 30000) {
            return toast.error('Sorry, your order cannot be completed because it exceeds the distance limit of 30 km.');
        }
        
        if (cartProducts && cartProducts.items && cartProducts.items.length > 0) {
            addTransaction(totalPrice, costShipping, totalQty);
            router.push('/checkout');
        } else {
            return toast.error('Please add product before checkout!');
        }
    }

    return (
        <div id="summary" className="bg-gray-100 shadow-lg p-4 rounded-xl">
            <h1 className="font-semibold text-2xl border-b pb-5">Cart Summary</h1>
            <div className="flex justify-between my-2">
                <span className="font-semibold text-sm">Items {totalQty || 0}</span>
                <span className="font-semibold text-sm">{ formattedTotalPrice || 0}</span>
            </div>
            <div>
                <label className="flex justify-between mb-3 text-sm">
                    <span>Shipping { distanceInKm || 0}</span>
                    <span>{ formattedShippingCost || 0}</span>
                </label>
                <select value={paymentMethod} onChange={(ev) => setPaymentMethod(ev.target.value)} className="block p-2 bg-gray-200 text-gray-600 w-full text-sm font-semibold">
                    <option key={"COD"} value={"COD"}>Cash On Delivery</option>
                    <option key={"TRANSFER"} value={"TRANSFER"}>E-Wallet/Transfer/VA</option>
                </select>
            </div>
            <div className="border-t mt-8">
                <div className="flex font-semibold justify-between py-6 text-sm">
                    <span>Total cost</span>
                    <span>{ formattedTotalCost || 0 }</span>
                </div>
                <button className="btn-hover bg-primary font-semibold hover:bg-secondary py-3 text-sm text-white uppercase w-full" onClick={handleCheckout}>
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default CartSummary;