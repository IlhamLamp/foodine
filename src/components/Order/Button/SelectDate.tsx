import { useState } from "react";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import { FaCalendarAlt } from "react-icons/fa";

const SelectDate: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (date: any) => {
      setSelectedDate(date);
    };

    const inputProps = {
        placeholder: 'Select Date',
        disabled: false,
        // onMouseLeave: () => alert('You went to the input but it was disabled')
    }
  
    return (
      <div className="datepicker">
        <div className="relative">
            <Datetime
                value={selectedDate}
                onChange={handleChange}
                dateFormat="YYYY-MM-DD"
                timeFormat={false}
                closeOnSelect={true}
                inputProps={inputProps}
                className="fixed"
            />
            <FaCalendarAlt className="absolute top-2 right-4 w-6 h-6 text-slate-500" />
        </div>
      </div>
    );
}

export default SelectDate;