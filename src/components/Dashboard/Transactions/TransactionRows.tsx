interface TransactionRowsProps {
    perPage: number; 
    setPerPage: React.Dispatch<React.SetStateAction<number>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TransactionRows: React.FC<TransactionRowsProps> = ({ perPage, setPerPage, setPage }) => {
    
    const Rows = [
        {id: 1, rows: 5},
        {id: 1, rows: 10},
        {id: 1, rows: 20},
        {id: 1, rows: 50},
        {id: 1, rows: 100},
    ];

    const handleSelectedRows = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const rows = parseInt(ev.target.value, 10);
        setPerPage(rows);
        setPage(1);
    }

    return (
        <div className="relative inline-block text-left">
            <div className="group">
                <button type="button" className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    Rows { perPage }
                    <svg className="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                    </svg>
                </button>
                <div
                    className="absolute left-0 w-40 origin-top-left bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                    <div className="py-2">
                        { Rows.map((s) => (
                            <div key={s.rows}>
                                <label className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100">
                                    { s.rows }
                                    <input type="radio" id={s.rows.toString()} name="status" value={s.rows} checked={perPage === s.rows} onChange={handleSelectedRows} className="hidden" />
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionRows;