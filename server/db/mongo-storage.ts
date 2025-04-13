import { IStorage } from '../storage';
import { 
  User as UserModel, 
  Job as JobModel, 
  Contact as ContactModel,
  Campaign as CampaignModel,
  Activity as ActivityModel,
  Analytic as AnalyticModel,
  Insight as InsightModel
} from './mongodb';
import {
  User,
  InsertUser,
  Job,
  InsertJob,
  Contact,
  InsertContact,
  Campaign,
  InsertCampaign,
  Activity,
  InsertActivity,
  Analytic,
  InsertAnalytic,
  Insight,
  InsertInsight,
  DashboardMetric
} from '@shared/schema';

export class MongoStorage implements IStorage {
  private currentUser: User;

  constructor() {
    // Set a default user for testing purposes
    this.currentUser = {
      id: 1,
      username: 'alexmorgan',
      password: 'password123',
      fullName: 'Alex Morgan',
      email: 'alex@nexusai.com',
      role: 'admin',
      profileImage: null
    };

    // Initialize the database with seed data if empty
    this.initializeData();
  }

  private async initializeData() {
    try {
      // Check if users collection is empty
      const userCount = await UserModel.countDocuments();
      if (userCount === 0) {
        // Create default user
        const defaultUser: InsertUser = {
          username: 'alexmorgan',
          password: 'password123',
          fullName: 'Alex Morgan',
          email: 'alex@nexusai.com',
          role: 'admin',
          profileImage: null
        };
        await this.createUser(defaultUser);

        // Add sample data for other collections
        await this.createSampleData();
      }
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private async createSampleData() {
    // Sample jobs
    const jobs = [
      {
        position: 'Senior Product Designer',
        company: 'TechZen',
        location: 'Remote',
        salary: '$120,000 - $150,000',
        description: 'Leading design initiatives for our flagship SaaS platform. Collaborate with cross-functional teams to create intuitive user experiences.',
        requirements: ['5+ years experience', 'Figma proficiency', 'SaaS experience'],
        postedDate: new Date('2023-06-15'),
        closingDate: new Date('2023-07-15'),
        matchPercentage: 95
      },
      {
        position: 'Marketing Director',
        company: 'GrowthLabs',
        location: 'New York, NY',
        salary: '$140,000 - $180,000',
        description: 'Drive our marketing strategy and lead a team of 8 marketing professionals. Oversee campaigns, branding, and growth initiatives.',
        requirements: ['8+ years experience', 'Team management', 'B2B marketing'],
        postedDate: new Date('2023-06-10'),
        closingDate: new Date('2023-07-10'),
        matchPercentage: 85
      }
    ];

    // Sample contacts
    const contacts = [
      {
        name: 'Sarah Johnson',
        email: 'sarah@techcorp.com',
        phone: '+1 (555) 123-4567',
        jobTitle: 'VP of Marketing',
        company: 'TechCorp',
        lastInteraction: new Date('2023-06-15'),
        notes: 'Met at TechConf 2023, interested in our enterprise solution',
        profileImage: null,
        category: 'Lead'
      },
      {
        name: 'Michael Chen',
        email: 'mchen@innovatech.com',
        phone: '+1 (555) 987-6543',
        jobTitle: 'CTO',
        company: 'InnovaTech',
        lastInteraction: new Date('2023-06-10'),
        notes: 'Looking for marketing automation solutions',
        profileImage: null,
        category: 'Customer'
      }
    ];

    // Sample campaigns
    const campaigns = [
      {
        name: 'Q3 Product Launch',
        type: 'Email + LinkedIn',
        status: 'Active',
        startDate: new Date('2023-07-01'),
        endDate: new Date('2023-08-15'),
        budget: 5000,
        progress: 65,
        contacts: 2500,
        performance: 4.2
      },
      {
        name: 'Summer Promotion',
        type: 'Twitter + Email',
        status: 'Scheduled',
        startDate: new Date('2023-08-01'),
        endDate: new Date('2023-08-31'),
        budget: 3000,
        progress: 0,
        contacts: 1800,
        performance: 0
      }
    ];

    // Sample activities
    const activities = [
      {
        title: 'LinkedIn Post Scheduled',
        description: 'Share new product features and updates',
        type: 'Social Media',
        date: new Date('2023-07-10'),
        time: '10:00 AM',
        completed: false,
        priority: 'High'
      },
      {
        title: 'Quarterly Newsletter',
        description: 'Prepare and send Q3 newsletter to all subscribers',
        type: 'Email',
        date: new Date('2023-07-15'),
        time: '9:00 AM',
        completed: false,
        priority: 'Medium'
      }
    ];

    // Sample analytics
    const analytics = [
      {
        type: 'connections',
        value: 45,
        date: new Date('2023-06-15'),
        category: 'network',
        source: 'LinkedIn'
      },
      {
        type: 'profile_views',
        value: 120,
        date: new Date('2023-06-15'),
        category: 'engagement',
        source: 'LinkedIn'
      }
    ];

    // Sample insights
    const insights = [
      {
        title: 'Network Growth Opportunity',
        description: 'Your connection acceptance rate is 35% higher than industry average. Consider expanding your outreach to the tech sector.',
        date: new Date('2023-06-20'),
        category: 'network',
        importance: 'High',
        actions: ['Increase connection requests by 20%', 'Focus on tech industry professionals']
      },
      {
        title: 'Content Performance',
        description: 'Posts with images receive 3x more engagement than text-only posts. Consider incorporating more visual content.',
        date: new Date('2023-06-18'),
        category: 'content',
        importance: 'Medium',
        actions: ['Add images to weekly updates', 'Create infographics for key metrics']
      }
    ];

    // Insert sample data
    for (const job of jobs) {
      await this.createJob(job);
    }
    for (const contact of contacts) {
      await this.createContact(contact);
    }
    for (const campaign of campaigns) {
      await this.createCampaign(campaign);
    }
    for (const activity of activities) {
      await this.createActivity(activity);
    }
    for (const analytic of analytics) {
      await this.createAnalytic(analytic);
    }
    for (const insight of insights) {
      await this.createInsight(insight);
    }
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (!user) return undefined;
      
      return {
        id: user._id,
        username: user.username,
        password: user.password,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      };
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return undefined;
      
      return {
        id: user._id,
        username: user.username,
        password: user.password,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage
      };
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const newUser = new UserModel(insertUser);
      await newUser.save();
      
      return {
        id: newUser._id,
        ...insertUser
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User> {
    // In a real app, this would get the current authenticated user
    return this.currentUser;
  }

  // Job operations
  async getAllJobs(): Promise<Job[]> {
    try {
      const jobs = await JobModel.find();
      return jobs.map(job => ({
        id: job._id,
        position: job.position,
        company: job.company,
        location: job.location,
        salary: job.salary,
        description: job.description,
        requirements: job.requirements,
        postedDate: job.postedDate,
        closingDate: job.closingDate,
        matchPercentage: job.matchPercentage
      }));
    } catch (error) {
      console.error('Error getting all jobs:', error);
      return [];
    }
  }

  async getJob(id: number): Promise<Job | undefined> {
    try {
      const job = await JobModel.findById(id);
      if (!job) return undefined;
      
      return {
        id: job._id,
        position: job.position,
        company: job.company,
        location: job.location,
        salary: job.salary,
        description: job.description,
        requirements: job.requirements,
        postedDate: job.postedDate,
        closingDate: job.closingDate,
        matchPercentage: job.matchPercentage
      };
    } catch (error) {
      console.error('Error getting job:', error);
      return undefined;
    }
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    try {
      const newJob = new JobModel(insertJob);
      await newJob.save();
      
      return {
        id: newJob._id,
        ...insertJob
      };
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  }

  // Contact operations
  async getAllContacts(): Promise<Contact[]> {
    try {
      const contacts = await ContactModel.find();
      return contacts.map(contact => ({
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        jobTitle: contact.jobTitle,
        company: contact.company,
        lastInteraction: contact.lastInteraction,
        notes: contact.notes,
        profileImage: contact.profileImage,
        category: contact.category
      }));
    } catch (error) {
      console.error('Error getting all contacts:', error);
      return [];
    }
  }

  async getContact(id: number): Promise<Contact | undefined> {
    try {
      const contact = await ContactModel.findById(id);
      if (!contact) return undefined;
      
      return {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        jobTitle: contact.jobTitle,
        company: contact.company,
        lastInteraction: contact.lastInteraction,
        notes: contact.notes,
        profileImage: contact.profileImage,
        category: contact.category
      };
    } catch (error) {
      console.error('Error getting contact:', error);
      return undefined;
    }
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    try {
      const newContact = new ContactModel(insertContact);
      await newContact.save();
      
      return {
        id: newContact._id,
        ...insertContact
      };
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  }

  // Campaign operations
  async getAllCampaigns(): Promise<Campaign[]> {
    try {
      const campaigns = await CampaignModel.find();
      return campaigns.map(campaign => ({
        id: campaign._id,
        name: campaign.name,
        type: campaign.type,
        status: campaign.status,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        budget: campaign.budget,
        progress: campaign.progress,
        contacts: campaign.contacts,
        performance: campaign.performance
      }));
    } catch (error) {
      console.error('Error getting all campaigns:', error);
      return [];
    }
  }

  async getCampaign(id: number): Promise<Campaign | undefined> {
    try {
      const campaign = await CampaignModel.findById(id);
      if (!campaign) return undefined;
      
      return {
        id: campaign._id,
        name: campaign.name,
        type: campaign.type,
        status: campaign.status,
        startDate: campaign.startDate,
        endDate: campaign.endDate,
        budget: campaign.budget,
        progress: campaign.progress,
        contacts: campaign.contacts,
        performance: campaign.performance
      };
    } catch (error) {
      console.error('Error getting campaign:', error);
      return undefined;
    }
  }

  async createCampaign(insertCampaign: InsertCampaign): Promise<Campaign> {
    try {
      const newCampaign = new CampaignModel(insertCampaign);
      await newCampaign.save();
      
      return {
        id: newCampaign._id,
        ...insertCampaign
      };
    } catch (error) {
      console.error('Error creating campaign:', error);
      throw error;
    }
  }

  // Activity operations
  async getAllActivities(): Promise<Activity[]> {
    try {
      const activities = await ActivityModel.find();
      return activities.map(activity => ({
        id: activity._id,
        title: activity.title,
        description: activity.description,
        type: activity.type,
        date: activity.date,
        time: activity.time,
        completed: activity.completed,
        priority: activity.priority
      }));
    } catch (error) {
      console.error('Error getting all activities:', error);
      return [];
    }
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    try {
      const activity = await ActivityModel.findById(id);
      if (!activity) return undefined;
      
      return {
        id: activity._id,
        title: activity.title,
        description: activity.description,
        type: activity.type,
        date: activity.date,
        time: activity.time,
        completed: activity.completed,
        priority: activity.priority
      };
    } catch (error) {
      console.error('Error getting activity:', error);
      return undefined;
    }
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    try {
      const newActivity = new ActivityModel(insertActivity);
      await newActivity.save();
      
      return {
        id: newActivity._id,
        ...insertActivity
      };
    } catch (error) {
      console.error('Error creating activity:', error);
      throw error;
    }
  }

  // Analytics operations
  async getAllAnalytics(): Promise<Analytic[]> {
    try {
      const analytics = await AnalyticModel.find();
      return analytics.map(analytic => ({
        id: analytic._id,
        type: analytic.type,
        value: analytic.value,
        date: analytic.date,
        category: analytic.category,
        source: analytic.source
      }));
    } catch (error) {
      console.error('Error getting all analytics:', error);
      return [];
    }
  }

  async getAnalytic(id: number): Promise<Analytic | undefined> {
    try {
      const analytic = await AnalyticModel.findById(id);
      if (!analytic) return undefined;
      
      return {
        id: analytic._id,
        type: analytic.type,
        value: analytic.value,
        date: analytic.date,
        category: analytic.category,
        source: analytic.source
      };
    } catch (error) {
      console.error('Error getting analytic:', error);
      return undefined;
    }
  }

  async createAnalytic(insertAnalytic: InsertAnalytic): Promise<Analytic> {
    try {
      const newAnalytic = new AnalyticModel(insertAnalytic);
      await newAnalytic.save();
      
      return {
        id: newAnalytic._id,
        ...insertAnalytic
      };
    } catch (error) {
      console.error('Error creating analytic:', error);
      throw error;
    }
  }

  // Insight operations
  async getAllInsights(): Promise<Insight[]> {
    try {
      const insights = await InsightModel.find();
      return insights.map(insight => ({
        id: insight._id,
        title: insight.title,
        description: insight.description,
        date: insight.date,
        category: insight.category,
        importance: insight.importance,
        actions: insight.actions
      }));
    } catch (error) {
      console.error('Error getting all insights:', error);
      return [];
    }
  }

  async getInsight(id: number): Promise<Insight | undefined> {
    try {
      const insight = await InsightModel.findById(id);
      if (!insight) return undefined;
      
      return {
        id: insight._id,
        title: insight.title,
        description: insight.description,
        date: insight.date,
        category: insight.category,
        importance: insight.importance,
        actions: insight.actions
      };
    } catch (error) {
      console.error('Error getting insight:', error);
      return undefined;
    }
  }

  async createInsight(insertInsight: InsertInsight): Promise<Insight> {
    try {
      const newInsight = new InsightModel(insertInsight);
      await newInsight.save();
      
      return {
        id: newInsight._id,
        ...insertInsight
      };
    } catch (error) {
      console.error('Error creating insight:', error);
      throw error;
    }
  }

  // Dashboard operations
  async getDashboardMetrics(): Promise<DashboardMetric[]> {
    return [
      {
        name: 'New Connections',
        value: 48,
        change: 12,
        changeType: 'increase',
        icon: 'people'
      },
      {
        name: 'Profile Views',
        value: 278,
        change: 18,
        changeType: 'increase',
        icon: 'visibility'
      },
      {
        name: 'Job Matches',
        value: 24,
        change: 5,
        changeType: 'increase',
        icon: 'work'
      },
      {
        name: 'Engagement Rate',
        value: '8.2%',
        change: 1.5,
        changeType: 'increase',
        icon: 'trending_up'
      }
    ];
  }
  
  async getNetworkActivityData(): Promise<any> {
    // This would typically come from analytics
    return [
      { date: '2023-06-01', connections: 3, messages: 12, profile_views: 45 },
      { date: '2023-06-02', connections: 5, messages: 8, profile_views: 52 },
      { date: '2023-06-03', connections: 2, messages: 14, profile_views: 38 },
      { date: '2023-06-04', connections: 6, messages: 10, profile_views: 65 },
      { date: '2023-06-05', connections: 4, messages: 16, profile_views: 42 },
      { date: '2023-06-06', connections: 8, messages: 9, profile_views: 59 },
      { date: '2023-06-07', connections: 5, messages: 11, profile_views: 47 }
    ];
  }
  
  // AI operations
  async performAIAnalysis(text: string, type: string): Promise<any> {
    // In a real application, this would call the Gemini API
    return {
      analysis: `Analysis of your ${type} text: ${text.substring(0, 50)}...`,
      recommendations: [
        'Expand your network in the tech industry',
        'Post more visual content',
        'Engage with industry leaders'
      ],
      insights: 'Your content performs best on weekdays between 9-11am.'
    };
  }
}