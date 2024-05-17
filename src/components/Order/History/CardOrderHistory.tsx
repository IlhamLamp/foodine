import { TypesTransaction } from "@/types/transaction";
import Link from "next/link";
import MiniStatusButton from "../Button/MiniStatusButton";
import moment from "moment";
import { formatPrice } from "@/libs/formattedCurrency";

const CardOrderHistory: React.FC<{ transaction: TypesTransaction }> = ({ transaction }) => {
    return (
        <Link href={`/dashboard/orders/${transaction.transactionId}`} className="flex flex-row items-center gap-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
            <img className="object-cover w-1/3 rounded-t-lg h-36" src={transaction.items[0]?.product.image} alt={transaction.transactionId} />
            <div className="w-full">
                <div className="flex justify-between items-center text-center">
                    <h1 className="text-lg font-bold tracking-tight text-gray-900">{transaction.items[0]?.product.name}<span>{transaction.items.length > 1 ? ` and ${transaction.totalItemsQty - 1} more...` : ''}</span></h1>
                    <MiniStatusButton status={transaction.status}/>
                </div>
                <div className="relative">
                    <div className="flex flex-col justify-between text-gray-500 text-sm">
                        <p className="">{transaction.transactionId}</p>
                        <p className="font-normal">Qty: {transaction.totalItemsQty}</p>
                        <span className="">Payment: {transaction.paymentMethod}</span>
                        <span className="">{moment(transaction.createdAt).format('LLL')}</span>
                    </div>
                    <div className="absolute bottom-0 right-2">
                        <span className="text-xl font-semibold">{formatPrice(transaction.totalTransactionPrice)}</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CardOrderHistory;