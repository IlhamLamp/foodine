export function formatPrice(price: number) {

    if (!price) {
        console.log("Price not a number");
        return null;
    }

    return price.toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    })
}

export const countPrice = (basePrice: number, sizePrice: number, quantity: number = 1): number => {
    const total = ( basePrice + sizePrice ) * quantity;
    return total;
}