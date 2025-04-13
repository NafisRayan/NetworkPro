import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  profileImage: text("profile_image"),
  jobTitle: text("job_title"),
  company: text("company"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  profileImage: true,
  jobTitle: true,
  company: true,
});

// Jobs table
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  position: text("position").notNull(),
  company: text("company").notNull(),
  companyLogo: text("company_logo"),
  location: text("location").notNull(),
  salary: text("salary"),
  description: text("description").notNull(),
  matchPercentage: integer("match_percentage"),
  postedDate: timestamp("posted_date").notNull(),
  source: text("source"),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
});

// Contacts table
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone"),
  jobTitle: text("job_title"),
  company: text("company"),
  profileImage: text("profile_image"),
  notes: text("notes"),
  category: text("category"),
  lastInteraction: timestamp("last_interaction"),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
});

// Marketing campaigns table
export const campaigns = pgTable("campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  contacts: integer("contacts").notNull(),
  startDate: timestamp("start_date"),
  progress: integer("progress").notNull(),
});

export const insertCampaignSchema = createInsertSchema(campaigns).omit({
  id: true,
});

// Activities table
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  date: timestamp("date").notNull(),
  time: text("time").notNull(),
  type: text("type").notNull(),
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
});

// Analytics data
export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(),
  date: timestamp("date").notNull(),
  value: integer("value").notNull(),
  category: text("category"),
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
});

// AI Insights
export const insights = pgTable("insights", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  actionLink: text("action_link"),
  actionText: text("action_text"),
});

export const insertInsightSchema = createInsertSchema(insights).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = z.infer<typeof insertCampaignSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type Analytic = typeof analytics.$inferSelect;
export type InsertAnalytic = z.infer<typeof insertAnalyticsSchema>;

export type Insight = typeof insights.$inferSelect;
export type InsertInsight = z.infer<typeof insertInsightSchema>;

// Dashboard metric type
export type DashboardMetric = {
  name: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
};
