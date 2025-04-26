import React from 'react';
import { Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white border-b border-neutral-200 h-16">
      <div className="px-4 h-full flex items-center justify-between">
        <h1 className="text-xl font-bold text-text">{title}</h1>
        
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 px-4 py-2 pr-10 text-sm border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-neutral-400" />
          </div>
          
          <button className="relative p-2 text-neutral-500 hover:text-primary-500 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center overflow-hidden">
              <User size={16} className="text-neutral-500" />
            </div>
            <span className="text-sm font-medium text-text hidden md:inline-block">John Doe</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;