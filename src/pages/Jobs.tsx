import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, RefreshCw } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { JobListing } from '../types';
import { mockJobListings } from '../data/mockData';

const Jobs: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [jobListings, setJobListings] = useState<JobListing[]>([]);
  const [filters, setFilters] = useState({
    status: 'all',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setJobListings(mockJobListings);
      setIsLoading(false);
    };
    
    fetchJobs();
  }, []);

  const filteredJobs = jobListings.filter(job => {
    if (filters.status === 'all') return true;
    return job.status === filters.status;
  });

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'primary';
      case 'processed': return 'success';
      case 'archived': return 'neutral';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Job Listings</h1>
          <p className="text-neutral-500">Manage and analyze job listings from various sources.</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="md"
            icon={<RefreshCw size={16} />}
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 1000);
            }}
          >
            Refresh
          </Button>
          <Button 
            variant="primary" 
            size="md"
            icon={<Plus size={16} />}
          >
            Add Source
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              className="w-full px-4 py-2 pr-10 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-neutral-400" />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex-grow relative">
            <select
              className="w-full appearance-none px-4 py-2 pr-10 border border-neutral-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="processed">Processed</option>
              <option value="archived">Archived</option>
            </select>
            <Filter size={18} className="absolute right-3 top-2.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Jobs List */}
      <Card isLoading={isLoading}>
        {!isLoading && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <p className="text-sm text-neutral-500">
                Showing <span className="font-medium">{filteredJobs.length}</span> job listings
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Analyze All
                </Button>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div key={job.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-sm transition-shadow bg-white">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-medium text-text">{job.title}</h3>
                        <Badge 
                          variant={getStatusVariant(job.status)}
                          size="sm"
                          className="ml-2"
                        >
                          {job.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-neutral-600 mt-1">
                        {job.company} • {job.location}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0 flex items-center">
                      <span className="text-xs text-neutral-500 mr-4">Posted: {job.postedDate}</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-neutral-600 line-clamp-2">{job.description}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-neutral-200 flex flex-wrap gap-2">
                    {job.requirements.slice(0, 4).map((req, index) => (
                      <Badge key={index} variant="neutral" size="sm">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 4 && (
                      <span className="text-xs text-neutral-500 flex items-center">
                        +{job.requirements.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Jobs;