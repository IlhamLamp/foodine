import { useContext, useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import SelectedDeliveryDateContext from '../Context/SelectedDeliveryDate';
import moment from 'moment';
import { MdClear } from 'react-icons/md';
import { IoCalendarNumberSharp } from 'react-icons/io5';

const SelectDate: React.FC = () => {
    const { selectedDeliveryDate, setSelectedDeliveryDate } = useContext(SelectedDeliveryDateContext);
    const [clear, setClear] = useState<boolean>(false);

    const handleChange = (date: moment.Moment | string) => {
      if (date === "" || date === null) {
        handleClear();
      } else {
        setSelectedDeliveryDate(moment(date));
        setClear(true);
      }
    };

    const handleClear = () => {
      setSelectedDeliveryDate(null);
      setClear(false);
    }

    const inputProps = {
      placeholder: 'Select Date',
      disabled: false,
      value: selectedDeliveryDate ? moment(selectedDeliveryDate).format('YYYY-MM-DD') : '',
    }
  
    return (
      <div className="datepicker">
        <div className="relative flex flex-1">
            <Datetime
              value={selectedDeliveryDate ? moment(selectedDeliveryDate).format('YYYY-MM-DD') : ''}
              onChange={handleChange}
              dateFormat="YYYY-MM-DD"
              timeFormat={false}
              closeOnSelect={true}
              inputProps={inputProps}
              className="w-full"
            />
            { clear ? (
              <MdClear className="absolute top-2 right-4 w-6 h-6 text-slate-500 cursor-pointer" onClick={handleClear} /> 
            ) : (
              <IoCalendarNumberSharp className="absolute top-2 right-4 w-6 h-6 text-slate-500" />
            )}
        </div>
      </div>
    );
}

export default SelectDate;