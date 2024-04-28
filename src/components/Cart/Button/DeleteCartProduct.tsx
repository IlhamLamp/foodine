import { Trash } from "@/components/icons/Symbol";

const DeleteCartProduct: React.FC<{ openPopup: any }> = ({ openPopup }) => {
    return (
        <button className="w-20 btn-hover bg-red-400 text-white hover:bg-red-300" onClick={openPopup}>
            <Trash />
        </button>
    )
}

export default DeleteCartProduct;