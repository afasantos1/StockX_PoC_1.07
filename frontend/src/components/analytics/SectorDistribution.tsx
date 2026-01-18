import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SectorDistribution: React.FC = () => {
  const data = [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Finance', value: 22, color: '#22c55e' },
    { name: 'Healthcare', value: 18, color: '#f59e0b' },
    { name: 'Consumer', value: 15, color: '#ef4444' },
    { name: 'Energy', value: 10, color: '#a855f7' },
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Sector Distribution
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectorDistribution;
