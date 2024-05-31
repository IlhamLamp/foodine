import { FaLocationDot, FaRegCopy } from "react-icons/fa6";
import Kop from "@/components/Checkout/Button/Kop";
import { TypesTransaction } from "@/types/transaction";
import moment from "moment";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";

const TransactionProfileAddress: React.FC<{ transaction: TypesTransaction }> = ({ transaction }) => {
 
    return (
        <div className="w-full bg-white">
            <Kop />
            <div className="px-6 py-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <FaLocationDot className="w-6 h-6 text-primary" />
                        <span className="text-lg font-medium text-primary">Alamat Pengiriman</span>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="flex flex-row gap-2">
                            <span className="cursor-default text-gray-800">{transaction.transactionId}</span>
                            <CopyToClipboard text={transaction.transactionId} onCopy={() => toast.success(`${transaction.transactionId} Copied!`)}>
                                <FaRegCopy className="cursor-pointer" />
                            </CopyToClipboard>
                        </div>
                        <span className="text-sm text-gray-400">{moment(transaction.updatedAt).format('LLL')}</span>
                    </div>
                </div>
                <div className="w-full my-2 mx-4 grid grid-rows-3">
                    <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold uppercase">{transaction.name}</span>
                        <span className="">{transaction.email}</span>
                    </div>
                    <div>
                        <span className="font-semibold">{transaction?.phone}</span>
                    </div>
                    <div>
                        <span>{transaction.shippingAddress}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionProfileAddress;