
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '00:00', threats: 12 },
  { time: '04:00', threats: 8 },
  { time: '08:00', threats: 25 },
  { time: '12:00', threats: 18 },
  { time: '16:00', threats: 32 },
  { time: '20:00', threats: 28 },
];

const ActivityTimeline = () => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-4">24h Threat Activity</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="threats" 
            stroke="#EF4444" 
            strokeWidth={3}
            dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#EF4444', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ActivityTimeline;
