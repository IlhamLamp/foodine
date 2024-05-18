import moment from "moment";
import { createContext } from "react";

interface SelectedDeliveryDateType {
    selectedDeliveryDate: moment.Moment | string | null;
    setSelectedDeliveryDate?: (v: any) => void;
};

const SelectedDeliveryDateContext = createContext<SelectedDeliveryDateType>({
    selectedDeliveryDate: "",
    setSelectedDeliveryDate: () => {},
});

export default SelectedDeliveryDateContext;