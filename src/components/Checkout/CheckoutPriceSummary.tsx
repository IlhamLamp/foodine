import Link from "next/link";
import React, { useContext } from "react";
import { BsCreditCardFill } from "react-icons/bs";
import { formatPrice } from "@/libs/formattedCurrency";
import { TransactionContext } from "../TransactionContext";
import { GoQuestion } from "react-icons/go";
import { Tooltip } from "react-tooltip";

const CheckoutPriceSummary: React.FC = () => {

    const { transaction, addOrderTransaction } = useContext(TransactionContext);

    const showPrice = (price: number): string => {
        const result = formatPrice(price);
        return result;
    }

    const handleTransaction = () => {
        addOrderTransaction();
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
                        <span className="font-semibold">{transaction?.paymentMethod}</span>
                        <Link href={'/cart'} className="btn-hover bg-primary hover:bg-secondary text-white rounded-full py-2 px-4 text-sm">
                            Edit
                        </Link>
                    </div>
                </div>
                <div className="w-full my-2">
                    <div className="w-full flex flex-col gap-2 text-right">
                        <div className="flex justify-end">
                            <div className="flex-col">
                                <div className="flex flex-row justify-between py-2 gap-14 text-gray-500 text-sm">
                                    <span>Subtotal Untuk Produk :</span>
                                    <span>{showPrice(transaction?.totalItemsPrice) || 0}</span>
                                </div>
                                <div className="flex flex-row justify-between py-2 gap-14 text-gray-500 text-sm">
                                    <Tooltip place="top" id="tooltip-goquestion" />
                                    <span className="inline-flex gap-1 items-center">
                                        Total Ongkos Kirim
                                        <GoQuestion 
                                            data-tooltip-id="tooltip-goquestion" 
                                            data-tooltip-html="< 5 Km = Rp 5.000</br>5 - 10 Km = Rp 10.000</br>11 - 20 Km = Rp 15.000</br>21 - 30 Km = Rp 20.000</br>>30 Km = Km * Rp 2.000" 
                                            className="w-4 h-4 btn-hover text-primary hover:text-secondary cursor-pointer" />
                                        :
                                    </span>
                                    <span>{showPrice(transaction?.shippingCosts) || 0}</span>
                                </div>
                                <div className="flex flex-row justify-between py-2 gap-14 text-gray-500 text-sm">
                                    <span>Biaya Layanan :</span>
                                    <span>{showPrice(transaction?.serviceFee) || 0}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex flex-row justify-between gap-8">
                                <span className="text-sm text-gray-500">Total Pembayaran :</span>
                                <span className="text-2xl text-primary font-semibold">{showPrice(transaction?.totalTransactionPrice) || 0}</span>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    <div className="my-8 flex justify-end">
                        <button className="w-[200px] bg-primary hover:bg-secondary text-white btn-hover" onClick={handleTransaction}>
                            {transaction?.paymentMethod === "COD" ? 'Buat' : 'Bayar'} Pesanan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPriceSummary;