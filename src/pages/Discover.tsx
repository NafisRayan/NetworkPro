import React, { useState } from 'react';
import { Search, MapPin, Building, Filter, RefreshCw } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Discover: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [radius, setRadius] = useState('10');
  const [jobType, setJobType] = useState('all');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Discover</h1>
          <p className="text-neutral-500">Find relevant jobs and companies in your area</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="md"
            icon={<RefreshCw size={16} />}
          >
            Refresh
          </Button>
          <Button 
            variant="primary" 
            size="md"
            icon={<MapPin size={16} />}
          >
            Current Location
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-neutral-400" />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="w-full appearance-none px-4 py-2 pr-10 border border-neutral-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="5">Within 5 miles</option>
              <option value="10">Within 10 miles</option>
              <option value="25">Within 25 miles</option>
              <option value="50">Within 50 miles</option>
            </select>
            <MapPin size={18} className="absolute right-3 top-2.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="relative">
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full appearance-none px-4 py-2 pr-10 border border-neutral-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Job Types</option>
              <option value="fulltime">Full Time</option>
              <option value="parttime">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
            <Filter size={18} className="absolute right-3 top-2.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Map and Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <div className="aspect-[16/9] bg-neutral-100 rounded-lg flex items-center justify-center">
              <p className="text-neutral-500">Google Maps will be integrated here</p>
            </div>
          </Card>
        </div>

        {/* Results List */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-lg font-medium text-text">Nearby Companies</h2>
          
          {/* Example Company Cards */}
          {[1, 2, 3].map((i) => (
            <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded bg-primary-100 flex items-center justify-center">
                      <Building size={20} className="text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-medium text-text">Tech Company {i}</h3>
                      <p className="text-sm text-neutral-500">Software Development</p>
                    </div>
                  </div>
                  <Badge variant="primary" size="sm">
                    {i === 1 ? '3 jobs' : i === 2 ? '1 job' : '2 jobs'}
                  </Badge>
                </div>
                
                <div className="flex items-center text-sm text-neutral-500">
                  <MapPin size={14} className="mr-1" />
                  {i === 1 ? '0.5 miles away' : i === 2 ? '1.2 miles away' : '2.1 miles away'}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="neutral" size="sm">React</Badge>
                  <Badge variant="neutral" size="sm">Node.js</Badge>
                  <Badge variant="neutral" size="sm">TypeScript</Badge>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;