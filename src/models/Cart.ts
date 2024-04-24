import mongoose, { model, models, Schema } from "mongoose"
import { MenuItem } from "./MenuItem"

const CartItemSchema = new Schema({
    product: MenuItem,
    quantity: {type: Number},
    sizes: {type: String}, 
})

const CartSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, required: true, ref: 'Cart'},
    item: {type: [CartItemSchema]}
})

export const Cart = models?.Cart || model('Cart', CartSchema)