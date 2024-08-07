import { connect } from "@/libs/dbConnect";
import { TypesCartItemsDatabase } from "@/types/cart";

connect();

class ProductsService {
    async getAllProducts() {
        try {
            const response = await fetch('/api/dashboard/menu-items/all');
            if (response.ok) {
                const data = response.json();
                return data;
            }
        } catch (error) {
            console.error('Error get all products', error);
        }
    }
    async updateStockProducts(items: TypesCartItemsDatabase[]) {
        try {
            const response = await fetch('/api/dashboard/menu-items/updateProductsStock', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(items),
            })
            return response;
        } catch (error) {
            console.error('Error update products', error);
        }
    }
}

export const productsService = new ProductsService();