import { TypesTransaction } from "@/types/transaction";
import { FaShippingFast } from "react-icons/fa";
import MiniStatusButton from "../Button/MiniStatusButton";
import OrderStepper from "../OrderStepper";

const CardDeliveryStatus: React.FC<{ transaction: TypesTransaction}> = ({ transaction }) => {
    return (
        <div className="w-full bg-white">
            <div className="px-6 py-4">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row gap-2">
                        <FaShippingFast className="w-6 h-6 text-primary" />
                        <span className="text-lg font-medium text-primary">Status Pesanan</span>
                    </div>
                    <div>
                        <MiniStatusButton status={transaction?.deliveryStatus} />
                    </div>
                </div>
            </div>
            <div className="">
                <OrderStepper status={transaction?.status} />
            </div>
        </div>
    )
}

export default CardDeliveryStatus;