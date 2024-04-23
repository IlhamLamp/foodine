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
                <thead>
                    <tr>
                        <th className="text-left font-semibold text-gray-500">Product Details</th>
                        <th className="text-left font-semibold text-gray-500">Price</th>
                        <th className="text-left font-semibold text-gray-500">Quantity</th>
                        <th className="text-left font-semibold text-gray-500">Total</th>
                    </tr>
                </thead>
                <tbody>
                    { cartProduct.length > 0 && cartProduct.map(c => (
                        <tr key={c._id + c.sizes.name} className="border-b">
                            <td className="py-4">
                                <div className="flex flex-row items-center">
                                    <img className="h-16 w-16 mr-4" src={c.image} alt={c.name} />
                                    <div className="flex flex-col">
                                        <span className="font-semibold">{c.name}</span>
                                        <span className="text-sm text-gray-500">{c.sizes?.name}</span>
                                    </div>
                                </div>
                            </td>
                            <td className="py-4">Rp. {countPrice(c.basePrice, c.sizes?.price)}</td>
                            <td className="py-4">
                                <CartItemCounter productId={c._id} sizeName={c.sizes.name} />
                            </td>
                            <td className="py-4 font-semibold">Rp. {countPrice(c.basePrice, c.sizes?.price, c.quantity)}</td>
                        </tr>
                    ))}
                    { cartProduct.length === 0 && (
                        <tr>
                            <td colSpan={4} className="text-center">ITEM NOT FOUND</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CartProductTable;