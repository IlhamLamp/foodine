"use client";

import TransactionPriceSummary from "@/components/Order/History/invoice/TransactionPriceSummary";
import TransactionProductDetails from "@/components/Order/History/invoice/TransactionProductDetails";
import TransactionProfileAddress from "@/components/Order/History/invoice/TransactionProfileAddress";
import { TypesTransaction } from "@/types/transaction";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBackspace } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const TransactionsByIdPage: React.FC = () => {

    const [trxID, setTrxID] = useState<TypesTransaction | null>(null)
    const router = useRouter();
    const { id } = useParams();

    useEffect(() => {
        const getTransactionById = async () => {
            const response = await fetch(`/api/transaction/${id}`);
            if (response.ok) {
                const res = await response.json();
                setTrxID(res.data);
            }
        };
        getTransactionById();
    }, [id]);

    const isLoading = trxID === null;

    return (
        <div id="transaction-id-page">
            <div className="flex justify-between">
                <FaBackspace className="w-10 h-10 text-red-400 cursor-pointer" onClick={() => router.back()} />
            </div>
            <div className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg">
                {isLoading ? (
                    <div className="flex flex-col gap-4">
                        <Skeleton height={60} /> 
                        <Skeleton count={2} height={40} />
                        <Skeleton height={50} />
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        <TransactionProfileAddress transaction={trxID} />
                        <TransactionProductDetails transaction={trxID} />
                        <TransactionPriceSummary transaction={trxID} />
                    </div>  
                )}
            </div>
        </div>
    )
}

export default TransactionsByIdPage;