import Link from "next/link";
import { Backward, Blocked, Forward } from "../icons/Arrow";

interface PaginationProps {
    page: number;
    totalPages: number;
    prevPage: number;
    nextPage: number;
    pageNumbers: number[];
}

const Pagination: React.FC<PaginationProps> = ({
    page, totalPages, prevPage, nextPage, pageNumbers
}) => {
    return (
        <div className="flex justify-center items-center mx-auto mt-5">
            <div className="flex border-[1px] gap-4 rounded-[10px] border-primary h-14 items-center">
                { page === 1 ? (
                    <div className="opacity-60 cursor-not-allowed flex items-center bg-primary size-full p-3 rounded-l-lg" aria-disabled="true">
                        <span className="text-white"><Blocked /></span>
                    </div>
                ) : (
                    <Link className="flex items-center bg-primary text-canvas font-semibold hover:opacity-50 size-full p-3 rounded-l-lg" href={`?page=${prevPage}`} aria-label="Previous page">
                        <Backward />
                    </Link>
                )}

                {pageNumbers.map((pageNumber, index) => (
                    <Link
                        key={index}
                        className={ page === pageNumber
                            ? "bg-primary font-bold px-2 rounded-md text-white"
                            : "hover:bg-primary px-1 rounded-md hover:text-white"
                        }
                        href={`?page=${pageNumber}`}
                    >
                        {pageNumber}
                    </Link>
                ))}

                { page === totalPages ? (
                    <div className="opacity-60 cursor-not-allowed flex items-center bg-primary size-full p-3 rounded-r-lg" aria-disabled="true">
                        <span className="text-white"><Blocked /></span>
                    </div>
                ) : (
                    <Link className="flex items-center bg-primary text-canvas font-semibold hover:opacity-50 size-full p-3 rounded-r-lg" href={`?page=${nextPage}`} aria-label="Next page">
                        <Forward />
                    </Link>
                )}
            </div>
        </div>
    ) 
}

export default Pagination;