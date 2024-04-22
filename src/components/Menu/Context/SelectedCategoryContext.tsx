import { createContext } from "react"

interface SelectedCategoryType {
    selectedCategory: any;
    setSelectedCategory?: (v: string) => void;
}

const SelectedCategoryContext = createContext<SelectedCategoryType>({
    selectedCategory: "All",
    setSelectedCategory: () => {},
});
export default SelectedCategoryContext;