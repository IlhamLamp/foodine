import { connect } from "@/libs/dbConnect";
import { MIDTRANS_SERVER_KEY } from "@/utils/constant";
import crypto from 'crypto';
import { transactionService } from "./TransactionService";

connect();

class MidtransNotificationService {
    async updateStatusByMidtransResponse(transaction_id: string, data: any) {
        const hash = crypto.createHash('sha512').update(`${transaction_id}${data.status_code}${data.gross_amount}${MIDTRANS_SERVER_KEY}`).digest('hex');
        if(data.signature_key !== hash){
            return {
                status: 'error',
                message: 'Invalid Signature key',
            }
        }
    
        let responseData = null;
        let transactionStatus = data.transaction_status;
        let fraudStatus = data.fraud_status;
    
        if (transactionStatus == 'capture'){
            if (fraudStatus == 'accept'){
                const transaction = await transactionService.updateTransaction(transaction_id, 'accept', data);
                responseData = transaction;
            }
        } else if (transactionStatus == 'settlement'){
            const transaction = await transactionService.updateTransaction(transaction_id, 'settlement', data);
            responseData = transaction;
        } else if (transactionStatus == 'cancel' || transactionStatus == 'deny' || transactionStatus == 'expire'){
            const transaction = await transactionService.updateTransaction(transaction_id, 'cancel', data);
            responseData = transaction;
        } else if (transactionStatus == 'pending'){
            const transaction = await transactionService.updateTransaction(transaction_id, 'pending', data);
            responseData = transaction;
        }
    
        return {
            status: 'success',
            data: responseData
        }
    }
}

export const midtransNotificationService = new MidtransNotificationService();