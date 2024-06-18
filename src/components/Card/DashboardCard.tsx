import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import { formatPrice } from "@/libs/formattedCurrency";

interface DashboardCardProps {
    id: number;
    card: string;
    data: any;
    link: string;
    logo: any;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ id, card, data, link, logo }) => {

    const pointView = typeof data === 'number' ? formatPrice(data) : data.length;

    return (
        <Link href={link} className="bg-primary btn-hover hover:bg-secondary hover:shadow-lg rounded-lg shadow-md cursor-pointer w-[200px]">
            <div className="m-2">
                <div className="flex justify-end"><IoMdSettings className="text-canvas" /></div>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-white text-2xl">{card}</span>
                        <span className="text-white text-md">{pointView}</span>
                    </div>
                    <div>{logo}</div>
                </div>
            </div>
        </Link>
    )
}

export default DashboardCard