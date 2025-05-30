
import React from 'react';
import { cn } from '../../lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ReactNode;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType,
  icon,
  className
}) => {
  const changeColor = {
    positive: 'text-green-400',
    negative: 'text-red-400',
    neutral: 'text-slate-400'
  };

  return (
    <div className={cn(
      "bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-sm font-medium">{title}</p>
          <p className="text-white text-2xl font-bold mt-1">{value}</p>
          <p className={cn("text-sm mt-1", changeColor[changeType])}>
            {change}
          </p>
        </div>
        <div className="text-slate-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
