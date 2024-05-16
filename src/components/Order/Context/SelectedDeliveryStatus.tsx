import { createContext } from "react"

interface SelectedDeliveryStatusType {
    selectedDeliveryStatus: string;
    setSelectedDeliveryStatus?: (v: string) => void;
}

const SelectedDeliveryStatusContext = createContext<SelectedDeliveryStatusType>({
    selectedDeliveryStatus: "All",
    setSelectedDeliveryStatus: () => {},
});
export default SelectedDeliveryStatusContext;