import { XAxis as RechartsXAxis, YAxis as RechartsYAxis, XAxisProps, YAxisProps } from 'recharts';

const XAxis: React.FC<XAxisProps> = (props) => {
  const { dataKey = '', ...rest } = props;
  return <RechartsXAxis dataKey={dataKey} {...rest} />;
};

const YAxis: React.FC<YAxisProps> = (props) => {
  return <RechartsYAxis {...props} />;
};

export { XAxis, YAxis };
