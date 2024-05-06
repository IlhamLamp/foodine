import { generateTransactionId } from "@/libs/transactionHelper";
import mongoose, { model, models, Schema } from "mongoose";

const CheckoutItemSchema = new Schema({
    productId: { type: mongoose.Types.ObjectId, required: true, ref: 'MenuItem'},
    quantity: {type: Number},
    selectedSizes: {type: String},
    totalPrice: {type: Number},
})

const CheckoutSchema = new Schema({
    transactionId: { type: String, unique: true, default: generateTransactionId },
    email: { type: String, unique: true },
    items: { type: [CheckoutItemSchema]},
    totalItemsQty: { type: Number },
    totalItemsPrice: { type: Number },
    shippingAddress: { type: String, required: true },
    shippingCosts: { type: Number, required: true },
    deliveryDistance: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    serviceFee: { type: Number, required: true },
    totalTransactionPrice: { type: Number, required: true },
    status: { type: String, default: 'unpaid' },
}, { timestamps: true });

export const Checkout = models?.Checkout || model('Checkout', CheckoutSchema);