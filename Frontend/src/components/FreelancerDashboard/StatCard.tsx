import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bg: string;
  text: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bg, text }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${bg} ${text}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
