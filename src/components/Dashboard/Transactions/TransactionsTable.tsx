import MiniStatusButton from "@/components/Order/Button/MiniStatusButton";
import { OrderContext } from "@/components/OrderContext";
import { formatPrice } from "@/libs/formattedCurrency";
import { TypesOrderHistory } from "@/types/order";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";
import { TbEyeSearch, TbTrashXFilled } from "react-icons/tb";

interface TransactionTableProps {
    id: string;
    orders: TypesOrderHistory;
    page: number;
    prevPage: number;
    perPage: number;
    popup: any;
}

const TransactionsTable: React.FC<TransactionTableProps> = ({ id, orders, page, prevPage, perPage, popup}) => {

    const router = useRouter();
    const { setDelOrderID } = useContext(OrderContext);

    const handleDelete = (id: string) => {
        popup(true); 
        setDelOrderID(id);
    }

    return (
        <table id={id} className="w-full text-sm text-left text-gray-500">
            <thead className="text-sm text-gray-700 uppercase text-center bg-gray-50">
                <tr>
                    <th className="py-3 px-3">#</th>
                    <th className="py-3 px-3">Name</th>
                    <th className="py-3 px-3">Email</th>
                    <th className="py-3 px-3">Price</th>
                    <th className="py-3 px-3">Qty</th>
                    <th className="py-3 px-3">Payment</th>
                    <th className="py-3 px-3">Status</th>
                    <th className="py-3 px-3">OrderID</th>
                    <th className="py-3 px-3">Date</th>
                    <th className="py-3 px-3 text-center">Actions</th>
                </tr>
            </thead>
            <tbody className="text-xs text-center">
                { orders.map((order, index) => (
                    <tr key={order._id} className="bg-white border-b">
                    <td className="py-3 px-3">{page === 1 ? index + 1 : (prevPage * perPage) + (index + 1)}</td>
                    <td className="py-3 px-3">{order.name}</td>
                    <td className="py-3 px-3">{order.email}</td>
                    <td className="py-3 px-3">{formatPrice(order.totalTransactionPrice)}</td>
                    <td className="py-3 px-3">{order.totalItemsQty}</td>
                    <td className="py-3 px-3">{order.paymentMethod}</td>
                    <td className="py-3 px-3"><MiniStatusButton status={order.status} /></td>
                    <td className="py-3 px-3 cursor-pointer">
                        <CopyToClipboard text={order.transactionId} onCopy={() => toast.success(`${order.transactionId} Copied!`)}>
                            <span>{order.transactionId}</span>
                        </CopyToClipboard>
                    </td>
                    <td className="py-3 px-3">{moment(order.updatedAt).format('LLL')}</td>
                    <td className="py-3 px-3 flex mx-auto justify-center items-center gap-2">
                        <TbEyeSearch className="w-5 h-5 text-slate-800 cursor-pointer" onClick={() => router.push(`/dashboard/transactions/${order.transactionId}`)} />
                        <TbTrashXFilled className="w-5 h-5 text-red-500 cursor-pointer" onClick={() => handleDelete(order.transactionId)}/>
                    </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TransactionsTable;