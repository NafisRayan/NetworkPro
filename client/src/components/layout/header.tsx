import { Button } from '@/components/ui/button';
import { Plus, Bell } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { User } from '@shared/schema';
import { GlobalSearch } from '@/components/search/global-search';

interface HeaderProps {
  openMobileMenu: () => void;
}

export function Header({ openMobileMenu }: HeaderProps) {
  const { data: user } = useQuery<User>({
    queryKey: ['/api/users/current'],
  });

  const firstName = user?.fullName.split(' ')[0] || 'User';

  return (
    <header className="bg-white p-4 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
        <div>
          <h1 className="font-bold text-2xl text-[#283E4A]">Welcome back, {firstName}</h1>
          <p className="text-gray-500">Here's what's happening with your network today</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-2">
          <Button className="bg-[#2867B2] hover:bg-[#2867B2]/90">
            <Plus className="h-4 w-4 mr-2" />
            New Campaign
          </Button>
          <Button variant="outline" size="icon" className="bg-[#F5F5F5] border-0">
            <Bell className="h-5 w-5 text-[#283E4A]" />
          </Button>
        </div>
      </div>
      
      {/* Global Search */}
      <div className="w-full mt-4 md:mt-0">
        <GlobalSearch />
      </div>
    </header>
  );
}
