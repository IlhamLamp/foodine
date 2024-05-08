import { nanoid } from "nanoid";

export const generateTransactionId = () => {
    const transactionId = `TRX-${nanoid(4)}-${nanoid(8)}`;
    return transactionId;
};