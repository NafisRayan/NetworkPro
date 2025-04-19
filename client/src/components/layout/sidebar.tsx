import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { User } from '@shared/schema';
import { useQuery } from '@tanstack/react-query';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Mail, 
  BarChart, 
  BrainCircuit, 
  Settings,
  LucideIcon
} from 'lucide-react';

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

function NavItem({ href, icon, label, isActive }: NavItemProps) {
  return (
    <Link href={href}>
      <div 
        className={`block px-4 py-2 cursor-pointer ${
          isActive 
            ? 'bg-primary/15 border-l-4 border-primary' 
            : 'hover:bg-gray-100 border-l-4 border-transparent'
        }`}
      >
        <div className="flex items-center">
          <div className={`mr-3 ${isActive ? 'text-primary' : 'text-gray-600'}`}>
            {icon}
          </div>
          <span className={isActive ? 'font-medium text-primary' : 'text-gray-700'}>
            {label}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function Sidebar({ className = "w-64 bg-white shadow-lg hidden md:flex md:flex-col h-screen" }: { className?: string }) {
  const [location] = useLocation();
  
  const { data: user } = useQuery<User>({
    queryKey: ['/api/users/current'],
  });

  const navItems = [
    { href: '/', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { href: '/jobs', icon: <Briefcase size={18} />, label: 'Job Listings' },
    { href: '/contacts', icon: <Users size={18} />, label: 'Contacts' },
    { href: '/marketing', icon: <Mail size={18} />, label: 'Marketing' },
    { href: '/analytics', icon: <BarChart size={18} />, label: 'Analytics' },
  ];

  const toolItems = [
    { href: '/gemini', icon: <BrainCircuit size={18} />, label: 'Gemini AI' },
    { href: '/settings', icon: <Settings size={18} />, label: 'Settings' },
  ];

  // Function to get initials from name
  const getInitials = (name: string = '') => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={className}>
      <div className="p-4 border-b border-gray-200">
        <h1 className="font-bold text-2xl text-primary">NexusAI</h1>
        <p className="text-sm text-gray-500">Networking Automation</p>
      </div>
      
      <div className="py-4 flex-grow overflow-y-auto">
        <div className="px-4 py-2">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Main</p>
        </div>
        
        {navItems.map((item) => (
          <NavItem 
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={location === item.href}
          />
        ))}
        
        <div className="px-4 py-2 mt-4">
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Tools</p>
        </div>
        
        {toolItems.map((item) => (
          <NavItem 
            key={item.href}
            href={item.href}
            icon={item.icon}
            label={item.label}
            isActive={location === item.href}
          />
        ))}
      </div>
      
      {user && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              {user.profileImage ? (
                <AvatarImage src={user.profileImage} alt={user.fullName} />
              ) : null}
              <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{user.fullName}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
