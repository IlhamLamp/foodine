import { nanoid } from "nanoid";

export const generateTransactionId = () => {
    // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
    // const length = 8;
    // let transactionId = 'TRX';

    // for (let i = 0; i < length; i++) {
    //     const randomIndex = Math.floor(Math.random() * characters.length);
    //     transactionId += characters[randomIndex];
    // }
    const transactionId = `TRX-${nanoid(4)}-${nanoid(8)}`;

    return transactionId;
};