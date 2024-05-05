import mongoose, { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
    userEmail: { type: String, required: true },
    transactionId: { type: mongoose.Types.ObjectId, ref: 'Transaction', required: true },
}, { timestamps: true });

export const Order = models?.Order || model('Order', OrderSchema);