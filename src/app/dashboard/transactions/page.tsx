"use client";
import { ProfileContext } from "@/components/AppContext";
import TransactionSearchBar from "@/components/Dashboard/Transactions/TransactionSearchBar";
import TransactionsTable from "@/components/Dashboard/Transactions/TransactionsTable";
import TransactionStatusDropdown from "@/components/Dashboard/Transactions/TransactionStatusDropdown";
import UseProfile from "@/components/UseProfile";
import { TypesOrderHistory } from "@/types/order";
import { TypesTransactionPagination } from "@/types/transaction";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const TransactionsPage: React.FC<{ searchParams: { search?: string, page?: number } }>
= ({ searchParams }) => {

    const { loading, data } = UseProfile();
    const { userData } = useContext(ProfileContext);
    const [allOrder, setAllOrder] = useState<TypesOrderHistory>([]);

    // pagination
    const search = searchParams?.search || '';

    const [page, setPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [status, setStatus] = useState<string>("All");

    const getAllOrders = async (searchQuery: string) => {
        if (userData && userData.admin) {
            const response = await fetch(`/api/transaction?page=${page}&per_page=${perPage}&status=${status}&search=${searchQuery}`);
            if (!response.ok) {
                return 'Failed get all orders';
            }
            const res: TypesTransactionPagination = await response.json();
            setAllOrder(res.data);
            setPage(res.page);
            setPerPage(res.per_page);
        }
    };
    
    useEffect(() => {
        getAllOrders(search);
    }, [userData, page, perPage, searchParams]);

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
            </div>
            <div className="mt-2">
                <TransactionsTable orders={allOrder} />
            </div>
        </div>
    )
}

export default TransactionsPage;