import MiniStatusButton from "@/components/Order/Button/MiniStatusButton";
import { formatPrice } from "@/libs/formattedCurrency";
import { TypesOrderHistory } from "@/types/order";
import moment from "moment";

const TransactionsTable: React.FC<{ orders: TypesOrderHistory }> = ({ orders }) => {

    return (
        <table className="w-full text-sm text-left text-gray-500">
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
                    <td className="py-3 px-3">{index}</td>
                    <td className="py-3 px-3">{order.name}</td>
                    <td className="py-3 px-3">{order.email}</td>
                    <td className="py-3 px-3">{formatPrice(order.totalTransactionPrice)}</td>
                    <td className="py-3 px-3">{order.totalItemsQty}</td>
                    <td className="py-3 px-3">{order.paymentMethod}</td>
                    <td className="py-3 px-3"><MiniStatusButton status={order.status} /></td>
                    <td className="py-3 px-3">{order.transactionId}</td>
                    <td className="py-3 px-3">{moment(order.createdAt).format('LLL')}</td>
                    {/* <td className="py-3 px-6">{page === 1 ? index + 1 : (prevPage * perPage) + (index + 1)}</td>
                    <td className="py-3 px-6">{order.name}</td>
                    <td className="py-3 px-6">{order.email}</td>
                    <td className="py-3 px-6">
                        {moment(order.createdAt).format('LL') || ''}
                    </td>
                    <td className="flex mx-auto justify-center w-[100px] gap-1 py-3">
                        <EditButton id={order._id} />
                        <DeleteButton label={<Trash />} onDelete={() => handleDeleteClick(user._id)} />
                    </td> */}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default TransactionsTable;