import React from 'react';
import { Contact } from '../../types';
import Badge from '../common/Badge';

interface ContactsListProps {
  contacts: Contact[];
  isLoading?: boolean;
}

const ContactsList: React.FC<ContactsListProps> = ({ 
  contacts,
  isLoading = false 
}) => {
  const getCategoryVariant = (category: string) => {
    switch (category) {
      case 'lead': return 'primary';
      case 'client': return 'success';
      case 'partner': return 'secondary';
      default: return 'neutral';
    }
  };
  
  return (
    <div className="overflow-hidden">
      <ul className="divide-y divide-neutral-200">
        {isLoading ? (
          Array(5).fill(0).map((_, index) => (
            <li key={index} className="py-4 animate-pulse">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-neutral-200"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2"></div>
                  <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
                </div>
                <div className="h-6 bg-neutral-200 rounded w-16"></div>
              </div>
            </li>
          ))
        ) : (
          contacts.map((contact) => (
            <li key={contact.id} className="py-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 flex-shrink-0 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-medium uppercase">
                  {contact.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text truncate">{contact.name}</p>
                  <p className="text-xs text-neutral-500 truncate">
                    {contact.position} at {contact.company}
                  </p>
                </div>
                <Badge variant={getCategoryVariant(contact.category)}>
                  {contact.category}
                </Badge>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ContactsList;