import { Sidebar } from "@/components/layout/sidebar"; // Added import
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Header } from "@/components/layout/header";
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
  // State for mobile sidebar toggle might still be needed by Header
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const { data: metrics, isLoading } = useQuery<DashboardMetric[]>({
    queryKey: ['/api/dashboard/metrics'],
  });

  // Toggle function might still be needed by Header
  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    // Added wrapper div from original Layout
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col md:flex-row">
      {/* Mobile top bar from original Layout */}
      <div className="md:hidden">
        {/* MobileSidebar might be controlled internally or via Header */}
        <MobileSidebar />
      </div>
      {/* Sidebar for desktop from original Layout */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      {/* Main content wrapper from original Layout */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-2 md:px-8 py-4 md:py-8">
        {/* Header component kept inside main */}
        <Header openMobileMenu={toggleMobileSidebar} />

        {/* Original page content starts here */}
        {/* Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {isLoading ? (
            Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-lg shadow p-4 h-28 xs:h-32 animate-pulse"
                ></div>
              ))
          ) : metrics && metrics.length > 0 ? (
            metrics.map((metric, index) => (
              <MetricCard
                key={index}
                metric={metric}
                bgColorClass={
                  index === 0
                    ? "bg-primary"
                    : index === 1
                    ? "bg-secondary"
                    : index === 2
                    ? "bg-yellow-500"
                    : "bg-emerald-500"
                }
              />
            ))
          ) : (
            <div className="col-span-4 text-center py-4">
              No metric data available
            </div>
          )}
        </section>

        {/* Main Dashboard Content */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6">
            <ActivityChart />
            <JobListings />
            <MarketingCampaigns />
          </div>

          <div className="flex flex-col gap-4 sm:gap-6">
            <GeminiInsights />
            <ContactsWidget />
            <UpcomingActivities />
          </div>
        </section>
        {/* Original page content ends here */}
      </main>
    </div>
  );
}
