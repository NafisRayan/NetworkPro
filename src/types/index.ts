export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface JobListing {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  postedDate: string;
  url: string;
  status: 'new' | 'processed' | 'archived';
}

export interface Contact {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone?: string;
  linkedIn?: string;
  category: 'lead' | 'client' | 'partner' | 'other';
  notes?: string;
  lastContact?: string;
}

export interface MarketingContent {
  id: string;
  title: string;
  source: string;
  type: 'article' | 'post' | 'video' | 'podcast';
  url: string;
  summary: string;
  sentimentScore?: number;
  keywords: string[];
  publishedDate: string;
}

export interface AnalyticsData {
  jobListings: {
    total: number;
    newThisWeek: number;
    processed: number;
    archived: number;
  };
  contacts: {
    total: number;
    byCategory: Record<string, number>;
    newThisMonth: number;
  };
  marketingContent: {
    total: number;
    byType: Record<string, number>;
    sentimentOverTime: Array<{date: string, score: number}>;
  };
}

export interface NavItem {
  name: string;
  path: string;
  icon: React.ElementType;
}