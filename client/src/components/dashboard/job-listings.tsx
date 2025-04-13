import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { Job } from '@shared/schema';

export function JobListings() {
  const { data: jobs, isLoading, error } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
  });

  const getDaysAgo = (date: Date) => {
    const diffTime = Math.abs(new Date().getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Recent Job Listings</CardTitle>
            <CardDescription className="mt-1">
              Jobs collected based on your profile and preferences
            </CardDescription>
          </div>
          <Button variant="link" className="text-primary">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Salary</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center">Loading job listings...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center text-red-500">Error loading job listings</td>
                </tr>
              ) : jobs && jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium">{job.position}</div>
                      <div className="text-xs text-gray-500">Posted {getDaysAgo(job.postedDate)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 ${job.company === 'TechZen' ? 'bg-gray-200' : job.company === 'GrowthLabs' ? 'bg-blue-100' : 'bg-purple-100'} rounded-full flex items-center justify-center mr-2`}>
                          <span className="text-xs font-medium">{job.company.substring(0, 2)}</span>
                        </div>
                        <span className="text-sm">{job.company}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <span className="material-icons text-sm mr-1 text-gray-500">location_on</span>
                        {job.location}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">{job.salary}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                        job.matchPercentage! >= 90 
                          ? 'bg-emerald-50 text-emerald-600' 
                          : job.matchPercentage! >= 70 
                            ? 'bg-amber-50 text-amber-600' 
                            : 'bg-gray-100 text-gray-600'
                      } inline-flex items-center`}>
                        <span className="mr-1">{job.matchPercentage}%</span>
                        <CheckCircle className="h-3 w-3" />
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-right">
                      <Button variant="link" className="text-primary h-auto p-0">Apply</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-4 text-center">No job listings found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
