import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Insight } from '@shared/schema';
import { Link } from 'wouter';

export function GeminiInsights() {
  const { data: insights, isLoading, error } = useQuery<Insight[]>({
    queryKey: ['/api/insights'],
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'network':
        return 'smart_toy';
      case 'content':
        return 'trending_up';
      case 'job':
        return 'work';
      default:
        return 'insights';
    }
  };

  const getBgClassForType = (type: string) => {
    switch (type) {
      case 'network':
        return 'bg-primary bg-opacity-5 border border-primary border-opacity-20';
      case 'content':
        return 'bg-emerald-50 border border-emerald-200';
      case 'job':
        return 'bg-gray-100 border border-gray-200';
      default:
        return 'bg-blue-50 border border-blue-200';
    }
  };

  const getIconBgClassForType = (type: string) => {
    switch (type) {
      case 'network':
        return 'bg-primary bg-opacity-10 text-primary';
      case 'content':
        return 'bg-emerald-100 text-emerald-600';
      case 'job':
        return 'bg-gray-200 text-gray-500';
      default:
        return 'bg-blue-100 text-blue-500';
    }
  };

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex justify-between items-center">
          <CardTitle>Gemini AI Insights</CardTitle>
          <Button variant="link" className="text-primary">
            Configure
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="text-center py-4">Loading insights...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">Error loading insights</div>
        ) : insights && insights.length > 0 ? (
          insights.map((insight, index) => (
            <div 
              key={insight.id} 
              className={`${getBgClassForType(insight.type)} rounded-lg p-4 mb-4 last:mb-0`}
            >
              <div className="flex space-x-3">
                <div className={`${getIconBgClassForType(insight.type)} p-2 rounded-full h-fit`}>
                  <span className="material-icons">{getIconForType(insight.type)}</span>
                </div>
                <div>
                  <h3 className="font-medium text-sm">{insight.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                  <Link href={insight.actionLink || "#"}>
                    <Button variant="link" className="mt-2 p-0 h-auto text-xs text-primary">
                      {insight.actionText}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No insights available</div>
        )}
      </CardContent>
    </Card>
  );
}
