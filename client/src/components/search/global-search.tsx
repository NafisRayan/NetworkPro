import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem, 
  CommandList 
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Search, Briefcase, Users, FileText, BarChart, Mail } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Job, Contact, Campaign, Activity } from '@shared/schema';

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [_, setLocation] = useLocation();

  // Fetch data for search
  const { data: jobs } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
  });

  const { data: contacts } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  const { data: campaigns } = useQuery<Campaign[]>({
    queryKey: ['/api/campaigns'],
  });

  const { data: activities } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });

  // Set up keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const navigateToItem = (path: string) => {
    setOpen(false);
    setLocation(path);
  };

  // Filter jobs by search term
  const filteredJobs = jobs?.filter(job => 
    job.position.toLowerCase().includes(search.toLowerCase()) || 
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.description.toLowerCase().includes(search.toLowerCase())
  ) || [];

  // Filter contacts by search term
  const filteredContacts = contacts?.filter(contact => 
    contact.name.toLowerCase().includes(search.toLowerCase()) || 
    (contact.company && contact.company.toLowerCase().includes(search.toLowerCase())) ||
    (contact.email && contact.email.toLowerCase().includes(search.toLowerCase()))
  ) || [];

  // Filter campaigns by search term
  const filteredCampaigns = campaigns?.filter(campaign => 
    campaign.name.toLowerCase().includes(search.toLowerCase()) || 
    campaign.type.toLowerCase().includes(search.toLowerCase())
  ) || [];

  // Filter activities by search term
  const filteredActivities = activities?.filter(activity => 
    activity.title.toLowerCase().includes(search.toLowerCase()) || 
    activity.description.toLowerCase().includes(search.toLowerCase())
  ) || [];

  return (
    <>
      <Button 
        variant="outline" 
        className="w-full md:w-80 justify-between text-muted-foreground" 
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center">
          <Search className="h-4 w-4 mr-2" />
          <span>Search anything...</span>
        </div>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search jobs, contacts, campaigns..." 
          value={search}
          onValueChange={setSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          
          {filteredJobs.length > 0 && (
            <CommandGroup heading="Jobs">
              {filteredJobs.slice(0, 4).map(job => (
                <CommandItem 
                  key={job.id} 
                  value={`job-${job.id}`}
                  onSelect={() => navigateToItem('/jobs')}
                >
                  <Briefcase className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span>{job.position}</span>
                    <span className="text-xs text-muted-foreground">{job.company}</span>
                  </div>
                </CommandItem>
              ))}
              {filteredJobs.length > 4 && (
                <CommandItem onSelect={() => navigateToItem('/jobs')}>
                  <span className="text-xs text-muted-foreground">View all {filteredJobs.length} jobs</span>
                </CommandItem>
              )}
            </CommandGroup>
          )}
          
          {filteredContacts.length > 0 && (
            <CommandGroup heading="Contacts">
              {filteredContacts.slice(0, 4).map(contact => (
                <CommandItem 
                  key={contact.id} 
                  value={`contact-${contact.id}`}
                  onSelect={() => navigateToItem('/contacts')}
                >
                  <Users className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span>{contact.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {contact.company || contact.email || contact.jobTitle}
                    </span>
                  </div>
                </CommandItem>
              ))}
              {filteredContacts.length > 4 && (
                <CommandItem onSelect={() => navigateToItem('/contacts')}>
                  <span className="text-xs text-muted-foreground">View all {filteredContacts.length} contacts</span>
                </CommandItem>
              )}
            </CommandGroup>
          )}
          
          {filteredCampaigns.length > 0 && (
            <CommandGroup heading="Marketing Campaigns">
              {filteredCampaigns.slice(0, 4).map(campaign => (
                <CommandItem 
                  key={campaign.id} 
                  value={`campaign-${campaign.id}`}
                  onSelect={() => navigateToItem('/marketing')}
                >
                  <Mail className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span>{campaign.name}</span>
                    <span className="text-xs text-muted-foreground">{campaign.type}</span>
                  </div>
                </CommandItem>
              ))}
              {filteredCampaigns.length > 4 && (
                <CommandItem onSelect={() => navigateToItem('/marketing')}>
                  <span className="text-xs text-muted-foreground">View all {filteredCampaigns.length} campaigns</span>
                </CommandItem>
              )}
            </CommandGroup>
          )}
          
          {filteredActivities.length > 0 && (
            <CommandGroup heading="Activities">
              {filteredActivities.slice(0, 4).map(activity => (
                <CommandItem 
                  key={activity.id} 
                  value={`activity-${activity.id}`}
                  onSelect={() => navigateToItem('/')}
                >
                  <FileText className="mr-2 h-4 w-4 text-primary" />
                  <div className="flex flex-col">
                    <span>{activity.title}</span>
                    <span className="text-xs text-muted-foreground">{activity.description.substring(0, 40)}...</span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
          
          <CommandGroup heading="Pages">
            <CommandItem onSelect={() => navigateToItem('/')}>
              <BarChart className="mr-2 h-4 w-4" />
              Dashboard
            </CommandItem>
            <CommandItem onSelect={() => navigateToItem('/jobs')}>
              <Briefcase className="mr-2 h-4 w-4" />
              Job Listings
            </CommandItem>
            <CommandItem onSelect={() => navigateToItem('/contacts')}>
              <Users className="mr-2 h-4 w-4" />
              Contacts
            </CommandItem>
            <CommandItem onSelect={() => navigateToItem('/marketing')}>
              <Mail className="mr-2 h-4 w-4" />
              Marketing
            </CommandItem>
            <CommandItem onSelect={() => navigateToItem('/analytics')}>
              <BarChart className="mr-2 h-4 w-4" />
              Analytics
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}