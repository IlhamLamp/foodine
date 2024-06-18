type TypesSelectedDateRange = {
    startDate: Date;
    endDate: Date;
    key?: any;
}
interface TrxStatusProps {
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setSelectedDate: React.Dispatch<React.SetStateAction<TypesSelectedDateRange>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TransactionStatusDropdown: React.FC<TrxStatusProps> = ({ status, setStatus, setSelectedDate, setPage }) => {

    const PublicTransactionStatus = [
        { id: 1, status: 'All'},
        { id: 2, status: 'settlement'},
        { id: 3, status: 'pending'},
        { id: 4, status: 'failed'},  
        { id: 5, status: 'error'},
        { id: 6, status: 'unpaid'},
    ];

    const handleSelectedStatus = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const status = ev.target.value;
        if (status === 'All') setSelectedDate({
            startDate: new Date(2024, 4, 2),
            endDate: new Date(),
            key: ''
        })
        setStatus(status);
        setPage(1);
    }

    return (
        <div className="relative inline-block text-left">
            <div className="group">
                <button type="button" className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    { status }
                    <svg className="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                    </svg>
                </button>
                <div
                    className="absolute left-0 w-40 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                    <div className="py-2">
                        { PublicTransactionStatus.map((s) => (
                            <div key={s.status}>
                                <label className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                                    { s.status }
                                    <input type="radio" id={s.status} name="status" value={s.status} checked={status === s.status} onChange={handleSelectedStatus} className="hidden" />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionStatusDropdown;