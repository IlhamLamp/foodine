import { model, models, Schema } from "mongoose";
import { CartItemSchema } from "./Cart";

const TransactionSchema = new Schema({
    transactionId: { type: String, unique: true, required: true },
    email: { type: String, required: true, index: true },
    name: { type: String },
    phone: { type: String },
    items: { type: [CartItemSchema]},
    totalItemsQty: { type: Number },
    totalItemsPrice: { type: Number },
    shippingAddress: { type: String, required: true },
    shippingCosts: { type: Number, required: true },
    deliveryDistance: { type: Number, required: true },
    deliveryStatus: { type: String, default: 'pending'},
    paymentMethod: { type: String, required: true },
    serviceFee: { type: Number, required: true },
    totalTransactionPrice: { type: Number, required: true },
    snapToken: { type: String, unique: true },
    snapRedirectUrl: { type: String },
    status: { type: String, default: 'unpaid' },
    returnProduct: { type: Boolean, default: false},
}, { timestamps: true });

export const Transaction = models?.Transaction || model('Transaction', TransactionSchema);