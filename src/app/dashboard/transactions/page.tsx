"use client";
import { ProfileContext } from "@/components/AppContext";
import TrxSortButton from "@/components/Dashboard/Transactions/Button/TrxSortButton";
import TrxSelectDate from "@/components/Dashboard/Transactions/PopUp/TrxSelectDate";
import TransactionPagination from "@/components/Dashboard/Transactions/TransactionPagination";
import TransactionRows from "@/components/Dashboard/Transactions/TransactionRows";
import TransactionSearchBar from "@/components/Dashboard/Transactions/TransactionSearchBar";
import TransactionsTable from "@/components/Dashboard/Transactions/TransactionsTable";
import TransactionStatusDropdown from "@/components/Dashboard/Transactions/TransactionStatusDropdown";
import DeleteTransactionPopup from "@/components/Order/Button/DeleteTransactionPopup";
import NotFoundOrder from "@/components/Order/History/NotFoundOrder";
import { OrderContext } from "@/components/OrderContext";
import UseProfile from "@/components/UseProfile";
import { generateInvoicePdf } from "@/libs/exportHandler";
import { TypesOrderHistory } from "@/types/order";
import { TypesTransactionPagination } from "@/types/transaction";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdDownload } from "react-icons/io";

interface SelectedDateRange {
    startDate: Date;
    endDate: Date;
    key?: any;
}

const TransactionsPage: React.FC<{ searchParams: { search?: string; page?: number; per_page?: number; } }>
= ({ searchParams }) => {

    const router = useRouter();
    const [showPopup, setShowPopup] = useState<boolean>(false);

    const { loading, data } = UseProfile();
    const { userData } = useContext(ProfileContext);
    const { delOrderID } = useContext(OrderContext);
    const [allOrder, setAllOrder] = useState<TypesOrderHistory>([]);
    const [sort, setSort] = useState<string>("asc");
    const [selectedDate, setSelectedDate] = useState<SelectedDateRange>({
        // first init 4 may, 2024
        startDate: new Date(2024, 4, 2),
        endDate: new Date(),
        key: '',
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
    const offsetNumber = 2;
    for ( let i = page - offsetNumber; i <= page + offsetNumber; i++ ) {
        if (i >= 1 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }

    const getAllOrders = async (pageNumber: number, searchQuery: string, date: SelectedDateRange) => {
        if (userData && userData.admin) {
            const setDate = `startDate=${date.startDate.toISOString().split('T')[0]}&endDate=${date.endDate.toISOString().split('T')[0]}`
            const url = `/api/transaction?page=${pageNumber}&per_page=${perPage}&status=${status}&search=${searchQuery}&sort_by=${sort}&${setDate}`;
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

    const handleDeleteTransaction = async (id: string) => {
        try {
            const promise = new Promise<void>(async (resolve, reject) => {
                const response = await fetch(`/api/transaction/${id}`, {
                    method: 'DELETE'
                })
                if (response.ok) {
                    router.refresh();
                    setShowPopup(false);
                    resolve();
                } else reject();
            });

            await toast.promise(promise, {
                loading: 'Deleting...',
                success: 'Deleted',
                error: 'Error',
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    const handlePDF = () => {
        generateInvoicePdf('adminInvoice', `admin.pdf`);
    }
    
    useEffect(() => {
        getAllOrders(page, search, selectedDate);
    }, [userData, page, perPage, status, sort, selectedDate, searchParams]);

    if (loading) {
        return 'Loading users info...!'
    }

    if (!data.admin) {
        return redirect('/login');
    }

    return (
        <div id="transactions" className="mt-2">
            { showPopup && (
                <DeleteTransactionPopup btnClose={() => setShowPopup(!showPopup)} btnDelete={() => handleDeleteTransaction(delOrderID)} />
            )}
            { !showPopup && (
                <div className="flex items-center justify-between gap-1">
                    <div className="flex flex-row items-center gap-2 w-1/2">
                        <TransactionStatusDropdown status={status} setStatus={setStatus} setSelectedDate={setSelectedDate} setPage={setPage}/>
                        <TransactionSearchBar setPage={setPage} />
                    </div>
                    <div className="flex flex-row justify-between gap-4">
                        <div className="flex flex-row items-center gap-2">
                            <TrxSelectDate selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
                            <TransactionRows perPage={perPage} setPerPage={setPerPage} setPage={setPage}/>
                            <TrxSortButton sort={sort} setSort={setSort} />
                        </div>
                        <div role="button" onClick={handlePDF} className="flex flex-row justify-between items-center gap-2 rounded-full bg-white hover:bg-gray-100 btn-hover shadow-xl p-2">
                            <span className="text-slate-700 text-xs font-semibold">PDF</span>
                            <IoMdDownload className="text-slate-700" />
                        </div>
                    </div>
                </div>
            )}
            <div className="mt-2">
                { allOrder.length === 0 ? (
                    <NotFoundOrder />
                ) : (
                    <TransactionsTable id={'adminInvoice'} orders={allOrder} page={page} prevPage={prevPage} perPage={perPage} popup={() => setShowPopup(!showPopup)} />
                )}
            </div>
            {!isPageOutOfRange && (
                <TransactionPagination page={page} setPage={setPage} totalPages={totalPages} prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} />
            )}
        </div>
    )
}

export default TransactionsPage;