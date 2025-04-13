import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Campaign } from '@shared/schema';

export function MarketingCampaigns() {
  const { data: campaigns, isLoading, error } = useQuery<Campaign[]>({
    queryKey: ['/api/campaigns'],
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const campaignDate = new Date(date);
    
    // For future dates
    if (campaignDate > now) {
      const days = Math.ceil((campaignDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return `Starts in ${days} day${days !== 1 ? 's' : ''}`;
    }
    
    // For past dates
    const days = Math.ceil((now.getTime() - campaignDate.getTime()) / (1000 * 60 * 60 * 24));
    return `Started ${days} day${days !== 1 ? 's' : ''} ago`;
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Marketing Campaigns</CardTitle>
            <CardDescription className="mt-1">
              Track and manage your automated marketing campaigns
            </CardDescription>
          </div>
          <Button variant="link" className="text-primary">
            Create New
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-4">Loading campaigns...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-500">Error loading campaigns</div>
          ) : campaigns && campaigns.length > 0 ? (
            campaigns.map((campaign) => (
              <div key={campaign.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{campaign.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{campaign.type}</p>
                    <div className="mt-3 flex items-center space-x-3">
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="material-icons text-xs mr-1">person</span>
                        <span>{campaign.contacts} contacts</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="material-icons text-xs mr-1">schedule</span>
                        <span>{formatDate(campaign.startDate!)}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                      campaign.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span>{campaign.status}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{campaign.progress}%</span>
                  </div>
                  <Progress value={campaign.progress} className="h-2" />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4">No marketing campaigns found</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
