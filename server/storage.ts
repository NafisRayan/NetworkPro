import {
  users, type User, type InsertUser,
  jobs, type Job, type InsertJob,
  contacts, type Contact, type InsertContact,
  campaigns, type Campaign, type InsertCampaign,
  activities, type Activity, type InsertActivity,
  analytics, type Analytic, type InsertAnalytic,
  insights, type Insight, type InsertInsight,
  type DashboardMetric
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getCurrentUser(): Promise<User>;

  // Job operations
  getAllJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;

  // Contact operations
  getAllContacts(): Promise<Contact[]>;
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;

  // Campaign operations
  getAllCampaigns(): Promise<Campaign[]>;
  getCampaign(id: number): Promise<Campaign | undefined>;
  createCampaign(campaign: InsertCampaign): Promise<Campaign>;

  // Activity operations
  getAllActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // Analytics operations
  getAllAnalytics(): Promise<Analytic[]>;
  getAnalytic(id: number): Promise<Analytic | undefined>;
  createAnalytic(analytic: InsertAnalytic): Promise<Analytic>;

  // AI Insight operations
  getAllInsights(): Promise<Insight[]>;
  getInsight(id: number): Promise<Insight | undefined>;
  createInsight(insight: InsertInsight): Promise<Insight>;
  
  // Dashboard operations
  getDashboardMetrics(): Promise<DashboardMetric[]>;
  getNetworkActivityData(): Promise<any>;
  
  // AI operations
  performAIAnalysis(text: string, type: string): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private jobs: Map<number, Job>;
  private contacts: Map<number, Contact>;
  private campaigns: Map<number, Campaign>;
  private activities: Map<number, Activity>;
  private analytics: Map<number, Analytic>;
  private insights: Map<number, Insight>;
  
  private userCurrentId: number;
  private jobCurrentId: number;
  private contactCurrentId: number;
  private campaignCurrentId: number;
  private activityCurrentId: number;
  private analyticCurrentId: number;
  private insightCurrentId: number;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.contacts = new Map();
    this.campaigns = new Map();
    this.activities = new Map();
    this.analytics = new Map();
    this.insights = new Map();
    
    this.userCurrentId = 1;
    this.jobCurrentId = 1;
    this.contactCurrentId = 1;
    this.campaignCurrentId = 1;
    this.activityCurrentId = 1;
    this.analyticCurrentId = 1;
    this.insightCurrentId = 1;
    
    this.initializeData();
  }

  private initializeData() {
    // Create default user
    const defaultUser: InsertUser = {
      username: "alexmorgan",
      password: "password123",
      fullName: "Alex Morgan",
      email: "alex@example.com",
      profileImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80",
      jobTitle: "Marketing Director",
      company: "TechInnovate",
    };
    this.createUser(defaultUser);

    // Add sample jobs
    const jobs: InsertJob[] = [
      {
        position: "Senior Product Designer",
        company: "TechZen",
        companyLogo: "",
        location: "Remote (US)",
        salary: "$120K - $150K",
        description: "Design user interfaces for innovative products",
        matchPercentage: 92,
        postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        source: "LinkedIn",
      },
      {
        position: "Marketing Manager",
        company: "GrowthLabs",
        companyLogo: "",
        location: "New York, NY",
        salary: "$90K - $110K",
        description: "Develop and execute marketing strategies",
        matchPercentage: 78,
        postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        source: "Indeed",
      },
      {
        position: "Frontend Developer",
        company: "NexStack",
        companyLogo: "",
        location: "Remote (Global)",
        salary: "$85K - $110K",
        description: "Build responsive web applications",
        matchPercentage: 96,
        postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        source: "AngelList",
      },
    ];

    jobs.forEach(job => this.createJob(job));

    // Add sample contacts
    const contacts: InsertContact[] = [
      {
        name: "Sarah Johnson",
        email: "sarah@techcorp.com",
        phone: "+1-555-123-4567",
        jobTitle: "Product Manager",
        company: "TechCorp",
        profileImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80",
        notes: "Met at Tech Conference 2023",
        category: "Industry Leader",
        lastInteraction: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Michael Chen",
        email: "mchen@innovate.com",
        phone: "+1-555-987-6543",
        jobTitle: "Engineering Lead",
        company: "Innovate Inc",
        profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80",
        notes: "Potential partnership opportunity",
        category: "Prospect",
        lastInteraction: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        name: "David Rodriguez",
        email: "david@growthco.com",
        phone: "+1-555-456-7890",
        jobTitle: "Marketing Director",
        company: "GrowthCo",
        profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80",
        notes: "Marketing collaboration discussion",
        category: "Partner",
        lastInteraction: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        name: "Alexa Kim",
        email: "alexa@designhub.com",
        phone: "+1-555-789-0123",
        jobTitle: "UX Designer",
        company: "DesignHub",
        profileImage: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=144&h=144&q=80",
        notes: "Freelance project collaboration",
        category: "Collaborator",
        lastInteraction: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      },
    ];

    contacts.forEach(contact => this.createContact(contact));

    // Add sample campaigns
    const campaigns: InsertCampaign[] = [
      {
        name: "Q3 Product Launch",
        type: "Email + LinkedIn campaign",
        description: "Promoting the new product features",
        status: "Active",
        contacts: 124,
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        progress: 68,
      },
      {
        name: "Industry Conference Follow-up",
        type: "LinkedIn + Twitter campaign",
        description: "Following up with conference attendees",
        status: "Active",
        contacts: 57,
        startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        progress: 32,
      },
      {
        name: "Customer Testimonial Collection",
        type: "Email campaign",
        description: "Collecting testimonials from satisfied customers",
        status: "Scheduled",
        contacts: 85,
        startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        progress: 0,
      },
    ];

    campaigns.forEach(campaign => this.createCampaign(campaign));

    // Add sample activities
    const activities: InsertActivity[] = [
      {
        title: "LinkedIn Post Scheduled",
        description: "Automated post about industry trends",
        date: new Date(2023, 5, 15),
        time: "10:00 AM",
        type: "Social Media",
      },
      {
        title: "Email Campaign Launch",
        description: "Q3 Product Announcement",
        date: new Date(2023, 5, 18),
        time: "9:00 AM",
        type: "Email",
      },
      {
        title: "Network Analysis",
        description: "AI-powered contact relationship review",
        date: new Date(2023, 5, 22),
        time: "2:30 PM",
        type: "AI Analysis",
      },
    ];

    activities.forEach(activity => this.createActivity(activity));

    // Add sample analytics
    const analyticsData: InsertAnalytic[] = [
      { type: "connections", date: new Date(2023, 5, 1), value: 32, category: "network" },
      { type: "connections", date: new Date(2023, 5, 2), value: 28, category: "network" },
      { type: "connections", date: new Date(2023, 5, 3), value: 35, category: "network" },
      { type: "connections", date: new Date(2023, 5, 4), value: 39, category: "network" },
      { type: "connections", date: new Date(2023, 5, 5), value: 30, category: "network" },
      { type: "connections", date: new Date(2023, 5, 6), value: 25, category: "network" },
      { type: "connections", date: new Date(2023, 5, 7), value: 40, category: "network" },
      
      { type: "messages", date: new Date(2023, 5, 1), value: 15, category: "engagement" },
      { type: "messages", date: new Date(2023, 5, 2), value: 12, category: "engagement" },
      { type: "messages", date: new Date(2023, 5, 3), value: 8, category: "engagement" },
      { type: "messages", date: new Date(2023, 5, 4), value: 20, category: "engagement" },
      { type: "messages", date: new Date(2023, 5, 5), value: 25, category: "engagement" },
      { type: "messages", date: new Date(2023, 5, 6), value: 18, category: "engagement" },
      { type: "messages", date: new Date(2023, 5, 7), value: 30, category: "engagement" },
      
      { type: "profile_views", date: new Date(2023, 5, 1), value: 45, category: "visibility" },
      { type: "profile_views", date: new Date(2023, 5, 2), value: 50, category: "visibility" },
      { type: "profile_views", date: new Date(2023, 5, 3), value: 65, category: "visibility" },
      { type: "profile_views", date: new Date(2023, 5, 4), value: 70, category: "visibility" },
      { type: "profile_views", date: new Date(2023, 5, 5), value: 60, category: "visibility" },
      { type: "profile_views", date: new Date(2023, 5, 6), value: 75, category: "visibility" },
      { type: "profile_views", date: new Date(2023, 5, 7), value: 85, category: "visibility" },
    ];

    analyticsData.forEach(analytic => this.createAnalytic(analytic));

    // Add sample insights
    const insightsData: InsertInsight[] = [
      {
        title: "Network Growth Opportunity",
        description: "Based on your recent connections, I identified 15 potential leads in the SaaS industry you haven't connected with yet.",
        type: "network",
        category: "opportunity",
        actionLink: "/contacts",
        actionText: "View Recommendations",
      },
      {
        title: "Content Performance Analysis",
        description: "Your posts about AI integration received 43% higher engagement. Consider focusing your next campaign on this topic.",
        type: "content",
        category: "analysis",
        actionLink: "/marketing",
        actionText: "Generate Content Ideas",
      },
      {
        title: "Job Match Analysis",
        description: "I've analyzed your profile against recent job listings. Your skills in UX design and project management are highly sought after.",
        type: "job",
        category: "analysis",
        actionLink: "/analytics",
        actionText: "See Full Analysis",
      },
    ];

    insightsData.forEach(insight => this.createInsight(insight));
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCurrentUser(): Promise<User> {
    const user = this.users.get(1);
    if (!user) {
      throw new Error("Current user not found");
    }
    return user;
  }

  // Job operations
  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.jobCurrentId++;
    const job: Job = { ...insertJob, id };
    this.jobs.set(id, job);
    return job;
  }

  // Contact operations
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = { ...insertContact, id };
    this.contacts.set(id, contact);
    return contact;
  }

  // Campaign operations
  async getAllCampaigns(): Promise<Campaign[]> {
    return Array.from(this.campaigns.values());
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    return this.campaigns.get(id);
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    const id = this.campaignCurrentId++;
    const campaign: Campaign = { ...insertCampaign, id };
    this.campaigns.set(id, campaign);
    return campaign;
  }

  // Activity operations
  async getAllActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    return this.activities.get(id);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.activityCurrentId++;
    const activity: Activity = { ...insertActivity, id };
    this.activities.set(id, activity);
    return activity;
  }

  // Analytics operations
  async getAllAnalytics(): Promise<Analytic[]> {
    return Array.from(this.analytics.values());
  }

  async getAnalytic(id: number): Promise<Analytic | undefined> {
    return this.analytics.get(id);
  }

  async createAnalytic(insertAnalytic: InsertAnalytic): Promise<Analytic> {
    const id = this.analyticCurrentId++;
    const analytic: Analytic = { ...insertAnalytic, id };
    this.analytics.set(id, analytic);
    return analytic;
  }

  // Insight operations
  async getAllInsights(): Promise<Insight[]> {
    return Array.from(this.insights.values());
  }

  async getInsight(id: number): Promise<Insight | undefined> {
    return this.insights.get(id);
  }

  async createInsight(insertInsight: InsertInsight): Promise<Insight> {
    const id = this.insightCurrentId++;
    const insight: Insight = { ...insertInsight, id };
    this.insights.set(id, insight);
    return insight;
  }

  // Dashboard operations
  async getDashboardMetrics(): Promise<DashboardMetric[]> {
    return [
      {
        name: "New Connections",
        value: 48,
        change: 12,
        changeType: "increase",
        icon: "people",
      },
      {
        name: "Job Opportunities",
        value: 23,
        change: 8,
        changeType: "increase",
        icon: "work",
      },
      {
        name: "Marketing Reach",
        value: "1.2k",
        change: 3,
        changeType: "decrease",
        icon: "campaign",
      },
      {
        name: "AI Generated Content",
        value: 15,
        change: 25,
        changeType: "increase",
        icon: "smart_toy",
      },
    ];
  }

  async getNetworkActivityData(): Promise<any> {
    // Process analytics data to get proper format for charts
    const analytics = await this.getAllAnalytics();
    
    // Group by date and calculate totals
    const dateGrouped = analytics.reduce((acc, item) => {
      const dateStr = item.date.toISOString().split('T')[0];
      
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
    return Object.values(dateGrouped).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  }

  async performAIAnalysis(text: string, type: string): Promise<any> {
    // Simulate AI analysis
    // In a real application, this would call the Gemini API
    switch (type) {
      case 'network':
        return {
          analysis: "Network analysis complete.",
          recommendations: [
            "Connect with 5 industry leaders in your field",
            "Schedule follow-up meetings with recent connections",
            "Join industry groups related to your interests"
          ]
        };
      case 'content':
        return {
          analysis: "Content analysis complete.",
          topics: [
            "AI in Marketing",
            "Digital Transformation",
            "Remote Work Trends"
          ],
          sentiment: "positive"
        };
      case 'job':
        return {
          analysis: "Job match analysis complete.",
          matchScore: 85,
          strengths: [
            "Technical skills match",
            "Experience level appropriate",
            "Industry knowledge"
          ],
          improvements: [
            "Consider adding more leadership examples",
            "Highlight project management skills"
          ]
        };
      default:
        return {
          analysis: "General analysis complete.",
          insights: "No specific insights available for this type."
        };
    }
  }
}

export const storage = new MemStorage();
