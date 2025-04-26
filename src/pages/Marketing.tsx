import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, RefreshCw, TrendingUp, SlidersHorizontal } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import MarketingContentCard from '../components/dashboard/MarketingContentCard';
import { MarketingContent } from '../types';
import { mockMarketingContent } from '../data/mockData';

const Marketing: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState<MarketingContent[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    sentiment: 'all',
  });

  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContent(mockMarketingContent);
      setIsLoading(false);
    };
    
    fetchContent();
  }, []);

  const filteredContent = content.filter(item => {
    if (filters.type !== 'all' && item.type !== filters.type) return false;
    
    if (filters.sentiment !== 'all') {
      if (!item.sentimentScore) return false;
      
      switch (filters.sentiment) {
        case 'positive':
          return item.sentimentScore > 0.5;
        case 'neutral':
          return item.sentimentScore >= 0 && item.sentimentScore <= 0.5;
        case 'negative':
          return item.sentimentScore < 0;
        default:
          return true;
      }
    }
    
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Marketing Content</h1>
          <p className="text-neutral-500">Analyze and manage marketing content from various sources.</p>
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
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by title, source, or keywords..."
              className="w-full px-4 py-2 pr-10 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-neutral-400" />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="relative">
            <select
              className="w-full appearance-none px-4 py-2 pr-10 border border-neutral-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="all">All Types</option>
              <option value="article">Articles</option>
              <option value="post">Posts</option>
              <option value="video">Videos</option>
              <option value="podcast">Podcasts</option>
            </select>
            <Filter size={18} className="absolute right-3 top-2.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
        <div className="md:col-span-3">
          <div className="relative">
            <select
              className="w-full appearance-none px-4 py-2 pr-10 border border-neutral-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.sentiment}
              onChange={(e) => setFilters({...filters, sentiment: e.target.value})}
            >
              <option value="all">All Sentiment</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>
            <TrendingUp size={18} className="absolute right-3 top-2.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white">
          <div className={isLoading ? "animate-pulse" : ""}>
            {isLoading ? (
              <div className="h-16 bg-neutral-200 rounded"></div>
            ) : (
              <div className="text-center">
                <p className="text-neutral-500 text-sm font-medium">Total Content</p>
                <p className="text-3xl font-bold text-text mt-1">{content.length}</p>
                <div className="mt-2 text-xs text-success-500 flex items-center justify-center">
                  <TrendingUp size={12} className="mr-1" />
                  +12% vs previous month
                </div>
              </div>
            )}
          </div>
        </Card>
        <Card className="bg-white">
          <div className={isLoading ? "animate-pulse" : ""}>
            {isLoading ? (
              <div className="h-16 bg-neutral-200 rounded"></div>
            ) : (
              <div className="text-center">
                <p className="text-neutral-500 text-sm font-medium">Avg. Sentiment</p>
                <p className="text-3xl font-bold text-success-500 mt-1">72%</p>
                <div className="mt-2 text-xs text-success-500 flex items-center justify-center">
                  <TrendingUp size={12} className="mr-1" />
                  +5% vs previous month
                </div>
              </div>
            )}
          </div>
        </Card>
        <Card className="bg-white">
          <div className={isLoading ? "animate-pulse" : ""}>
            {isLoading ? (
              <div className="h-16 bg-neutral-200 rounded"></div>
            ) : (
              <div className="text-center">
                <p className="text-neutral-500 text-sm font-medium">Top Source</p>
                <p className="text-xl font-bold text-text mt-1">LinkedIn</p>
                <div className="mt-2 text-xs text-neutral-500 flex items-center justify-center">
                  32% of all content
                </div>
              </div>
            )}
          </div>
        </Card>
        <Card className="bg-white">
          <div className={isLoading ? "animate-pulse" : ""}>
            {isLoading ? (
              <div className="h-16 bg-neutral-200 rounded"></div>
            ) : (
              <div className="text-center">
                <p className="text-neutral-500 text-sm font-medium">Top Keywords</p>
                <div className="mt-2 flex flex-wrap justify-center gap-1">
                  <Badge variant="primary" size="sm">AI</Badge>
                  <Badge variant="secondary" size="sm">Marketing</Badge>
                  <Badge variant="success" size="sm">Data</Badge>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>
      
      {/* Content Grid */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-neutral-500">
            Showing <span className="font-medium">{filteredContent.length}</span> items
          </p>
          <Button 
            variant="outline" 
            size="sm"
            icon={<SlidersHorizontal size={14} />}
          >
            Advanced Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            Array(6).fill(0).map((_, index) => (
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
            ))
          ) : (
            filteredContent.map((item) => (
              <MarketingContentCard key={item.id} content={item} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Marketing;