import { CartItems } from "@/types/cart";
import CartItemCounter from "./Button/CartItemCounter";

const CartProductTable: React.FC<{ cartProduct: CartItems[] }> = ({ cartProduct }) => {

    function countPrice(basePrice: number, sizePrice: number, quantity: number = 1): number {
        const total = ( basePrice + sizePrice ) * quantity;
        return total;
    }

    return (
        <div className="flex bg-white rounded-lg py-6 mb-4">
            <table className="w-full">
                <thead className="relative">
                    <tr>
                        <th className="text-left font-semibold text-gray-500">Product Details</th>
                        <th className="text-left font-semibold text-gray-500">Price</th>
                        <th className="text-left font-semibold text-gray-500">Quantity</th>
                        <th className="text-left font-semibold text-gray-500">Total</th>
                    </tr>
                </thead>
                <tbody>
                    { cartProduct.length > 0 && cartProduct.map((c, i) => (
                        <tr key={c.product._id + i} className="border-b">
                            <td className="py-4">
                                <div className="flex flex-row items-center">
                                    <img className="h-16 w-16 mr-4" src={c.product.image} alt={c.product.name} />
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{c.product.name}</span>
                                        <span className="text-sm text-gray-500">{c.sizes?.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">Rp. {countPrice(c.product.basePrice, c.sizes?.price)}</td>
                            <td className="py-4">
                                <CartItemCounter productId={c.product._id} sizeName={c.sizes.name} />
                            </td>
                            <td className="py-4 font-semibold">Rp. {countPrice(c.product.basePrice, c.sizes?.price, c.quantity)}</td>
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