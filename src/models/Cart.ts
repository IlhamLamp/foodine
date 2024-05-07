import mongoose, { model, models, Schema } from "mongoose";

const CartProductSizes = new Schema({
    _id: { type: String },
    name: { type: String },
    price: { type: Number },
})

const CartItemSchema = new Schema({
    productId: { type: mongoose.Types.ObjectId, required: true, ref: 'MenuItem'},
    quantity: {type: Number},
    selectedSizes: {type: CartProductSizes},
    totalPrices: {type: Number},
})

const CartSchema = new Schema({
    email: { type: String, unique: true },
    items: {type: [CartItemSchema]},
    transactionId: { type: String, unique: true },
    totalItemsQty: { type: Number },
    totalItemsPrice: { type: Number },
    shippingAddress: { type: String },
    shippingCosts: { type: Number },
    deliveryDistance: { type: Number },
    paymentMethod: { type: String, default: 'COD' },
    serviceFee: { type: Number },
    totalTransactionPrice: { type: Number },
    status: { type: String, default: 'unpaid' },
}, {timestamps: true})

export const Cart = models?.Cart || model('Cart', CartSchema)