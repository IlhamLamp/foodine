import React, { useContext } from "react";
import SelectedDeliveryStatusContext from "../Context/SelectedDeliveryStatus";
import { IoCaretForward } from "react-icons/io5";

const OrderStatusSide: React.FC = () => {
    
    const { selectedDeliveryStatus, setSelectedDeliveryStatus } = useContext(SelectedDeliveryStatusContext);

    const PublicTransactionStatus = [
        { id: 1, status: 'settlement'},
        { id: 2, status: 'pending'},
        { id: 3, status: 'failed'},  
        { id: 4, status: 'error'},
        { id: 5, status: 'unpaid'},
    ];

    const handleSelectedStatus = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const status = ev.target.value;
        setSelectedDeliveryStatus(status ?? 'All');
    }

    return (
        <div className="flex flex-col bg-white text-slate-700 rounded-xl p-6 w-[300px] shadow-xl h-fit">
            <h1 className="mx-auto my-2 font-semibold">Delivery Status</h1>
            <div key="All" className={`p-2 text-sm rounded-lg ${selectedDeliveryStatus === "All" ? 'bg-gray-200' : ''}`}>
                <label htmlFor="All" className="cursor-pointer w-full flex flex-row items-center mx-auto">
                    {selectedDeliveryStatus === "All" ? <span><IoCaretForward /></span> : ''}
                        All
                    <input type="radio" id="All" name="status" value={"All"} checked={selectedDeliveryStatus === 'All'} onChange={handleSelectedStatus} className="cursor-pointer bg-canvas hidden"/>
                </label>
            </div>
            { PublicTransactionStatus.map((s) => (
                <div key={s.status} className={`p-2 text-sm rounded-lg ${selectedDeliveryStatus === s.status ? 'bg-gray-200' : ''}`}>
                    <label htmlFor={s.status} className="cursor-pointer w-full flex flex-row items-center mx-auto">
                        {selectedDeliveryStatus === s.status ? <span><IoCaretForward /></span> : ''}
                        {s.status}
                        <input type="radio" id={s.status} name="status" value={s.status} checked={selectedDeliveryStatus === s.status} onChange={handleSelectedStatus} className="cursor-pointer bg-canvas hidden"/>
                    </label>
                </div>
            ))}
        </div>
    )
}

export default OrderStatusSide;
