import { connect } from "@/libs/dbConnect";

connect();

class TransactionService {
    async getAllTransaction() {
        try {
            const response = await fetch('/api/transaction/all');
            if (response.ok) {
                const res = await response.json();
                const transaction = res.data;
                return transaction;
            }
        } catch (error) {
            console.error('Error get all users', error);
        }
    }

    async updateTransaction(transaction_id: string, status: string, data?: any) {
        if (!transaction_id) {
            return;
        }

        try {
            const response = await fetch(`/api/transaction`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ transaction_id, status, data }),
            })
            if (!response.ok) {
                console.log('Failed update transaction');
                return;
            }
            console.log(`Transaction ${transaction_id} status updated to ${status}`);
        } catch (error) {
            console.error('Error updating transaction: ', error);
        }
    }
}

export const transactionService = new TransactionService();