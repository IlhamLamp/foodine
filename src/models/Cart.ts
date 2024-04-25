import mongoose, { model, models, Schema } from "mongoose";

const CartItemSchema = new Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, ref: 'MenuItem'},
    quantity: {type: Number},
    sizes: {type: String},
})

const CartSchema = new Schema({
    email: { type: String, unique: true },
    items: {type: [CartItemSchema]}
}, {timestamps: true})

export const Cart = models?.Cart || model('Cart', CartSchema)