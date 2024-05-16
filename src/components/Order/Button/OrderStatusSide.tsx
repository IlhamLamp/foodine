import { useContext } from "react";
import SelectedDeliveryStatusContext from "../Context/SelectedDeliveryStatus";
import { IoCaretForward } from "react-icons/io5";

const OrderStatusSide: React.FC = () => {

    const { selectedDeliveryStatus, setSelectedDeliveryStatus } = useContext(SelectedDeliveryStatusContext);

    return (
        <div className="flex flex-col bg-white text-slate-700 rounded-xl p-6 w-[300px] shadow-xl h-fit">
            <h1 className="mx-auto my-2 font-semibold">Delivery Status</h1>
            <div key="All" className={`p-2 text-sm rounded-lg ${selectedDeliveryStatus === "All" ? 'bg-gray-200' : ''}`}>
                <label htmlFor="All" className="cursor-pointer w-full flex flex-row items-center mx-auto">
                    {selectedDeliveryStatus === "All" ? <span><IoCaretForward /></span> : ''}
                    All
                    <input type="radio" id="All" name="categories" value={"All"} className="cursor-pointer bg-canvas hidden"/>
                </label>
            </div>
        </div>
    )
}

export default OrderStatusSide;
