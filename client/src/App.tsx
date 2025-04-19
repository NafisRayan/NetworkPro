import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Jobs from "@/pages/jobs";
import Contacts from "@/pages/contacts";
import Marketing from "@/pages/marketing";
import Analytics from "@/pages/analytics";
import Gemini from "@/pages/gemini";

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
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
