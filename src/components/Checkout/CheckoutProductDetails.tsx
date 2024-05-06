import { useContext } from "react";
import { PiPackageFill } from "react-icons/pi";
import { countPrice, formatPrice } from "@/libs/formattedCurrency";
import { TransactionContext } from "../TransactionContext";
import { CartContext } from "../CartContext";

const CheckoutProductDetails: React.FC = () => {

    const { cartProducts } = useContext(CartContext)
    const { transaction } = useContext(TransactionContext);

    const showPrice = (price: number): string => {
        const result = formatPrice(price);
        return result;
    }

    return (
        <div className="w-full bg-white">
            <div className="px-6 py-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <PiPackageFill className="w-6 h-6 text-primary" />
                        <span className="text-lg font-medium text-primary">Produk Dipesan {transaction?.totalItemsQty ? transaction?.totalItemsQty : '' }</span>
                    </div>
                    <div><span className="font-semibold">Total</span></div>
                </div>
                <div className="flex flex-col px-2 pt-2 gap-2">
                    {cartProducts && cartProducts.length > 0 && cartProducts.map(((item, index) => (
                        <div key={item.product._id + index} className="flex flex-row gap-2 border-b">
                            <div><img src={item.product.image || ''} alt={item.product.name} className="w-[100px] h-[100px]" /></div>
                            <div className="w-full flex flex-col justify-between">
                                <div>
                                    <h1 className="font-semibold text-lg">{item.product.name || ''}</h1>
                                    <p className="text-xs">{item.sizes.name || ''}</p>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <span className="text-sm">{showPrice(item.sizes.price + item.product.basePrice) || 0}</span>
                                    <span className="text-sm">Qty: {item.quantity || 0}</span>
                                    <span className="text-md font-semibold">{showPrice(countPrice(item.product.basePrice, item.sizes?.price, item.quantity))}</span>
                                </div>
                            </div>
                        </div>
                    )))}
                </div>
            </div>
        </div>
    )
}

export default CheckoutProductDetails;