import { MenuItems } from "./menu";

type ProductSize = {
    _id?: string | number;
    name: string;
    price: number;
}

export type CartItems = MenuItems & { quantity?: number, sizes?: ProductSize };
