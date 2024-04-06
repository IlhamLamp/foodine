import { useState } from "react";

export default function DeleteButton({ label, onDelete }) {

    const [showConfirm, setShowConfirm] = useState(false);

    if (showConfirm) {
        return (
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center">
                <div className="bg-white p-4 rounded-lg text-center mx-auto">
                    <div className="mb-1">Are you sure want to delete?</div>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setShowConfirm(false)} >
                            Cancel
                        </button>
                        <button 
                            type="button"
                            className="bg-primary border-none text-white"
                            onClick={() => {
                                onDelete();
                                setShowConfirm(false);
                            }}
                        >
                            Yes,&nbsp;delete!
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)} className="text-white bg-secondary border-none">
            {label}
        </button>
    )
}