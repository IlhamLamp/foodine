import Kop from "./Button/Kop";
import { FaLocationDot } from "react-icons/fa6";
import Link from "next/link";
import { UserInformation } from "@/types/user-information";

const CheckoutProfileAddress: React.FC<{ userData: UserInformation, userAddress: string}> = ({ userData, userAddress}) => {
 
    return (
        <div className="w-full mt-10 bg-white">
            <Kop />
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <div className="flex flex-row gap-2">
                        <FaLocationDot className="w-6 h-6 text-primary" />
                        <span className="text-lg font-medium text-primary">Alamat Pengiriman</span>
                    </div>
                    <Link href={'/dashboard/profile'} className="btn-hover bg-primary hover:bg-secondary text-white rounded-full py-2 px-4 text-sm">
                        Edit
                    </Link>
                </div>
                <div className="w-full my-2 mx-4 grid grid-rows-3">
                    <div className="flex flex-row items-center gap-2">
                        <span className="font-semibold uppercase">{userData?.name || ''}</span>
                        <span className="">{userData?.email || ''}</span>
                    </div>
                    <div>
                        <span className="font-semibold">{userData?.phone || ''}</span>
                    </div>
                    <div>
                        <span>{userAddress || ''}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutProfileAddress;