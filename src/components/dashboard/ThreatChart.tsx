
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Malware', count: 45, severity: 'high' },
  { name: 'Phishing', count: 32, severity: 'medium' },
  { name: 'Brute Force', count: 28, severity: 'medium' },
  { name: 'DDoS', count: 15, severity: 'high' },
  { name: 'Botnet', count: 12, severity: 'low' },
  { name: 'Ransomware', count: 8, severity: 'high' }
];

const ThreatChart = () => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Threat Types Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="name" 
            stroke="#9CA3AF"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="#9CA3AF" fontSize={12} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1F2937', 
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Bar 
            dataKey="count" 
            fill="#EF4444"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ThreatChart;
