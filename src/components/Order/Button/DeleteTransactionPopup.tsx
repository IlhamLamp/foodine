import Close from "@/components/icons/Close";
import { FaRegSadCry } from "react-icons/fa";

interface DelTrxPopupProps {
    btnClose: () => void;
    btnDelete: () => void;
}

const DeleteTransactionPopup: React.FC<DelTrxPopupProps> = ({ btnClose, btnDelete }) => {

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-xl justify-center max-h-fit relative" onClick={ev => ev.stopPropagation()}>
                <span className="absolute -top-4 -right-2 p-2 cursor-pointer bg-red-400 btn-hover hover:bg-red-200 rounded-full text-white" role="button" onClick={btnClose}>
                    <Close />
                </span>
                <div className="flex flex-col items-center m-2 gap-2">
                    <span>Are you sure want to delete?</span>
                    <FaRegSadCry className="w-10 h-10 text-primary" />
                    <div className="flex flex-row items-center justify-between gap-4">
                        <button onClick={btnDelete} className="bg-primary text-white btn-hover hover:bg-secondary">Yes</button>
                        <button onClick={btnClose}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteTransactionPopup;