import Link from "next/link";
import { useContext } from "react";
import { BsCreditCardFill } from "react-icons/bs";
import { CartContext } from "../CartContext";
import { formatPrice } from "@/libs/formattedCurrency";

const CheckoutPriceSummary: React.FC = () => {

    const { totalPrice } = useContext(CartContext);

    const showPrice = (price: number): string => {
        const result = formatPrice(price);
        return result;
    }

    return (
        <div className="w-full bg-white">
            <div className="px-6 py-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <BsCreditCardFill className="w-6 h-6 text-primary" />
                        <span className="text-lg font-medium text-primary">Metode Pembayaran</span>
                    </div>
                    <div className="flex flex-row justify-between items-center gap-8">
                        <span className="font-semibold">COD</span>
                        <Link href={'/cart'} className="btn-hover bg-primary hover:bg-secondary text-white rounded-full py-2 px-4 text-sm">
                            Edit
                        </Link>
                    </div>
                </div>
                <div className="w-full my-2">
                    <div className="w-full flex flex-col gap-2 text-right">
                        <div className="flex justify-end">
                            <div className="flex-col">
                                <p className="flex flex-row justify-between py-2 gap-14 text-gray-500 text-sm">
                                    <span>Subtotal Untuk Produk :</span>
                                    <span>{showPrice(totalPrice()) || 0}</span>
                                </p>
                                <p className="flex flex-row justify-between py-2 gap-14 text-gray-500 text-sm">
                                    <span>Total Ongkos Kirim :</span>
                                    <span>{showPrice(totalPrice()) || 0}</span>
                                </p>
                                <p className="flex flex-row justify-between py-2 gap-14 text-gray-500 text-sm">
                                    <span>Biaya Layanan :</span>
                                    <span>{showPrice(totalPrice()) || 0}</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex flex-row justify-between gap-8">
                                <span className="text-sm text-gray-500">Total Pembayaran :</span>
                                <span className="text-2xl text-primary font-semibold">{showPrice(90000) || 0}</span>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="my-8 flex justify-end">
                        <button className="w-[200px] bg-primary hover:bg-secondary text-white btn-hover">
                            Buat Pesanan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPriceSummary;