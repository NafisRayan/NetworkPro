import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../common/Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon, 
  change,
  isLoading = false
}) => {
  return (
    <Card isLoading={isLoading} className="h-full">
      {!isLoading && (
        <>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-neutral-500 font-medium">{title}</p>
              <h3 className="mt-1 text-2xl font-semibold text-text">{value}</h3>
            </div>
            <div className="p-2 rounded-lg bg-primary-50 text-primary-500">
              {icon}
            </div>
          </div>
          
          {change && (
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium flex items-center ${
                change.isPositive ? 'text-success-500' : 'text-red-500'
              }`}>
                {change.isPositive ? (
                  <ArrowUpRight size={16} className="mr-1" />
                ) : (
                  <ArrowDownRight size={16} className="mr-1" />
                )}
                {Math.abs(change.value)}%
              </span>
              <span className="text-xs text-neutral-500 ml-2">vs last month</span>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default StatCard;