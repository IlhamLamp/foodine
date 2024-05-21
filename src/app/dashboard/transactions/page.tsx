"use client";
import { ProfileContext } from "@/components/AppContext";
import TrxSortButton from "@/components/Dashboard/Transactions/Button/TrxSortButton";
import TrxSelectDate from "@/components/Dashboard/Transactions/PopUp/TrxSelectDate";
import TransactionPagination from "@/components/Dashboard/Transactions/TransactionPagination";
import TransactionRows from "@/components/Dashboard/Transactions/TransactionRows";
import TransactionSearchBar from "@/components/Dashboard/Transactions/TransactionSearchBar";
import TransactionsTable from "@/components/Dashboard/Transactions/TransactionsTable";
import TransactionStatusDropdown from "@/components/Dashboard/Transactions/TransactionStatusDropdown";
import NotFoundOrder from "@/components/Order/History/NotFoundOrder";
import UseProfile from "@/components/UseProfile";
import { TypesOrderHistory } from "@/types/order";
import { TypesTransactionPagination } from "@/types/transaction";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

interface SelectedDateRange {
    startDate: Date;
    endDate: Date;
}

const TransactionsPage: React.FC<{ searchParams: { search?: string; page?: number; per_page?: number; } }>
= ({ searchParams }) => {

    const { loading, data } = UseProfile();
    const { userData } = useContext(ProfileContext);
    const [allOrder, setAllOrder] = useState<TypesOrderHistory>([]);
    const [sort, setSort] = useState<string>("asc");
    const [selectedDate, setSelectedDate] = useState<SelectedDateRange>({
        startDate: new Date(),
        endDate: new Date(),
    });

    // pagination
    const search = searchParams?.search || '';

    const [page, setPage] = useState<number>(searchParams?.page || 1);
    const [perPage, setPerPage] = useState<number>(searchParams?.per_page || 5);
    const [status, setStatus] = useState<string>("All");
    const [totalOrder, setTotalOrder] = useState<number>(0);

    const totalPages = Math.ceil(totalOrder / perPage);
    const prevPage = page - 1 > 0 ? page - 1 : 1;
    const nextPage = page + 1;

    const isPageOutOfRange = page > totalPages;

    const pageNumbers: number[] = [];
    const offsetNumber = 3;
    for ( let i = page - offsetNumber; i <= page + offsetNumber; i++ ) {
        if (i >= 1 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }

    const getAllOrders = async (pageNumber: number, searchQuery: string) => {
        if (userData && userData.admin) {
            const url = `/api/transaction?page=${pageNumber}&per_page=${perPage}&status=${status}&search=${searchQuery}&sort_by=${sort}`;
            const response = await fetch(url);
            if (!response.ok) {
                return 'Failed get all orders';
            }
            const res: TypesTransactionPagination = await response.json();
            setAllOrder(res.data);
            setPage(res.page);
            setPerPage(res.per_page);
            setTotalOrder(res.total);
        }
    };
    
    useEffect(() => {
        getAllOrders(page, search);
    }, [userData, page, perPage, status, sort, searchParams]);

    if (loading) {
        return 'Loading users info...!'
    }

    if (!data.admin) {
        return redirect('/login');
    }

    return (
        <div id="transactions" className="mt-2">
            <div className="flex items-center justify-between gap-1">
                <div className="flex flex-row items-center gap-2 w-1/2">
                    <TransactionStatusDropdown status={status} setStatus={setStatus} />
                    <TransactionSearchBar />
                </div>
                <div className="flex flex-row items-center gap-2">
                    <TrxSelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                    <TransactionRows perPage={perPage} setPerPage={setPerPage} setPage={setPage}/>
                    <TrxSortButton sort={sort} setSort={setSort} />
                </div>
            </div>
            <div className="mt-2">
                { allOrder.length === 0 ? (
                    <NotFoundOrder />
                ) : (
                    <TransactionsTable orders={allOrder} page={page} prevPage={prevPage} perPage={perPage} />
                )}
            </div>
            {!isPageOutOfRange && (
                <TransactionPagination page={page} setPage={setPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} />
            )}
        </div>
    )
}

export default TransactionsPage;