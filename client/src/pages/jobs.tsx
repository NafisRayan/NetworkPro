import { Sidebar } from "@/components/layout/sidebar"; // Added import
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Job } from "@shared/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Search, Filter, Briefcase } from "lucide-react";
import { format } from "date-fns";

export default function Jobs() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");

  const { data: jobs, isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
  });

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const filteredJobs = jobs?.filter(job => {
    const matchesSearch = job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === "all" || job.location.includes(locationFilter);
    return matchesSearch && matchesLocation;
  });

  return (
    // Added wrapper div from original Layout
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col md:flex-row">
      {/* Mobile top bar from original Layout */}
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      {/* Sidebar for desktop from original Layout */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      {/* Main content wrapper from original Layout */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-2 md:px-8 py-4 md:py-8">
        {/* Header component kept inside main */}
        <Header openMobileMenu={toggleMobileSidebar} />

        {/* Original page content starts here */}
        <div className="p-4 md:p-6"> {/* Removed padding from original outer div, kept inner padding */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#283E4A] mb-2">Job Listings</h1>
            <p className="text-gray-500">Discover and apply to jobs that match your skills and interests</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
            <div className="md:col-span-9">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search for jobs by title, company, or keywords"
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                  <SelectItem value="San Francisco">San Francisco</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Available Jobs</CardTitle>
                  <CardDescription>{filteredJobs?.length || 0} jobs matching your criteria</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" /> More Filters
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-4">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="border rounded-lg p-4 animate-pulse">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              ) : filteredJobs && filteredJobs.length > 0 ? (
                <div className="space-y-4">
                  {filteredJobs.map(job => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between">
                        <div className="flex-1">
                          <div className="flex items-start">
                            <div className={`w-12 h-12 ${job.company === 'TechZen' ? 'bg-gray-200' : job.company === 'GrowthLabs' ? 'bg-blue-100' : 'bg-purple-100'} rounded-lg flex items-center justify-center mr-4`}>
                              <Briefcase className="h-6 w-6 text-gray-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{job.position}</h3>
                              <p className="text-gray-600">{job.company} • {job.location}</p>
                              <div className="flex flex-wrap items-center mt-2 gap-3">
                                <span className="text-sm text-gray-500">{job.salary}</span>
                                <span className="text-sm text-gray-500">Posted {format(new Date(job.postedDate), 'MMM d, yyyy')}</span>
                                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                                  job.matchPercentage! >= 90
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : job.matchPercentage! >= 70
                                      ? 'bg-amber-50 text-amber-600'
                                      : 'bg-gray-100 text-gray-600'
                                } inline-flex items-center`}>
                                  <span className="mr-1">{job.matchPercentage}% Match</span>
                                  <CheckCircle className="h-3 w-3" />
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="mt-3 text-sm text-gray-600">{job.description}</p>
                        </div>
                        <div className="ml-4 self-start">
                          <Button className="bg-primary hover:bg-primary/90">Apply Now</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Briefcase className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Original page content ends here */}
      </main>
    </div>
  );
}
