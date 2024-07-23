"use client";

import CardDeliveryStatus from "@/components/Order/History/CardDeliveryStatus";
import TransactionPriceSummary from "@/components/Order/History/invoice/TransactionPriceSummary";
import TransactionProductDetails from "@/components/Order/History/invoice/TransactionProductDetails";
import TransactionProfileAddress from "@/components/Order/History/invoice/TransactionProfileAddress";
import { generateInvoicePdf } from "@/libs/exportHandler";
import { TypesTransaction } from "@/types/transaction";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBackspace } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";

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

    const handlePayment = () => {
        return null;
    }

    const handlePDF = () => {
        const pdf = generateInvoicePdf('invoice', `${trxID?.transactionId}.pdf`);
        return toast.promise(pdf, {
            loading: 'please wait a moment',
            success: `${id} downloaded`,
            error: 'error generate pdf',
        })
    }

    return (
        <div id="transaction-id-page">
            <div className="flex justify-between items-center my-2">
                <FaBackspace className="w-10 h-10 text-red-400 cursor-pointer" onClick={() => router.back()} />
                <div role="button" onClick={handlePDF} className="flex flex-row justify-between items-center gap-2 rounded-full bg-slate-800 p-2">
                    <span className="text-white text-xs font-semibold">PDF</span>
                    <IoMdDownload className="text-white" />
                </div>
            </div>
            <div id="invoice" className="max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg">
                <div className="flex flex-col gap-4">
                    <TransactionProfileAddress transaction={trxID} />
                    <TransactionProductDetails transaction={trxID} />
                    <TransactionPriceSummary transaction={trxID} pay={handlePayment} />
                </div>  
                <span className="text-sm text-gray-300">Arya Kue Snack</span>
            </div>
            { trxID?.status !== 'unpaid' && (
                <div className="my-2 max-w-6xl mx-auto p-6 bg-gray-100 rounded-lg">
                    <CardDeliveryStatus transaction={trxID} />
                </div>
            )}
        </div>
    )
}

export default TransactionsByIdPage;