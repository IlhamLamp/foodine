import { Backward, Blocked, Forward } from "@/components/icons/Arrow";
import Link from "next/link";

interface PaginationProps {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
    prevPage: number;
    nextPage: number;
    pageNumbers: number[];
}

const TransactionPagination: React.FC<PaginationProps> = ({
    page, setPage, totalPages, prevPage, nextPage, pageNumbers
}) => {

    const handlePrev = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setPage(prevPage);
    }
    const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        setPage(nextPage);
    }

    return (
        <div className="flex justify-center items-center mx-auto mt-5">
            <div className="flex border-[1px] gap-4 rounded-[10px] border-primary h-14 items-center">
                { page === 1 ? (
                    <div className="cursor-not-allowed flex items-center bg-secondary size-full p-3 rounded-l-lg" aria-disabled="true">
                        <span className="text-white"><Blocked /></span>
                    </div>
                ) : (
                    <Link className="flex items-center bg-primary text-canvas font-semibold hover:opacity-50 size-full p-3 rounded-l-lg" href={`?page=${prevPage}`} onClick={handlePrev} aria-label="Previous page">
                        <Backward />
                    </Link>
                )}

                {pageNumbers.map((pageNumber) => (
                    <Link
                        key={pageNumber}
                        className={ page === pageNumber
                            ? "bg-primary font-bold px-2 rounded-md text-white"
                            : "hover:bg-primary px-1 rounded-md hover:text-white"
                        }
                        href={`?page=${pageNumber}`}
                        onClick={() => setPage(pageNumber)}
                    >
                        {pageNumber}
                    </Link>
                ))}

                { page === totalPages ? (
                    <div className="cursor-not-allowed flex items-center bg-secondary size-full p-3 rounded-r-lg" aria-disabled="true">
                        <span className="text-white"><Blocked /></span>
                    </div>
                ) : (
                    <Link className="flex items-center bg-primary text-canvas font-semibold hover:opacity-50 size-full p-3 rounded-r-lg" href={`?page=${nextPage}`} onClick={handleNext} aria-label="Next page">
                        <Forward />
                    </Link>
                )}
            </div>
        </div>
    )
}

export default TransactionPagination;