import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MoreHorizontal } from 'lucide-react';
import { Contact } from '@shared/schema';
import { Link } from 'wouter';

export function ContactsWidget() {
  const { data: contacts, isLoading, error } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>Recent Contacts</CardTitle>
          <Link href="/contacts">
            <Button variant="link" className="text-primary">
              View All
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="text-center py-4">Loading contacts...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">Error loading contacts</div>
        ) : contacts && contacts.length > 0 ? (
          contacts.map((contact, index) => (
            <div key={contact.id} className={`flex items-center justify-between py-2 ${index > 0 ? 'border-t' : ''}`}>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  {contact.profileImage ? (
                    <AvatarImage src={contact.profileImage} alt={contact.name} />
                  ) : null}
                  <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-sm">{contact.name}</h3>
                  <p className="text-xs text-gray-500">{contact.jobTitle} at {contact.company}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No contacts found</div>
        )}
      </CardContent>
      <div className="p-4 border-t">
        <Link href="/contacts?action=new">
          <Button variant="secondary" className="w-full">
            Add New Contact
          </Button>
        </Link>
      </div>
    </Card>
  );
}
