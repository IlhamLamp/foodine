import { MenuItems } from "@/types/menu";
import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

type ProductSize = {
    _id?: string | number;
    name: string;
    price: number;
}

interface CartDocument extends Document {
    userId: ObjectId;
    items: Array<{ product: MenuItems; quantity: number; sizes: ProductSize}>;
  }

const CartSchema: Schema<CartDocument> = new Schema<CartDocument>({
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    items: {type:[]}
})