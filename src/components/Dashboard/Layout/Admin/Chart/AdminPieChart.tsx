import { PieChartTransaction } from "@/libs/chartHandler";
import { TypesTransactionDB } from "@/types/transaction";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

type TypesPieData = {
  name: string;
  value: number
}

const COLORS = ['#50CB93', '#FEA82F', '#ED2B2A', '#B00202'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AdminPieChart: React.FC<{ transactions: TypesTransactionDB[]}> = ({ transactions }) => {

  const data: TypesPieData[]  = PieChartTransaction(transactions);

  return (
    <ResponsiveContainer width="50%" height={'auto'} aspect={1}>
      <PieChart width={400} height={0}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default AdminPieChart