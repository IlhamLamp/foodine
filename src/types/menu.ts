import { ObjectId } from "mongodb";
import { Key } from "react";

export type Category = {
    _id: string;
    name: string;
}

type ExtraPrice = {
    _id?: string | number | Key;
    name: string;
    price: number;
}

export type MenuItems = {
    _id?: string;
    image?: string;
    name?: string;
    description?: string;
    category?: ObjectId | null;
    basePrice?: number;
    sizes?: [ExtraPrice];
    stock?: number;
    active?: boolean;
}