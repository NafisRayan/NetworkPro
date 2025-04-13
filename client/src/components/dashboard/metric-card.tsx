import { DashboardMetric } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp } from "lucide-react";

interface MetricCardProps {
  metric: DashboardMetric;
  bgColorClass?: string;
}

export function MetricCard({ metric, bgColorClass = "bg-primary" }: MetricCardProps) {
  const { name, value, change, changeType, icon } = metric;
  
  return (
    <Card className="p-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{name}</p>
          <h3 className="font-semibold text-2xl mt-1">{value}</h3>
          <p className={`flex items-center text-sm mt-1 ${changeType === 'increase' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {changeType === 'increase' ? (
              <ArrowUp className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 mr-1" />
            )}
            <span>{change}%</span> from last week
          </p>
        </div>
        <div className={`${bgColorClass} bg-opacity-10 p-3 rounded-full`}>
          <span className="material-icons text-primary">{icon}</span>
        </div>
      </div>
    </Card>
  );
}
