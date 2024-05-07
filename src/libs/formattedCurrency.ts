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

export const countPrice = (basePrice: number, sizePrice: number, quantity: number = 1): number => {

    if (!basePrice || sizePrice) {
        return null;
    }

    const total = ( basePrice + sizePrice ) * quantity;
    return total;
}