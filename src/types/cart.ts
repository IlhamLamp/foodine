import { MenuItems } from "./menu";

type ProductSize = {
    _id?: string | number;
    name: string;
    price: number;
}

export type CartItems = { product: MenuItems, quantity?: number, sizes?: ProductSize }