import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, Mail, Phone, Download, Inbox } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { Contact } from '../types';
import { mockContacts } from '../data/mockData';

const Contacts: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filters, setFilters] = useState({
    category: 'all',
  });

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setContacts(mockContacts);
      setIsLoading(false);
    };
    
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact => {
    if (filters.category === 'all') return true;
    return contact.category === filters.category;
  });

  const getCategoryVariant = (category: string) => {
    switch (category) {
      case 'lead': return 'primary';
      case 'client': return 'success';
      case 'partner': return 'secondary';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Contacts</h1>
          <p className="text-neutral-500">Manage your professional network and categorize contacts.</p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="md"
            icon={<Download size={16} />}
          >
            Import
          </Button>
          <Button 
            variant="primary" 
            size="md"
            icon={<Plus size={16} />}
          >
            Add Contact
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts by name, company, or position..."
              className="w-full px-4 py-2 pr-10 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search size={18} className="absolute right-3 top-2.5 text-neutral-400" />
          </div>
        </div>
        <div className="flex space-x-2">
          <div className="flex-grow relative">
            <select
              className="w-full appearance-none px-4 py-2 pr-10 border border-neutral-200 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="lead">Leads</option>
              <option value="client">Clients</option>
              <option value="partner">Partners</option>
              <option value="other">Others</option>
            </select>
            <Filter size={18} className="absolute right-3 top-2.5 text-neutral-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Contacts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading ? (
          Array(6).fill(0).map((_, index) => (
            <div key={index} className="animate-pulse border border-neutral-200 rounded-lg p-4 bg-white">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-neutral-200 h-12 w-12"></div>
                <div className="flex-1">
                  <div className="h-4 bg-neutral-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 bg-neutral-200 rounded w-full"></div>
                <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-200">
                <div className="flex justify-between">
                  <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
                  <div className="h-8 bg-neutral-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          filteredContacts.map((contact) => (
            <div key={contact.id} className="border border-neutral-200 rounded-lg p-4 hover:shadow-sm transition-shadow bg-white">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium text-lg uppercase">
                  {contact.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-text">{contact.name}</h3>
                  <p className="text-sm text-neutral-600">{contact.position}</p>
                </div>
              </div>
              
              <div className="mt-3 space-y-2">
                <p className="text-sm text-neutral-600 flex items-center">
                  <Inbox size={14} className="mr-2 text-neutral-400" />
                  {contact.company}
                </p>
                <p className="text-sm text-neutral-600 flex items-center">
                  <Mail size={14} className="mr-2 text-neutral-400" />
                  {contact.email}
                </p>
                {contact.phone && (
                  <p className="text-sm text-neutral-600 flex items-center">
                    <Phone size={14} className="mr-2 text-neutral-400" />
                    {contact.phone}
                  </p>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t border-neutral-200 flex justify-between items-center">
                <Badge variant={getCategoryVariant(contact.category)}>
                  {contact.category}
                </Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Mail size={14} />
                  </Button>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Contacts;