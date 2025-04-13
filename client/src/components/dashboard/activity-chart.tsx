import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export function ActivityChart() {
  const [timeRange, setTimeRange] = useState('7days');

  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/dashboard/network-activity'],
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Networking Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[240px] flex items-center justify-center">
          <p>Loading chart data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Networking Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[240px] flex items-center justify-center">
          <p>Error loading chart data</p>
        </CardContent>
      </Card>
    );
  }

  const totals = data.reduce(
    (acc: { connections: number; messages: number; profile_views: number }, item: any) => {
      acc.connections += item.connections;
      acc.messages += item.messages;
      acc.profile_views += item.profile_views;
      return acc;
    },
    { connections: 0, messages: 0, profile_views: 0 }
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle>Networking Activity</CardTitle>
          <div className="flex space-x-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[140px] h-8 text-sm">
                <SelectValue placeholder="Select Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="3months">Last 3 months</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 5, left: -25, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{fontSize: 12}}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getMonth()+1}/${date.getDate()}`;
                }}
              />
              <YAxis tick={{fontSize: 12}} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="connections"
                stroke="#0077B5"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="messages"
                stroke="#2867B2"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="profile_views"
                stroke="#00A36C"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <p className="text-gray-500 text-sm">Connections</p>
            <p className="font-semibold">{totals.connections}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Messages</p>
            <p className="font-semibold">{totals.messages}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-sm">Profile Views</p>
            <p className="font-semibold">{totals.profile_views}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
