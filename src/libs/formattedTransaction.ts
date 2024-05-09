import { CartItems, TypesCartItemsDatabase } from "@/types/cart";
import { nanoid } from "nanoid";

export const generateTransactionId = () => {
    const transactionId = `TRX-${nanoid(4)}-${nanoid(8)}`;
    return transactionId;
};

export const itemsDB = async (items: CartItems[]): Promise<TypesCartItemsDatabase[]> => {
    const formattedCart = await Promise.all(
        items.map((p: CartItems) => ({
            productId: p.product._id,
            quantity: p.quantity,
            selectedSizes: p.selectedSizes,
            totalPrices: (p.product.basePrice + p.selectedSizes.price) * p.quantity,
        }))
    );
    return formattedCart;
};