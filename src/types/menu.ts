import { ObjectId } from "mongodb";

export type Category = {
    _id: string;
    name: string;
}

type ExtraPrice = {
    name: String;
    price: Number;
}

export type MenuItems = {
    _id?: string;
    image?: string;
    name?: string;
    description?: string;
    category?: ObjectId | null;
    basePrice?: Number;
    sizes?: [ExtraPrice];
    stock?: Number;
    active?: Boolean;
}