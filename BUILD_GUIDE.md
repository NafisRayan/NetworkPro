# Network Pro - Dashboard Application Build Guide

This guide will walk you through building a clone of the Network Pro dashboard application. This is a modern React application built with TypeScript, Vite, TailwindCSS, and various other powerful libraries.

## Tech Stack

### Frontend
- **React 18** with **TypeScript**
- **Vite** as the build tool
- **TailwindCSS** for styling
- **Radix UI** components
- **Wouter** for routing
- **React Query** for data fetching
- **Recharts** for charts and data visualization
- **Shadcn UI** components
- **Framer Motion** for animations

### Backend
- **Express.js** with TypeScript
- **MongoDB** for database
- **Drizzle ORM** for database operations
- **Zod** for validation

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── dashboard/    # Dashboard-specific components
│   │   │   ├── layout/       # Layout components
│   │   │   ├── search/       # Search functionality
│   │   │   └── ui/          # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   ├── pages/           # Page components
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── tailwind.config.ts
│   └── vite.config.ts
├── server/
│   ├── db/                  # Database configuration
│   ├── index.ts            # Server entry point
│   └── routes.ts           # API routes
└── shared/                 # Shared types and schemas
```

## Step-by-Step Build Guide

### 1. Project Setup

```bash
# Create a new Vite project
npm create vite@latest network-pro -- --template react-ts

# Install dependencies
cd network-pro
npm install @tanstack/react-query wouter @radix-ui/react-* recharts framer-motion lucide-react tailwindcss postcss autoprefixer class-variance-authority clsx tailwind-merge zod react-hook-form date-fns

# Install dev dependencies
npm install -D @types/react @types/react-dom typescript @vitejs/plugin-react tailwindcss postcss autoprefixer
```

### 2. Configure TailwindCSS

Create `tailwind.config.ts`:

```typescript
import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#6c757d",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

### 3. Setup Basic App Structure

Create the basic app structure with routing:

```typescript
// src/App.tsx
import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Layout } from "@/components/layout/layout";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/contacts" component={Contacts} />
      <Route path="/marketing" component={Marketing} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/gemini" component={Gemini} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Router />
      </Layout>
      <Toaster />
    </QueryClientProvider>
  );
}
```

### 4. Create Layout Components

```typescript
// src/components/layout/layout.tsx
export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col md:flex-row">
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      <main className="flex-1 w-full px-2 md:px-8 py-4 md:py-8 md:ml-64 mt-14 md:mt-0">
        {children}
      </main>
    </div>
  );
}
```

### 5. Implement Dashboard Components

Create the main dashboard components:

```typescript
// src/components/dashboard/metric-card.tsx
interface MetricCardProps {
  metric: DashboardMetric;
  bgColorClass: string;
}

export function MetricCard({ metric, bgColorClass }: MetricCardProps) {
  return (
    <div className={`rounded-lg p-4 text-white ${bgColorClass}`}>
      <h3 className="text-lg font-semibold">{metric.title}</h3>
      <p className="text-2xl font-bold mt-2">{metric.value}</p>
      <p className="text-sm mt-1">{metric.change} from last month</p>
    </div>
  );
}

// Similar implementation for other dashboard components:
// - ActivityChart
// - JobListings
// - MarketingCampaigns
// - GeminiInsights
// - ContactsWidget
// - UpcomingActivities
```

### 6. Setup API Integration

```typescript
// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});
```

### 7. Implement Backend (Express + MongoDB)

```typescript
// server/index.ts
import express from "express";
import { connectDB } from "./db/mongodb";
import routes from "./routes";

const app = express();
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
```

## Key Features Implementation

### 1. Dashboard Metrics

The dashboard displays key metrics in cards at the top of the page. These metrics are fetched from the backend and displayed using the MetricCard component.

### 2. Activity Chart

Uses Recharts to display activity data over time:

```typescript
// components/dashboard/activity-chart.tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export function ActivityChart() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Activity Overview</h2>
      <LineChart width={600} height={300} data={activityData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
```

### 3. Job Listings

Displays current job listings with filtering and sorting capabilities.

### 4. Marketing Campaigns

Shows active marketing campaigns with progress tracking.

### 5. Gemini Insights

Displays AI-powered insights about network performance and recommendations.

### 6. Contacts Widget

Lists key contacts with quick action capabilities.

### 7. Upcoming Activities

Shows scheduled activities and events in a timeline format.

## Styling Guide

The application uses TailwindCSS for styling with a consistent color scheme:

- Primary color: #007bff
- Secondary color: #6c757d
- Background: #F5F5F5
- Card backgrounds: white
- Text colors: Various shades of gray

## Responsive Design

The application is fully responsive with different layouts for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

The layout adjusts automatically using Tailwind's responsive classes and the custom useMobile hook.

## Running the Application

1. Start the backend:
```bash
npm run dev:server
```

2. Start the frontend:
```bash
npm run dev:client
```

The application will be available at `http://localhost:5173` with the API running on `http://localhost:5000`.

## Deployment

For deployment:
1. Build the frontend: `cd client && npm run build`
2. Build the backend: `npm run build`
3. Start the production server: `npm start`

## Additional Notes

- Use environment variables for configuration
- Implement proper error handling
- Add loading states for data fetching
- Implement proper TypeScript types for all components
- Follow the existing component structure for consistency
- Use the provided UI components from the components/ui directory
