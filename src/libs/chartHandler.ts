import { TypesTransactionDB } from "@/types/transaction";

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const trxStatus = ["settlement", "pending", "unpaid", "failed"];

export const ChartBarTransaction = (transactions: TypesTransactionDB[]) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return transactionDate >= sixMonthsAgo;
    });

    const incomeByMonth = {}

    filteredTransactions.forEach((transaction) => {
        const transactionDate = new Date(transaction.createdAt);
        const month = monthNames[transactionDate.getMonth()];
        if(!incomeByMonth[month]) {
            incomeByMonth[month] = 0;
        }
        incomeByMonth[month] += transaction.totalTransactionPrice;
    })

    const data = [];
    for (let i = 0; i < 6; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const month = monthNames[date.getMonth()];

        data.push({
            month: month,
            income: incomeByMonth[month] || 0
        });
    };

    const result = data.reverse();

    return result;
}

export const PieChartTransaction = (transactions: TypesTransactionDB[]) => {

    const statusCount = {
        settlement: 0,
        pending: 0,
        unpaid: 0,
        failed: 0,
    }

    transactions.forEach(transaction => {
        if (trxStatus.includes(transaction.status)) {
            statusCount[transaction.status]++;
        }
    })

    const result = trxStatus.map(status => ({
        name: status,
        value: statusCount[status],
    }))

    return result;

}