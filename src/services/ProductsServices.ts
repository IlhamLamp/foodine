import { connect } from "@/libs/dbConnect";

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
}

export const productsService = new ProductsService();