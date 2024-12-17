import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'April', value: 30 },
  { name: 'May', value: 20 },
  { name: 'June', value: 45 },
  { name: 'July', value: 35 }
];

export function SalesChart() {
  return (
    <div className="bg-black text-white border border-white rounded-[28px] text-center  " style={{ height: '50%' }}>
      <h3 className="text-white text-lg mb-0 mt-5">Evolution des ventes</h3>
      <div className="h-[400px]" style={{ marginLeft: '-5%', marginRight: '5%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="name" stroke="#FFF" offset={10} />
            <YAxis stroke="#FFF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#000', border: '1px solid #FFF' }}
              labelStyle={{ color: '#FFF' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#FFF"
              fill="url(#gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}