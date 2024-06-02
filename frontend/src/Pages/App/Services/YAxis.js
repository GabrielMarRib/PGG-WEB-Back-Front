import { XAxis } from 'recharts';

const CustomXAxis = ({ 
  tick = { fontSize: 15 }, 
  domain = [0, 120], 
  tickCount = 7, 
  tickFormatter = (value) => value 
}) => {
  return <XAxis tick={tick} domain={domain} tickCount={tickCount} tickFormatter={tickFormatter} />;
};

export default CustomXAxis;