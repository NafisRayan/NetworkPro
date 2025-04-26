import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Megaphone, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  MapPin
} from 'lucide-react';
import { NavItem } from '../../types';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Job Listings', path: '/jobs', icon: Briefcase },
    { name: 'Contacts', path: '/contacts', icon: Users },
    { name: 'Marketing', path: '/marketing', icon: Megaphone },
    { name: 'Analytics', path: '/analytics', icon: BarChart3 },
    { name: 'Discover', path: '/discover', icon: MapPin },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  const sidebarClasses = isMobile
    ? `fixed inset-y-0 left-0 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64 bg-white border-r border-neutral-200 transition-transform duration-300 ease-in-out z-30`
    : 'w-64 bg-white border-r border-neutral-200 h-screen sticky top-0';

  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}
      <aside className={sidebarClasses}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-neutral-200">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-primary-500 flex items-center justify-center text-white mr-2">
              <span className="font-bold text-lg">N</span>
            </div>
            <h1 className="text-xl font-bold text-text">NetworAI</h1>
          </div>
          {isMobile && (
            <button onClick={toggleSidebar} className="p-1">
              <X size={20} className="text-text" />
            </button>
          )}
        </div>
        <nav className="py-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary-500 bg-primary-50 border-r-4 border-primary-500'
                        : 'text-text hover:bg-neutral-50'
                    }`}
                  >
                    <Icon size={18} className={`mr-3 ${isActive ? 'text-primary-500' : 'text-neutral-500'}`} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="absolute bottom-0 w-full border-t border-neutral-200">
          <button className="flex items-center w-full px-4 py-3 text-sm font-medium text-text hover:bg-neutral-50 transition-colors">
            <LogOut size={18} className="mr-3 text-neutral-500" />
            Logout
          </button>
        </div>
      </aside>
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className={`fixed bottom-4 right-4 z-10 p-3 bg-primary-500 text-white rounded-full shadow-lg ${
            isOpen ? 'hidden' : 'block'
          }`}
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;