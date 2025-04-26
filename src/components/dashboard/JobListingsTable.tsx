import React from 'react';
import { Clock, ExternalLink } from 'lucide-react';
import { JobListing } from '../../types';
import Badge from '../common/Badge';

interface JobListingsTableProps {
  jobListings: JobListing[];
  isLoading?: boolean;
}

const JobListingsTable: React.FC<JobListingsTableProps> = ({ 
  jobListings,
  isLoading = false 
}) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'new': return 'primary';
      case 'processed': return 'success';
      case 'archived': return 'neutral';
      default: return 'neutral';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead className="bg-neutral-50">
          <tr>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Title</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Company</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Location</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Posted</th>
            <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-neutral-200">
          {isLoading ? (
            Array(5).fill(0).map((_, index) => (
              <tr key={index} className="animate-pulse">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="h-4 bg-neutral-200 rounded w-1/4"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="h-4 bg-neutral-200 rounded w-1/5"></div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="h-4 bg-neutral-200 rounded w-8 ml-auto"></div>
                </td>
              </tr>
            ))
          ) : (
            jobListings.map((job) => (
              <tr key={job.id}>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div>
                    <p className="text-sm font-medium text-text">{job.title}</p>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="text-sm text-neutral-600">{job.company}</p>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <p className="text-sm text-neutral-600">{job.location}</p>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-neutral-500">
                    <Clock size={14} className="mr-1" />
                    {job.postedDate}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge variant={getStatusVariant(job.status)}>
                    {job.status}
                  </Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <a 
                    href={job.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600"
                  >
                    <ExternalLink size={18} />
                  </a>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobListingsTable;