import dynamic from "next/dynamic";
import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa6";
import { MdMoreTime } from "react-icons/md";

const PendingStepper = dynamic(() => import('../OrderStepper'), {
    ssr: false,
})

const OrderStatusPending: React.FC<{ transactionID: string }> = ({ transactionID }) => {

    const [clipboard, setClipboard] = useState<boolean>(false);

    return (
        <div className="w-full h-1/2 bg-pending rounded-xl">
            <div className="flex flex-col items-center p-8">
                <div className="flex flex-row gap-2 text-xs text-gray-100 cursor-default">
                    <span>Your order: { transactionID }</span> 
                    <span>
                        <CopyToClipboard text={transactionID} onCopy={() => setClipboard(true)}>
                            <FaRegCopy className="cursor-pointer" />
                        </CopyToClipboard>
                    </span>
                    { clipboard && (<span>Copied!</span>) }
                </div>
                <MdMoreTime className="text-white w-20 h-20 mt-8" />
                <div className="w-3/4 text-center mt-8">
                    <p className="text-sm text-white font-light tracking-wide drop-shadow-lg py-2">Please Wait</p>
                    <h1 className="text-2xl text-white font-medium tracking-wide drop-shadow-lg uppercase">Your Order Is Confirmed</h1>
                    <p className="text-md text-white font-light drop-shadow-lg">
                        Your order is confirmed, Please complete the transaction process or wait a moment. 
                    </p>
                </div>
            </div>
            <div className="w-3/4 flex mx-auto">
                <PendingStepper status={'pending'} />
            </div>
        </div>
    )
}

export default OrderStatusPending;