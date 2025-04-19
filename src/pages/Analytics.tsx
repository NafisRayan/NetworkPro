import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Download, 
  ChevronDown, 
  Users, 
  Briefcase, 
  Megaphone, 
  TrendingUp 
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import LineChart from '../components/analytics/LineChart';
import BarChart from '../components/analytics/BarChart';
import { AnalyticsData } from '../types';

const Analytics: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [period, setPeriod] = useState('30days');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock analytics data
      setAnalyticsData({
        jobListings: {
          total: 124,
          newThisWeek: 18,
          processed: 76,
          archived: 30,
        },
        contacts: {
          total: 1305,
          byCategory: {
            lead: 483,
            client: 296,
            partner: 187,
            other: 339,
          },
          newThisMonth: 42,
        },
        marketingContent: {
          total: 87,
          byType: {
            article: 34,
            post: 29,
            video: 15,
            podcast: 9,
          },
          sentimentOverTime: [
            {date: 'Jan', score: 0.65},
            {date: 'Feb', score: 0.58},
            {date: 'Mar', score: 0.72},
            {date: 'Apr', score: 0.67},
            {date: 'May', score: 0.75},
            {date: 'Jun', score: 0.69},
          ],
        },
      });
      
      setIsLoading(false);
    };
    
    fetchAnalytics();
  }, [period]);

  // Prepare chart data
  const jobsChartData = [
    { label: 'Mon', value: 12 },
    { label: 'Tue', value: 19 },
    { label: 'Wed', value: 15 },
    { label: 'Thu', value: 22 },
    { label: 'Fri', value: 30 },
    { label: 'Sat', value: 18 },
    { label: 'Sun', value: 8 },
  ];

  const contactsCategoryData = analyticsData ? [
    { label: 'Leads', value: analyticsData.contacts.byCategory.lead },
    { label: 'Clients', value: analyticsData.contacts.byCategory.client },
    { label: 'Partners', value: analyticsData.contacts.byCategory.partner },
    { label: 'Others', value: analyticsData.contacts.byCategory.other },
  ] : [];

  const contentTypeData = analyticsData ? [
    { label: 'Articles', value: analyticsData.marketingContent.byType.article },
    { label: 'Posts', value: analyticsData.marketingContent.byType.post },
    { label: 'Videos', value: analyticsData.marketingContent.byType.video },
    { label: 'Podcasts', value: analyticsData.marketingContent.byType.podcast },
  ] : [];

  const sentimentData = analyticsData?.marketingContent.sentimentOverTime.map(item => ({
    label: item.date,
    value: item.score * 100,
  })) || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Analytics Dashboard</h1>
          <p className="text-neutral-500">Insights and metrics for your networking activities.</p>
        </div>
        <div className="flex space-x-2">
          <div className="relative">
            <Button 
              variant="outline" 
              size="md"
              icon={<Calendar size={16} />}
              iconPosition="left"
              className="pr-10"
            >
              {period === '7days' ? 'Last 7 days' : 
                period === '30days' ? 'Last 30 days' : 
                period === '90days' ? 'Last 90 days' : 
                'Custom'}
              <ChevronDown size={16} className="absolute right-3 top-2.5" />
            </Button>
            <select 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="custom">Custom range</option>
            </select>
          </div>
          <Button 
            variant="outline" 
            size="md"
            icon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <div className={isLoading ? "animate-pulse" : ""}>
            {isLoading ? (
              <div className="h-24 bg-neutral-200 rounded"></div>
            ) : (
              <div>
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-primary-100 text-primary-500 mr-3">
                    <Briefcase size={20} />
                  </div>
                  <h3 className="font-medium text-text">Job Listings</h3>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-text">{analyticsData?.jobListings.total}</p>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-xs text-neutral-500">New this week</p>
                      <p className="text-sm font-medium text-text">{analyticsData?.jobListings.newThisWeek}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Processed</p>
                      <p className="text-sm font-medium text-success-500">{analyticsData?.jobListings.processed}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Archived</p>
                      <p className="text-sm font-medium text-neutral-500">{analyticsData?.jobListings.archived}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className={isLoading ? "animate-pulse" : ""}>
            {isLoading ? (
              <div className="h-24 bg-neutral-200 rounded"></div>
            ) : (
              <div>
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-secondary-100 text-secondary-500 mr-3">
                    <Users size={20} />
                  </div>
                  <h3 className="font-medium text-text">Contacts</h3>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-text">{analyticsData?.contacts.total}</p>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-xs text-neutral-500">Leads</p>
                      <p className="text-sm font-medium text-text">{analyticsData?.contacts.byCategory.lead}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Clients</p>
                      <p className="text-sm font-medium text-success-500">{analyticsData?.contacts.byCategory.client}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">New this month</p>
                      <p className="text-sm font-medium text-primary-500">{analyticsData?.contacts.newThisMonth}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
        
        <Card className="bg-white">
          <div className={isLoading ? "animate-pulse" : ""}>
            {isLoading ? (
              <div className="h-24 bg-neutral-200 rounded"></div>
            ) : (
              <div>
                <div className="flex items-center">
                  <div className="p-2 rounded-md bg-success-100 text-success-500 mr-3">
                    <Megaphone size={20} />
                  </div>
                  <h3 className="font-medium text-text">Marketing Content</h3>
                </div>
                <div className="mt-4">
                  <p className="text-3xl font-bold text-text">{analyticsData?.marketingContent.total}</p>
                  <div className="flex justify-between mt-2">
                    <div>
                      <p className="text-xs text-neutral-500">Articles</p>
                      <p className="text-sm font-medium text-text">{analyticsData?.marketingContent.byType.article}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Posts</p>
                      <p className="text-sm font-medium text-text">{analyticsData?.marketingContent.byType.post}</p>
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500">Avg. Sentiment</p>
                      <p className="text-sm font-medium text-success-500">
                        <span className="flex items-center">
                          <TrendingUp size={14} className="mr-1" /> 72%
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Job Listings Activity" isLoading={isLoading}>
          {!isLoading && <LineChart data={jobsChartData} title="Jobs" color="#0077B5" />}
        </Card>
        
        <Card title="Contacts by Category" isLoading={isLoading}>
          {!isLoading && <BarChart data={contactsCategoryData} title="Contacts" />}
        </Card>
        
        <Card title="Content by Type" isLoading={isLoading}>
          {!isLoading && <BarChart data={contentTypeData} title="Content Types" />}
        </Card>
        
        <Card title="Content Sentiment Over Time" isLoading={isLoading}>
          {!isLoading && <LineChart data={sentimentData} title="Sentiment" color="#00A36C" />}
        </Card>
      </div>
      
      {/* Key Insights */}
      <Card title="Key Insights" isLoading={isLoading}>
        {!isLoading && (
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-primary-100 text-primary-500">
                <TrendingUp size={16} />
              </div>
              <div>
                <h4 className="font-medium text-text">Job Listings Trend</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Job listings have increased by 15% compared to the previous period. The most common job titles include Software Engineer, Data Scientist, and Product Manager.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-secondary-100 text-secondary-500">
                <TrendingUp size={16} />
              </div>
              <div>
                <h4 className="font-medium text-text">Contact Acquisition</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Your network is growing steadily with 42 new contacts this month. Consider reaching out to leads in the technology sector as they make up 35% of your recent additions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-full bg-success-100 text-success-500">
                <TrendingUp size={16} />
              </div>
              <div>
                <h4 className="font-medium text-text">Content Performance</h4>
                <p className="text-sm text-neutral-600 mt-1">
                  Content sentiment is positive at 72%. Articles about AI and data analytics are performing exceptionally well. Consider creating more content around these topics.
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Analytics;