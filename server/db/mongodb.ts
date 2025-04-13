import mongoose from 'mongoose';
import { log } from '../vite';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('MongoDB URI is not defined in environment variables');
}

// Connect to MongoDB
export async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    log('Connected to MongoDB Atlas', 'mongodb');
  } catch (error) {
    log(`Error connecting to MongoDB: ${error}`, 'mongodb');
    throw error;
  }
}

// Define schemas for our data models

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, default: 'user' },
  profileImage: { type: String, default: null },
});

// Job Schema
const jobSchema = new mongoose.Schema({
  position: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: [String], default: [] },
  postedDate: { type: Date, default: Date.now },
  closingDate: { type: Date },
  matchPercentage: { type: Number, default: 0 },
});

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
  jobTitle: { type: String },
  company: { type: String },
  lastInteraction: { type: Date },
  notes: { type: String },
  profileImage: { type: String },
  category: { type: String, default: 'Lead' },
});

// Campaign Schema
const campaignSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  status: { type: String, default: 'Draft' },
  startDate: { type: Date },
  endDate: { type: Date },
  budget: { type: Number },
  progress: { type: Number, default: 0 },
  contacts: { type: Number, default: 0 },
  performance: { type: Number },
});

// Activity Schema
const activitySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  completed: { type: Boolean, default: false },
  priority: { type: String, default: 'Medium' },
});

// Analytic Schema
const analyticSchema = new mongoose.Schema({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String },
  source: { type: String },
});

// Insight Schema
const insightSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true },
  importance: { type: String, default: 'Medium' },
  actions: { type: [String], default: [] },
});

// Create and export models
export const User = mongoose.model('User', userSchema);
export const Job = mongoose.model('Job', jobSchema);
export const Contact = mongoose.model('Contact', contactSchema);
export const Campaign = mongoose.model('Campaign', campaignSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const Analytic = mongoose.model('Analytic', analyticSchema);
export const Insight = mongoose.model('Insight', insightSchema);