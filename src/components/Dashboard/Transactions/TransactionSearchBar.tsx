"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";

const TransactionSearchBar: React.FC = () => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("search", term);
        } else {
            params.delete("search");
        }
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return (
        <div className="grow">
            <div className="relative flex flex-1">
                <input 
                    type="search"
                    placeholder="cth. name or trx-"
                    onChange={(ev) => handleSearch(ev.target.value)}
                    defaultValue={searchParams.get("search")?.toString() || ""}
                    className="w-full border border-gray-200 bg-gray-200 py-2 pl-10 text-md outline-2 rounded-xl"
                />
                <IoSearch className="absolute left-3 top-2 h-6 w-6 text-gray-500" />
            </div>
        </div>
    )
}

export default TransactionSearchBar;