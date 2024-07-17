import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';

interface sdr { startDate: Date; endDate: Date; key?: any; }
interface SelectedDateRange {
    selectedDate: sdr;
    setSelectedDate: React.Dispatch<React.SetStateAction<sdr>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

const TrxSelectDate: React.FC<SelectedDateRange> = ({ selectedDate, setSelectedDate, setPage }) => {

    const selectionRange = {
        startDate: selectedDate.startDate,
        endDate: selectedDate.endDate,
        key: 'selection',
    };

    return (
        <div className="relative inline-block text-left">
            <div className='group'>
                <button type="button" className="inline-flex justify-center items-center w-full px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
                    Select Date
                    <svg className="w-4 h-4 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 12l-5-5h10l-5 5z" />
                    </svg>
                </button>
                <div className="absolute right-0 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300">
                    <div className='py-2'>
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={(ranges) => {
                                const { selection } = ranges;
                                setSelectedDate({ 
                                    startDate: new Date(selection.startDate.getTime() - selection.startDate.getTimezoneOffset() * 60 * 1000),
                                    endDate: new Date(selection.endDate.getTime() - selection.endDate.getTimezoneOffset() * 60 * 1000)
                                })
                                setPage(1);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrxSelectDate;