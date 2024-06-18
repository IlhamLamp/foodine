import { ChartBarTransaction } from '@/libs/chartHandler';
import { TypesTransactionDB } from '@/types/transaction';
import { BarChart, Bar, Rectangle, CartesianGrid, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

type TypesSixMonthsAgo = {
  month: string;
  income: number;
}

const AdminBarChart: React.FC<{ transactions: TypesTransactionDB[] }> = ({ transactions }) => {

  const sixMonthsAgo: TypesSixMonthsAgo[] = ChartBarTransaction(transactions);

  return (
    <ResponsiveContainer width="100%" height={'auto'} aspect={1}>
        <BarChart
          width={500}
          height={0}
          data={sixMonthsAgo}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="income" fill="#A555EC" activeBar={<Rectangle fill="#F3CCFF" stroke="#A555EC" />} />
        </BarChart>
      </ResponsiveContainer>
  );
}

export default AdminBarChart;
