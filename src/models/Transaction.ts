import mongoose, { model, models, Schema } from "mongoose";

const CheckoutItemSchema = new Schema({
    productId: { type: mongoose.Types.ObjectId, required: true, ref: 'MenuItem'},
    quantity: {type: Number},
    selectedSizes: {type: String},
    totalPrice: {type: Number},
})

const TransactionSchema = new Schema({
    transactionId: { type: String, unique: true, required: true },
    email: { type: String, required: true },
    items: { type: [CheckoutItemSchema]},
    totalItemsQty: { type: Number },
    totalItemsPrice: { type: Number },
    shippingAddress: { type: String, required: true },
    shippingCosts: { type: Number, required: true },
    deliveryDistance: { type: Number, required: true },
    deliveryStatus: { type: String, default: 'pending'},
    paymentMethod: { type: String, required: true },
    serviceFee: { type: Number, required: true },
    totalTransactionPrice: { type: Number, required: true },
    status: { type: String, default: 'unpaid' },
    returnProduct: { type: Boolean, default: false},
}, { timestamps: true });

export const Transaction = models?.Transaction || model('Transaction', TransactionSchema);