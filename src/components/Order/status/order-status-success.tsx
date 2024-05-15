import { FaCheckCircle } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useState } from "react";
import { FaRegCopy } from "react-icons/fa6";
import CopyToClipboard from "react-copy-to-clipboard";
import ShowHistoryButton from "../Button/ShowHistoryButton";

const CustomStepper = dynamic(() => import('../OrderStepper'), {
    ssr: false,
})

const OrderStatusSuccess: React.FC<{ transactionID: string }> = ({ transactionID }) => {

    const [clipboard, setClipboard] = useState<boolean>(false);

    return (
        <div className="w-full bg-success rounded-xl relative">
            <div className="flex flex-col items-center p-8">
                <ShowHistoryButton />
                <div className="flex flex-row gap-2 text-xs text-gray-100 cursor-default">
                    <span>Order ID: { transactionID }</span> 
                    <span>
                        <CopyToClipboard text={transactionID} onCopy={() => setClipboard(true)}>
                            <FaRegCopy className="cursor-pointer" />
                        </CopyToClipboard>
                    </span>
                    { clipboard && (<span>Copied!</span>) }
                </div>
                <FaCheckCircle className="text-white w-20 h-20 mt-8" />
                <div className="w-3/4 text-center mt-8">
                    <p className="text-sm text-white font-light tracking-wide drop-shadow-lg py-2">Thank You</p>
                    <h1 className="text-2xl text-white font-medium tracking-wide drop-shadow-lg uppercase">Your Payment Is Confirmed</h1>
                    <p className="text-md text-white font-light drop-shadow-lg">
                        Your payment is confirmed and will be shipped shortly. We'll keep you updated with tracking
                        information.
                    </p>
                </div>
            </div>
            <div className="w-3/4 flex mx-auto">
                <CustomStepper status={'settlement'} />
            </div>
        </div>
    )
}

export default OrderStatusSuccess;