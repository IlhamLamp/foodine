import { CartContext } from "@/components/CartContext";
import { ProductSize } from "@/types/cart";
import { useContext } from "react";
import toast from "react-hot-toast";

const CartItemCounter: React.FC<{ productId: string, selectedSizes: ProductSize }> = ({ productId, selectedSizes }) => {
    const { cartProducts, removeFromCart, addToCart } = useContext(CartContext);

    const handleDecrement = () => {
        removeFromCart(productId, selectedSizes);
    };

    const handleIncrement = () => {
        const dataCart = cartProducts.items.find(item => item.product._id === productId && item.selectedSizes.name === selectedSizes.name);
        if (product) {
            addToCart(dataCart.product, product.selectedSizes);
            toast('Product Added!', {
                icon: '😄'
            })
        }
    };

    const product = cartProducts.items.find(item => item.product._id === productId && item.selectedSizes.name === selectedSizes.name);
    const quantity = product ? product.quantity : 0;

    return (
        <div className="flex items-center">
            <div role="button" className="border rounded-md py-2 px-4 mr-2" onClick={handleDecrement}>-</div>
            <span className="text-center w-8">{quantity}</span>
            <div role="button" className="border rounded-md py-2 px-4 ml-2" onClick={handleIncrement}>+</div>
        </div>
    );
}

export default CartItemCounter;
