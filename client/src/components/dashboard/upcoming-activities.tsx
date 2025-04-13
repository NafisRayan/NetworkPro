import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity } from '@shared/schema';
import { format } from 'date-fns';

export function UpcomingActivities() {
  const { data: activities, isLoading, error } = useQuery<Activity[]>({
    queryKey: ['/api/activities'],
  });

  const getColorForType = (type: string) => {
    switch (type) {
      case 'Social Media':
        return 'bg-primary bg-opacity-10 text-primary';
      case 'Email':
        return 'bg-secondary bg-opacity-10 text-secondary';
      case 'AI Analysis':
        return 'bg-yellow-100 text-yellow-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatActivityDate = (date: Date) => {
    const activityDate = new Date(date);
    return {
      month: format(activityDate, 'MMM').toUpperCase(),
      day: format(activityDate, 'd')
    };
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>Upcoming Activities</CardTitle>
          <Button variant="link" className="text-primary">
            Schedule
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="text-center py-4">Loading activities...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">Error loading activities</div>
        ) : activities && activities.length > 0 ? (
          activities.map((activity, index) => {
            const { month, day } = formatActivityDate(activity.date);
            return (
              <div key={activity.id} className={`py-3 ${index < activities.length - 1 ? 'border-b' : ''}`}>
                <div className="flex items-start">
                  <div className={`${getColorForType(activity.type)} p-2 rounded text-center min-w-[48px] mr-3`}>
                    <div className="text-xs font-medium">{month}</div>
                    <div className="text-lg font-bold">{day}</div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{activity.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
                    <div className="flex items-center mt-2">
                      <span className="material-icons text-xs text-gray-500 mr-1">schedule</span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4">No upcoming activities</div>
        )}
      </CardContent>
    </Card>
  );
}
