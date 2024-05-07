import { CartItems } from "@/types/cart";
import CartItemCounter from "./Button/CartItemCounter";
import { countPrice } from "@/libs/formattedCurrency";

const CartProductTable: React.FC<{ cartProduct: CartItems[] }> = ({ cartProduct }) => {

    return (
        <div className="flex bg-white rounded-lg mb-4">
            <table className="w-full">
                <thead>
                    <tr>
                        <th className="text-left font-semibold text-gray-500">Product Details</th>
                        <th className="text-left font-semibold text-gray-500">Price</th>
                        <th className="text-left font-semibold text-gray-500">Quantity</th>
                        <th className="text-left font-semibold text-gray-500">Total</th>
                    </tr>
                </thead>
                <tbody>
                    { cartProduct && cartProduct.length > 0 && cartProduct.map((c, i) => (
                        <tr key={c.product._id + i} className="border-b">
                            <td className="py-4">
                                <div className="flex flex-row items-center">
                                    <img className="h-16 w-16 mr-4" src={c.product.image} alt={c.product.name} />
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{c.product.name}</span>
                                        <span className="text-sm text-gray-500">{c.selectedSizes.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">Rp. {countPrice(c.product.basePrice, c.selectedSizes.price)}</td>
                            <td className="py-4">
                                <CartItemCounter productId={c.product._id} selectedSizes={c.selectedSizes} />
                            </td>
                            <td className="py-4 font-semibold">Rp. {countPrice(c.product.basePrice, c.selectedSizes.price, c.quantity)}</td>
                        </tr>
                    ))}
                    { cartProduct.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center pt-14">ITEM NOT FOUND</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CartProductTable;