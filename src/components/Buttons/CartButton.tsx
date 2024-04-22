import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

const ShoppingCart: React.FC = () => {
    return (
        <Link href={'/'} className={`
            z-10 items-center justify-center right-6 bottom-8 !flex bg-secondary 
            text-canvas font-bold p-4 rounded-full btn-hover hover:bg-primary fixed
        `}>
            <IoCartOutline className="w-8 h-8" />
        </Link>
    )
}

export default ShoppingCart;