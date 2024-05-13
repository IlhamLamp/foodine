import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa6";
import { MdCancelScheduleSend } from "react-icons/md";

const OrderStatusFailed: React.FC<{ transactionID: string }> = ({ transactionID }) => {

    const [clipboard, setClipboard] = useState<boolean>(false);

    return (
        <div className="w-full h-1/2 bg-failed rounded-xl">
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
                <MdCancelScheduleSend className="text-white w-20 h-20 mt-8" />
                <div className="w-3/4 text-center mt-8">
                    <p className="text-sm text-white font-light tracking-wide drop-shadow-lg py-2">Order Failed</p>
                    <h1 className="text-2xl text-white font-medium tracking-wide drop-shadow-lg uppercase">Your Order Has Failed</h1>
                    <p className="text-md text-white font-light drop-shadow-lg">
                        Oops, it looks like payment time has expired. Please review the details and try again.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OrderStatusFailed;