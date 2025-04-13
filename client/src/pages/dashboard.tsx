import { Header } from "@/components/layout/header";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ActivityChart } from "@/components/dashboard/activity-chart";
import { JobListings } from "@/components/dashboard/job-listings";
import { MarketingCampaigns } from "@/components/dashboard/marketing-campaigns";
import { GeminiInsights } from "@/components/dashboard/gemini-insights";
import { ContactsWidget } from "@/components/dashboard/contacts-widget";
import { UpcomingActivities } from "@/components/dashboard/upcoming-activities";
import { useQuery } from "@tanstack/react-query";
import { DashboardMetric } from "@shared/schema";
import { useState } from "react";

export default function Dashboard() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  const { data: metrics, isLoading } = useQuery<DashboardMetric[]>({
    queryKey: ['/api/dashboard/metrics'],
  });

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="flex-1 md:ml-64 pt-16 md:pt-0">
      <MobileSidebar />
      <Header openMobileMenu={toggleMobileSidebar} />
      
      <div className="p-4 md:p-6">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {isLoading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-4 h-32 animate-pulse"></div>
            ))
          ) : metrics && metrics.length > 0 ? (
            metrics.map((metric, index) => (
              <MetricCard
                key={index}
                metric={metric}
                bgColorClass={
                  index === 0 ? "bg-primary" :
                  index === 1 ? "bg-secondary" :
                  index === 2 ? "bg-yellow-500" :
                  "bg-emerald-500"
                }
              />
            ))
          ) : (
            <div className="col-span-4 text-center py-4">No metric data available</div>
          )}
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ActivityChart />
            <JobListings />
            <MarketingCampaigns />
          </div>
          
          <div className="space-y-6">
            <GeminiInsights />
            <ContactsWidget />
            <UpcomingActivities />
          </div>
        </div>
      </div>
    </div>
  );
}
