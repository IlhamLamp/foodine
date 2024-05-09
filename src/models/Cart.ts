import mongoose, { model, models, Schema } from "mongoose";

export const CartProductSizes = new Schema({
    _id: { type: String },
    name: { type: String },
    price: { type: Number },
})

export const CartItemSchema = new Schema({
    productId: { type: mongoose.Types.ObjectId, required: true, ref: 'MenuItem'},
    quantity: {type: Number},
    selectedSizes: {type: CartProductSizes},
    totalPrices: {type: Number},
})

const CartSchema = new Schema({
    email: { type: String, unique: true },
    items: {type: [CartItemSchema]},
    totalItemsQty: { type: Number },
    totalItemsPrice: { type: Number },
}, {timestamps: true})

export const Cart = models?.Cart || model('Cart', CartSchema)