import { CartContext } from "@/components/CartContext";
import { useContext } from "react";
import toast from "react-hot-toast";

const CartItemCounter: React.FC<{ productId: string, sizeName: string }> = ({ productId, sizeName }) => {
    const { cartProducts, removeFromCart, addToCart } = useContext(CartContext);

    const handleDecrement = () => {
        removeFromCart(productId, sizeName);
    };

    const handleIncrement = () => {
        const dataCart = cartProducts.find(item => item.product._id === productId && item.sizes.name === sizeName);
        if (product) {
            addToCart(dataCart.product, product.sizes);
            toast('Product Added!', {
                icon: '😄'
            })
        }
    };

    const product = cartProducts.find(item => item.product._id === productId && item.sizes.name === sizeName);
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
