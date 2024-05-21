import { RiSortAsc, RiSortDesc } from "react-icons/ri";

interface TrxSortProps {
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>;
}

const TrxSortButton: React.FC<TrxSortProps> = ({ sort, setSort}) => {

    if (sort === "asc") {
        return (
            <RiSortAsc className="w-6 h-6 cursor-pointer" onClick={() => setSort("desc")} />
        )
    } else {
        return (
            <RiSortDesc className="w-6 h-6 cursor-pointer" onClick={() => setSort("asc")} />
        )
    }
}

export default TrxSortButton;