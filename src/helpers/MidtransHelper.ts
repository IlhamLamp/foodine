import { CartItems } from "@/types/cart";
import { TypeMidtransAddress, TypeMidtransItemDetails, TypesMidtransPayload } from "@/types/midtrans";
import { TypesTransaction } from "@/types/transaction";
import { UserInformation } from "@/types/user-information";
import { FRONT_END_URL } from "@/utils/constant";

export class MidtransHelper {
    async getMappedItems(items: CartItems[], shippingCosts: number): Promise<TypeMidtransItemDetails[]> {
        const mappedItems = await Promise.all(
            items.map(async (item) => ({
                id: item.product._id,
                price: item.selectedSizes.price + item.product.basePrice,
                quantity: item.quantity,
                name: item.product.name,
                selectedSizes: item.selectedSizes.name,
                totalPrices: item.totalPrices,
            }))
        );
        
        mappedItems.push({id: 'shipping',
            price: shippingCosts,
            quantity: 1,
            name: 'Shipping Cost',
            selectedSizes: '',
            totalPrices: shippingCosts,
        });

        return mappedItems;
    };
    getAddress(first_name: string, last_name: string, userInfo: UserInformation, shippingAddress: string) {
        return {
            first_name,
            last_name,
            email: userInfo.email,
            phone: userInfo.phone,
            address: shippingAddress,
            city: userInfo.regencies,
            postal_code: userInfo.postalCode,
            country_code: 'IDN',
        }
    };
    createPayload(utid: string, data: TypesTransaction, mappedItems: TypeMidtransItemDetails[], first_name: string, last_name: string, userInfo: UserInformation, type_address: TypeMidtransAddress ): TypesMidtransPayload {
        const payload: TypesMidtransPayload = {
            transaction_details: {
                order_id: utid,
                gross_amount: data.totalTransactionPrice,
            },
            item_details: mappedItems,
            customer_details: {
                first_name,
                last_name,
                email: userInfo.email,
                phone: userInfo.phone,
                billing_address: type_address,
            },
            shipping_address: type_address,
            callbacks: {
                finish: `${FRONT_END_URL}/order-status?transaction_id=${utid}`,
                error: `${FRONT_END_URL}/order-status?transaction_id=${utid}`,
                pending: `${FRONT_END_URL}/order-status?transaction_id=${utid}`,
            }, 
        };
        return payload;
    }
}

export const midtransHelper = new MidtransHelper();