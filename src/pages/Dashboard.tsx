import React, { useState, useEffect } from 'react';
import { Briefcase, Users, BarChart3, Megaphone } from 'lucide-react';
import Card from '../components/common/Card';
import StatCard from '../components/dashboard/StatCard';
import JobListingsTable from '../components/dashboard/JobListingsTable';
import ContactsList from '../components/dashboard/ContactsList';
import MarketingContentCard from '../components/dashboard/MarketingContentCard';
import Button from '../components/common/Button';
import { JobListing, Contact, MarketingContent } from '../types';
import { mockJobListings, mockContacts, mockMarketingContent } from '../data/mockData';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [marketingContent, setMarketingContent] = useState<MarketingContent[]>([]);

  useEffect(() => {
    // Simulate API calls
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setJobListings(mockJobListings);
      setContacts(mockContacts);
      setMarketingContent(mockMarketingContent);
      
      setIsLoading(false);
    };
    
    fetchData();
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Welcome back, John!</h1>
          <p className="text-neutral-500">Here's what's happening across your networking activities.</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="md">
            Generate Report
          </Button>
          <Button variant="primary" size="md">
            New Campaign
          </Button>
        </div>
      </div>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Job Listings"
          value={isLoading ? "0" : "124"}
          icon={<Briefcase size={20} />}
          change={{ value: 12, isPositive: true }}
          isLoading={isLoading}
        />
        <StatCard
          title="Contacts"
          value={isLoading ? "0" : "1,305"}
          icon={<Users size={20} />}
          change={{ value: 8, isPositive: true }}
          isLoading={isLoading}
        />
        <StatCard
          title="Marketing Content"
          value={isLoading ? "0" : "87"}
          icon={<Megaphone size={20} />}
          change={{ value: 5, isPositive: false }}
          isLoading={isLoading}
        />
        <StatCard
          title="Analytics"
          value={isLoading ? "0" : "26%"}
          icon={<BarChart3 size={20} />}
          change={{ value: 7, isPositive: true }}
          isLoading={isLoading}
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Job Listings */}
        <div className="lg:col-span-3">
          <Card 
            title="Recent Job Listings" 
            isLoading={isLoading}
            footer={
              <div className="flex justify-between items-center">
                <span className="text-xs text-neutral-500">Showing {isLoading ? 0 : jobListings.length} of {isLoading ? 0 : 124} entries</span>
                <Button variant="text" size="sm">View All</Button>
              </div>
            }
          >
            <JobListingsTable jobListings={jobListings} isLoading={isLoading} />
          </Card>
        </div>
        
        {/* Contacts */}
        <div className="lg:col-span-1">
          <Card 
            title="Recent Contacts" 
            isLoading={isLoading}
            footer={<Button variant="text" size="sm" className="w-full">View All Contacts</Button>}
          >
            <ContactsList contacts={contacts} isLoading={isLoading} />
          </Card>
        </div>
        
        {/* Marketing Content */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium text-text">Latest Marketing Content</h2>
            <Button variant="text" size="sm">View All</Button>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array(4).fill(0).map((_, index) => (
                <div key={index} className="animate-pulse border border-neutral-200 rounded-lg overflow-hidden bg-white">
                  <div className="px-4 py-3 border-b border-neutral-200">
                    <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                  </div>
                  <div className="p-4">
                    <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                  </div>
                  <div className="px-4 py-3 bg-neutral-50 border-t border-neutral-200">
                    <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {marketingContent.slice(0, 4).map((content) => (
                <MarketingContentCard key={content.id} content={content} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;