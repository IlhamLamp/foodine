import Link from "next/link";
import { FaHistory } from "react-icons/fa";

const ShowHistoryButton: React.FC = () => {
    return (
        <div className="absolute right-5 top-3">
            <Link href={'/dashboard/orders'} className="text-gray-100 flex flex-row gap-2 items-center text-xs border border-gray-100 rounded-full p-2 hover:text-white hover:border-white btn-hover">
                Order History <FaHistory/>
            </Link>
        </div>
    )
}

export default ShowHistoryButton;