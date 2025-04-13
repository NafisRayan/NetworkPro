import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import {
  insertJobSchema,
  insertContactSchema,
  insertCampaignSchema,
  insertActivitySchema,
  insertAnalyticsSchema,
  insertInsightSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Users routes
  app.get("/api/users/current", async (req, res) => {
    try {
      // For demo purposes, return a default user
      const currentUser = await storage.getCurrentUser();
      res.json(currentUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch current user" });
    }
  });

  // Jobs routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getAllJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  app.post("/api/jobs", async (req, res) => {
    try {
      const validation = insertJobSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid job data" });
      }
      const job = await storage.createJob(validation.data);
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json({ message: "Failed to create job" });
    }
  });

  // Contacts routes
  app.get("/api/contacts", async (req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const validation = insertContactSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid contact data" });
      }
      const contact = await storage.createContact(validation.data);
      res.status(201).json(contact);
    } catch (error) {
      res.status(500).json({ message: "Failed to create contact" });
    }
  });

  // Marketing campaigns routes
  app.get("/api/campaigns", async (req, res) => {
    try {
      const campaigns = await storage.getAllCampaigns();
      res.json(campaigns);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch campaigns" });
    }
  });

  app.post("/api/campaigns", async (req, res) => {
    try {
      const validation = insertCampaignSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid campaign data" });
      }
      const campaign = await storage.createCampaign(validation.data);
      res.status(201).json(campaign);
    } catch (error) {
      res.status(500).json({ message: "Failed to create campaign" });
    }
  });

  // Activities routes
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getAllActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  app.post("/api/activities", async (req, res) => {
    try {
      const validation = insertActivitySchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid activity data" });
      }
      const activity = await storage.createActivity(validation.data);
      res.status(201).json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to create activity" });
    }
  });

  // Analytics routes
  app.get("/api/analytics", async (req, res) => {
    try {
      const analytics = await storage.getAllAnalytics();
      res.json(analytics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  app.post("/api/analytics", async (req, res) => {
    try {
      const validation = insertAnalyticsSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid analytics data" });
      }
      const analytic = await storage.createAnalytic(validation.data);
      res.status(201).json(analytic);
    } catch (error) {
      res.status(500).json({ message: "Failed to create analytic" });
    }
  });

  // AI Insights routes
  app.get("/api/insights", async (req, res) => {
    try {
      const insights = await storage.getAllInsights();
      res.json(insights);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch insights" });
    }
  });

  app.post("/api/insights", async (req, res) => {
    try {
      const validation = insertInsightSchema.safeParse(req.body);
      if (!validation.success) {
        return res.status(400).json({ message: "Invalid insight data" });
      }
      const insight = await storage.createInsight(validation.data);
      res.status(201).json(insight);
    } catch (error) {
      res.status(500).json({ message: "Failed to create insight" });
    }
  });

  // Dashboard metrics route
  app.get("/api/dashboard/metrics", async (req, res) => {
    try {
      const metrics = await storage.getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard metrics" });
    }
  });

  // Network activity data for chart
  app.get("/api/dashboard/network-activity", async (req, res) => {
    try {
      const activityData = await storage.getNetworkActivityData();
      res.json(activityData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch network activity data" });
    }
  });

  // Gemini AI analysis endpoint
  app.post("/api/ai/analyze", async (req, res) => {
    try {
      const { text, type } = req.body;
      if (!text || !type) {
        return res.status(400).json({ message: "Missing required parameters" });
      }
      
      const analysis = await storage.performAIAnalysis(text, type);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ message: "AI analysis failed" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
