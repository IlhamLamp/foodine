import { formatPrice } from "@/libs/formattedCurrency";
import { TypesTransactionDB } from "@/types/transaction"
import Link from "next/link";

const DashboardLatestOrder: React.FC<{ transactions: TypesTransactionDB[] }> = ({ transactions }) => {

    const data = transactions.slice(-3)
    const latestOrder = data.reverse();

    return (
        <div className="max-w-[600px] items-center bg-gray-50 mt-4 rounded-lg p-4">
            <h1 className="text-center font-semibold">Latest Order</h1>
            <div className="w-full">
                { latestOrder.length > 0 && latestOrder.map((o) => (
                    <Link key={o._id} href={`/dashboard/transactions?search=${o.name}`} className="flex flex-row w-[300px] shadow-sm items-center gap-4 p-2 cursor-pointer btn-hover hover:bg-white rounded-lg">
                        <div className="flex w-8 h-8 items-center justify-center overflow-hidden rounded-full border-2 border-gray-50">
                            <img className="w-auto h-full scale-125" src={`/images/profile.png`} alt="Profile" />
                        </div>
                        <div className="w-full flex flex-col">
                            <span className="text-sm">{o.name}</span>
                            <div className="flex flex-row justify-between">
                                <span className="text-sm italic text-gray-300">{o.paymentMethod}</span>
                                <span className="text-sm">{formatPrice(o.totalTransactionPrice)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
                { latestOrder.length === 0 && (
                    <div>No orders yet.</div>
                )}
            </div>
        </div>
    )
}

export default DashboardLatestOrder