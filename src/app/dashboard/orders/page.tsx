"use client";
import OrderSearchBar from "@/components/Order/Button/OrderSearchBar";
import OrderStatusSide from "@/components/Order/Button/OrderStatusSide";
import SelectDate from "@/components/Order/Button/SelectDate";
import SelectedDeliveryDateContext from "@/components/Order/Context/SelectedDeliveryDate";
import SelectedDeliveryStatusContext from "@/components/Order/Context/SelectedDeliveryStatus";
import CardOrderHistory from "@/components/Order/History/CardOrderHistory";
import NotFoundOrder from "@/components/Order/History/NotFoundOrder";
import { OrderContext } from "@/components/OrderContext";
import moment from "moment";
import { useContext, useMemo, useState } from "react";

const OrdersPage: React.FC<{ 
    searchParams?: { search?: string;} 
}> = ({searchParams }) => {

    const { order } = useContext(OrderContext);
    const [selectedDeliveryStatus, setSelectedDeliveryStatus] = useState<string>("All");
    const [selectedDeliveryDate, setSelectedDeliveryDate] = useState<moment.Moment | string | null>(null);

    // Use search term from URL search params
    const search = searchParams?.search?.toLowerCase();

    const filteredOrders = useMemo(() => {
        return order.filter((transaction) => {
            const matchesStatus = selectedDeliveryStatus === "All" || transaction.status === selectedDeliveryStatus;
            const matchesSearch = !search || transaction.transactionId.toLowerCase().includes(search) || transaction.items.some(item => item.product.name.toLowerCase().includes(search));
            const matchesDate = !selectedDeliveryDate || moment(transaction.createdAt).isSame(selectedDeliveryDate, 'day');
            return matchesStatus && matchesSearch && matchesDate;
        });
    }, [order, search, selectedDeliveryStatus, selectedDeliveryDate])
    
    const sdsMemo = useMemo(() => ({ selectedDeliveryStatus, setSelectedDeliveryStatus }), [ 
        selectedDeliveryStatus, setSelectedDeliveryStatus 
    ]);

    const sddMemo = useMemo(() => ({ selectedDeliveryDate, setSelectedDeliveryDate }), [ 
        selectedDeliveryDate, setSelectedDeliveryDate 
    ]);

    return (
        <SelectedDeliveryDateContext.Provider value={sddMemo}>
            <SelectedDeliveryStatusContext.Provider value={sdsMemo}>
            <div id="order" className="mt-6 p-1 px-2 bg-gray-50 rounded-lg shadow-xl">
                    <div className="flex items-center justify-between pb-">
                        <OrderSearchBar />
                        <SelectDate />
                    </div>
                    <div className="my-2 flex flex-row gap-2 justify-between">
                        <div className="w-1/3">
                            <OrderStatusSide />
                        </div>
                        <div className="w-2/3 h-[60vh] rounded-lg overflow-y-auto shadow-inner">
                            { filteredOrders?.length === 0 ? (
                                <NotFoundOrder />
                            ) : (
                                filteredOrders && filteredOrders.map((transaction, index) => (
                                    <div id={transaction.transactionId} key={transaction.transactionId}>
                                        <CardOrderHistory transaction={transaction} />
                                    </div>    
                                )) 
                            )}
                        </div>
                    </div>
                </div>
            </SelectedDeliveryStatusContext.Provider>
        </SelectedDeliveryDateContext.Provider>
    )
}

export default OrdersPage;