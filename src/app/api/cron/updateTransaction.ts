import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '@/libs/dbConnect';
import { Transaction } from '@/models/Transaction';

connect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Dapatkan waktu sekarang
    const now = new Date();
    // Dapatkan waktu 1 hari yang lalu
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    // Cari transaksi yang pending dan dibuat lebih dari 1 hari yang lalu
    const transactions: any = await Transaction.updateMany(
      {
        status: { $in: ['pending', 'unpaid'] },
        createdAt: { $lt: oneDayAgo }
      },
      {
        $set: { status: 'failed', deliveryStatus: 'failed' }
      }
    );

    res.status(200).json({ msg: 'Pending transactions updated to failed', updatedCount: transactions.modifiedCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred', error: error.message });
  }
}
