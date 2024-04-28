import Close from "@/components/icons/Close";

const DeleteCartPopup: React.FC<{ closePopup: any, handleDelete: any }> = ({ closePopup, handleDelete }) => {
    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-xl justify-center max-h-fit relative" onClick={ev => ev.stopPropagation()}>
                <span className="absolute -top-4 -right-2 p-2 cursor-pointer bg-red-400 btn-hover hover:bg-red-200 rounded-full text-white" role="button" onClick={closePopup}>
                    <Close />
                </span>
                <div className="flex flex-col m-2">
                    <div>Are you sure want to delete?</div>
                    <div className="flex my-2 gap-2 justify-between">
                        <button onClick={handleDelete} className="btn-hover bg-primary hover:bg-secondary text-white">Yes</button>
                        <button onClick={closePopup}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteCartPopup;