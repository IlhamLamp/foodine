import { TypesTransactionDB } from "@/types/transaction";

export function formatPrice(price: number) {

    if (!price) {
        return null;
    }

    return price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    })
}

export const CountSales = (transactions: TypesTransactionDB[]): number => {
    let totalSales: number = 0;

    for (const transaction of transactions) {
        totalSales += transaction.totalTransactionPrice;
    }
    return totalSales;
}

export const countPrice = (basePrice: number, sizePrice: number, quantity: number = 1): number => {

    if (!basePrice && !sizePrice) {
        return null;
    }

    const total = ( basePrice + sizePrice ) * quantity;
    return total;
}