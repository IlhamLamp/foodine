import { generateTransactionId } from "@/libs/transactionHelper";
import mongoose, { model, models, Schema } from "mongoose";

const TransactionSchema = new Schema({
    transactionId: { type: String, unique: true, default: generateTransactionId },
    email: { type: String, unique: true },
    items: [{ type: mongoose.Types.ObjectId, ref: 'Cart' }],
    shippingAddress: { type: String, required: true },
    shippingCosts: { type: Number, required: true },
    deliveryDistance: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    serviceFee: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: 'unpaid' },
}, { timestamps: true });

export const Transaction = models?.Transaction || model('Transaction', TransactionSchema);