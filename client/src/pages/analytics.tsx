import { Header } from "@/components/layout/header";
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Analytic } from "@shared/schema";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart as BarChartIcon, 
  PieChart, 
  LineChart as LineChartIcon,
  Download,
  Share2,
  Calendar,
  Filter
} from "lucide-react";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from "recharts";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Analytics() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [timeRange, setTimeRange] = useState("7days");
  const [chartType, setChartType] = useState("connections");
  
  const { data: analytics, isLoading } = useQuery<Analytic[]>({
    queryKey: ['/api/analytics'],
  });

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  // Process analytics data for charts
  const processDataForLineChart = () => {
    if (!analytics) return [];
    
    // Group by date
    const groupedByDate = analytics.reduce((acc, item) => {
      const dateStr = new Date(item.date).toISOString().split('T')[0];
      
      if (!acc[dateStr]) {
        acc[dateStr] = {
          date: dateStr,
          connections: 0,
          messages: 0,
          profile_views: 0,
        };
      }
      
      if (item.type === 'connections') {
        acc[dateStr].connections += item.value;
      } else if (item.type === 'messages') {
        acc[dateStr].messages += item.value;
      } else if (item.type === 'profile_views') {
        acc[dateStr].profile_views += item.value;
      }
      
      return acc;
    }, {} as Record<string, any>);
    
    // Convert to array and sort by date
    return Object.values(groupedByDate).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  };

  const processDataForBarChart = () => {
    if (!analytics) return [];
    
    // Sum values by type
    const sumsByType = analytics.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = 0;
      }
      acc[item.type] += item.value;
      return acc;
    }, {} as Record<string, number>);
    
    // Convert to array format for chart
    return Object.entries(sumsByType).map(([name, value]) => ({
      name: name.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
      value
    }));
  };

  const processDataForPieChart = () => {
    if (!analytics) return [];
    
    // Group by category
    const sumsByCategory = analytics.reduce((acc, item) => {
      if (!acc[item.category || 'other']) {
        acc[item.category || 'other'] = 0;
      }
      acc[item.category || 'other'] += item.value;
      return acc;
    }, {} as Record<string, number>);
    
    // Convert to array format for chart
    return Object.entries(sumsByCategory).map(([name, value]) => ({
      name: name.replace(/\b\w/g, l => l.toUpperCase()),
      value
    }));
  };

  const lineChartData = processDataForLineChart();
  const barChartData = processDataForBarChart();
  const pieChartData = processDataForPieChart();

  // Colors for charts
  const COLORS = ['#0077B5', '#2867B2', '#00A36C', '#283E4A'];

  return (
    <div className="flex-1 md:ml-64 pt-16 md:pt-0">
      <MobileSidebar />
      <Header openMobileMenu={toggleMobileSidebar} />
      
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#283E4A] mb-2">Analytics Dashboard</h1>
          <p className="text-gray-500">Track your networking and marketing performance</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-500">Total Connections</p>
                <p className="text-3xl font-bold">245</p>
                <div className="text-sm text-emerald-600">+12% from last period</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-500">Messages Sent</p>
                <p className="text-3xl font-bold">128</p>
                <div className="text-sm text-emerald-600">+5% from last period</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-500">Profile Views</p>
                <p className="text-3xl font-bold">452</p>
                <div className="text-sm text-emerald-600">+18% from last period</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col space-y-2">
                <p className="text-sm text-gray-500">Campaign Engagement</p>
                <p className="text-3xl font-bold">32%</p>
                <div className="text-sm text-rose-600">-3% from last period</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="network">Network Growth</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Network Activity Overview</CardTitle>
                    <CardDescription>Track your networking activity over time</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={chartType === "connections" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("connections")}
                    >
                      Connections
                    </Button>
                    <Button
                      variant={chartType === "messages" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("messages")}
                    >
                      Messages
                    </Button>
                    <Button
                      variant={chartType === "profile_views" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setChartType("profile_views")}
                    >
                      Profile Views
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="h-[400px] flex items-center justify-center">
                    <p>Loading chart data...</p>
                  </div>
                ) : lineChartData.length > 0 ? (
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={lineChartData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis 
                          dataKey="date" 
                          tick={{fontSize: 12}}
                          tickFormatter={(value) => {
                            const date = new Date(value);
                            return `${date.getMonth()+1}/${date.getDate()}`;
                          }}
                        />
                        <YAxis tick={{fontSize: 12}} />
                        <Tooltip />
                        <Legend />
                        {chartType === "connections" || chartType === "all" ? (
                          <Area
                            type="monotone"
                            dataKey="connections"
                            stroke="#0077B5"
                            fill="#0077B5"
                            fillOpacity={0.2}
                            activeDot={{ r: 8 }}
                          />
                        ) : null}
                        {chartType === "messages" || chartType === "all" ? (
                          <Area
                            type="monotone"
                            dataKey="messages"
                            stroke="#2867B2"
                            fill="#2867B2"
                            fillOpacity={0.2}
                            activeDot={{ r: 8 }}
                          />
                        ) : null}
                        {chartType === "profile_views" || chartType === "all" ? (
                          <Area
                            type="monotone"
                            dataKey="profile_views"
                            stroke="#00A36C"
                            fill="#00A36C"
                            fillOpacity={0.2}
                            activeDot={{ r: 8 }}
                          />
                        ) : null}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="h-[400px] flex items-center justify-center">
                    <p>No data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Distribution</CardTitle>
                  <CardDescription>Breakdown by activity type</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[300px] flex items-center justify-center">
                      <p>Loading chart data...</p>
                    </div>
                  ) : barChartData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={barChartData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#0077B5" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center">
                      <p>No data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Category Breakdown</CardTitle>
                  <CardDescription>Distribution by category</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="h-[300px] flex items-center justify-center">
                      <p>Loading chart data...</p>
                    </div>
                  ) : pieChartData.length > 0 ? (
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {pieChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[300px] flex items-center justify-center">
                      <p>No data available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="network" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Network Growth Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 space-y-4">
                  <LineChartIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium">Network Growth Metrics</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Detailed analytics about your network growth will be displayed here. Track connection trends, growth rates, and networking effectiveness.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="engagement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 space-y-4">
                  <PieChart className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium">Engagement Analysis</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Metrics about how your connections engage with your content and communications will be displayed here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="campaigns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 space-y-4">
                  <BarChartIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="text-lg font-medium">Campaign Analytics</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Performance metrics for your marketing campaigns will be displayed here, including open rates, click-through rates, and conversion data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
