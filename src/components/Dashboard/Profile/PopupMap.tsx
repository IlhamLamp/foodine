import Close from "@/components/icons/Close"

export default function PopupMap ({ handlePopup, handleSaveLocation, latitude, longitude }) {

    // Combine latitude and longitude with proper map view parameters
    const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`;

    return(
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg w-[850px] h-[400px]" onClick={ev => ev.stopPropagation()}>
                <span className="absolute cursor-pointer text-white bg-red-500 rounded-full" onClick={handlePopup} role="button">
                    <Close />
                </span>
                <div className="w-full h-[90%]">
                    <iframe src={mapUrl} allowFullScreen aria-label="Map Showing Location" className="w-full h-full"/>
                </div>
                <button
                    onClick={handleSaveLocation}
                    className="m-1 bg-primary text-white hover:bg-secondary hover:text-gray-300"
                >
                    Save Location
                </button>
            </div>
        </div>
    )
}