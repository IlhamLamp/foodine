"use client";
import { ProfileContext } from "@/components/AppContext";
import OrderSearchBar from "@/components/Order/Button/OrderSearchBar";
import OrderStatusSide from "@/components/Order/Button/OrderStatusSide";
import SelectDate from "@/components/Order/Button/SelectDate";
import SelectedDeliveryStatus from "@/components/Order/Context/SelectedDeliveryStatus";
import { OrderContext } from "@/components/OrderContext";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";

const OrdersPage: React.FC<{ 
    searchParams?: { status?: string; search?: string} 
}> = ({searchParams }) => {

    const { order } = useContext(OrderContext);
    const { userData } = useContext(ProfileContext);
    const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState<string>("All");
    
    const sdsMemo = useMemo(() => ({ selectedDeliveryStatus, setSelectedDeliveryStatus }), [ 
        selectedDeliveryStatus, setSelectedDeliveryStatus 
    ]);

    return (
        <SelectedDeliveryStatus.Provider value={sdsMemo}>
           <div id="order" className="mt-6">
                <div className="flex items-center justify-between pb-">
                    <OrderSearchBar />
                    <SelectDate />
                </div>
                <div className="my-2 flex flex-row gap-2 justify-between">
                    <div className="w-1/3">
                        <OrderStatusSide />
                    </div>
                    <div className="w-2/3 h-[60vh] rounded-lg overflow-y-auto shadow-inner">
                        <div className="">
                            { order && order.map((transaction) => (
                                <div id={transaction.transactionId} key={transaction.transactionId}>
                                    <Link href="#" className="flex flex-row items-center gap-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-100">
                                        <img className="object-cover w-1/3 rounded-t-lg h-32" src={transaction.items[0]?.product.image} alt={transaction.transactionId} />
                                        <div className="flex flex-col justify-between p-2 leading-normal">
                                            <h1 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{transaction.items[0]?.product.name}<span>{transaction.items.length > 1 ? ` and ${transaction.totalItemsQty - 1} more...` : ''}</span></h1>
                                            <p className="mb-3 font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                                        </div>
                                    </Link>
                                </div>    
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SelectedDeliveryStatus.Provider>
    )
}

export default OrdersPage;