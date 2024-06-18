import { formatPrice } from "@/libs/formattedCurrency";
import { TypesTransaction } from "@/types/transaction";
import { BsCreditCardFill } from "react-icons/bs";
import { GoQuestion } from "react-icons/go";
import { Tooltip } from "react-tooltip";
import MiniStatusButton from "../../Button/MiniStatusButton";

const TransactionPriceSummary: React.FC<{ 
    transaction: TypesTransaction;
    pay: () => void;
}> = ({ transaction, pay }) => {
    
    const CheckStatus = transaction?.status === 'pending';

    return (
        <div className="w-full bg-white">
            <div className="px-6 py-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <BsCreditCardFill className="w-6 h-6 text-primary" />
                        <span className="text-lg font-medium text-primary">Metode Pembayaran</span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <span className="font-semibold">{transaction?.paymentMethod}</span>
                        <MiniStatusButton status={transaction?.status} />
                    </div>
                </div>
                <div className="w-full my-2">
                    <div className="w-full flex flex-col gap-2 text-right">
                        <div className="flex justify-end">
                            <div className="flex-col">
                                <div className="flex flex-row justify-between py-2 gap-14 text-gray-500 text-sm">
                                    <span>Subtotal Untuk Produk :</span>
                                    <span>{formatPrice(transaction?.totalItemsPrice) || 0}</span>
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
                                    <span>{formatPrice(transaction?.shippingCosts) || 0}</span>
                                </div>
                                <div className="flex flex-row justify-between py-2 gap-14 text-gray-500 text-sm">
                                    <span>Biaya Layanan :</span>
                                    <span>{formatPrice(transaction?.serviceFee) || 0}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="flex flex-row justify-between gap-8">
                                <span className="text-sm text-gray-500">Total Pembayaran :</span>
                                <span className="text-2xl text-primary font-semibold">{formatPrice(transaction?.totalTransactionPrice) || 0}</span>
                            </div>
                        </div>
                    </div>
                    <hr className="mt-4" />
                    { CheckStatus && (
                        <div className="my-8 flex justify-end">
                            <button className="w-[200px] bg-primary hover:bg-secondary text-white btn-hover" onClick={pay}>
                                Bayar Pesanan
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default TransactionPriceSummary;