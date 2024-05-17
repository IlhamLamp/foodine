"use client";
import { ProfileContext } from "@/components/AppContext";
import MiniStatusButton from "@/components/Order/Button/MiniStatusButton";
import OrderSearchBar from "@/components/Order/Button/OrderSearchBar";
import OrderStatusSide from "@/components/Order/Button/OrderStatusSide";
import SelectDate from "@/components/Order/Button/SelectDate";
import SelectedDeliveryStatus from "@/components/Order/Context/SelectedDeliveryStatus";
import CardOrderHistory from "@/components/Order/History/CardOrderHistory";
import NotFoundOrder from "@/components/Order/History/NotFoundOrder";
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
           <div id="order" className="mt-6 p-1 bg-gray-50 rounded-lg shadow-xl">
                <div className="flex items-center justify-between pb-">
                    <OrderSearchBar />
                    <SelectDate />
                </div>
                <div className="my-2 flex flex-row gap-2 justify-between">
                    <div className="w-1/3">
                        <OrderStatusSide />
                    </div>
                    <div className="w-2/3 h-[60vh] rounded-lg overflow-y-auto shadow-inner">
                        { order.length === 0 
                            ? <NotFoundOrder />
                            : order && order.map((transaction, index) => (
                                <div id={transaction.transactionId} key={transaction.transactionId}>
                                    <CardOrderHistory transaction={transaction} />
                                </div>    
                            )) 
                        }
                    </div>
                </div>
            </div>
        </SelectedDeliveryStatus.Provider>
    )
}

export default OrdersPage;