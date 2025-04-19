import { Sidebar } from "@/components/layout/sidebar"; // Added import
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Campaign } from "@shared/schema";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { generateContent } from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";
import {
  Plus,
  Calendar,
  Users,
  BarChart,
  Mail,
  MessageSquare,
  Linkedin,
  Twitter,
  Play,
  Pause,
  MoreHorizontal,
  Type,
  Wand2
} from "lucide-react";
import { format } from "date-fns";

export default function Marketing() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("campaigns");
  const [generatingContent, setGeneratingContent] = useState(false);
  const [contentType, setContentType] = useState<"email" | "social" | "blog">("social");
  const [contentPrompt, setContentPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");

  const { toast } = useToast();

  const { data: campaigns, isLoading } = useQuery<Campaign[]>({
    queryKey: ['/api/campaigns'],
  });

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleGenerateContent = async () => {
    if (!contentPrompt.trim()) {
      toast({
        title: "Empty Prompt",
        description: "Please enter a prompt for content generation",
        variant: "destructive"
      });
      return;
    }

    setGeneratingContent(true);
    try {
      const content = await generateContent(contentPrompt, contentType);
      setGeneratedContent(content);
      toast({
        title: "Content Generated",
        description: "AI has successfully generated your content",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGeneratingContent(false);
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const campaignDate = new Date(date);

    // For future dates
    if (campaignDate > now) {
      return `Scheduled for ${format(campaignDate, 'MMM d, yyyy')}`;
    }

    // For past dates
    return `Started on ${format(campaignDate, 'MMM d, yyyy')}`;
  };

  const getCampaignIcon = (type: string) => {
    if (type.includes("Email")) return <Mail className="h-5 w-5" />;
    if (type.includes("LinkedIn")) return <Linkedin className="h-5 w-5" />;
    if (type.includes("Twitter")) return <Twitter className="h-5 w-5" />;
    return <MessageSquare className="h-5 w-5" />;
  };

  return (
    // Added wrapper div from original Layout
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col md:flex-row">
      {/* Mobile top bar from original Layout */}
      <div className="md:hidden">
        <MobileSidebar />
      </div>
      {/* Sidebar for desktop from original Layout */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      {/* Main content wrapper from original Layout */}
      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-2 md:px-8 py-4 md:py-8">
        {/* Header component kept inside main */}
        <Header openMobileMenu={toggleMobileSidebar} />

        {/* Original page content starts here */}
        <div className="p-4 md:p-6"> {/* Removed padding from original outer div, kept inner padding */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#283E4A] mb-2">Marketing Automation</h1>
            <p className="text-gray-500">Create, manage, and analyze your marketing campaigns</p>
          </div>

          <Tabs defaultValue="campaigns" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
                <TabsTrigger value="content">AI Content Generator</TabsTrigger>
                <TabsTrigger value="analytics">Campaign Analytics</TabsTrigger>
              </TabsList>

              {activeTab === "campaigns" && (
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  New Campaign
                </Button>
              )}
            </div>

            <TabsContent value="campaigns" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Campaigns</CardTitle>
                  <CardDescription>Campaigns currently in progress</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">Loading campaigns...</div>
                  ) : campaigns && campaigns.filter(c => c.status === 'Active').length > 0 ? (
                    <div className="space-y-4">
                      {campaigns
                        .filter(campaign => campaign.status === 'Active')
                        .map(campaign => (
                          <div key={campaign.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <div className="mr-3 bg-primary bg-opacity-10 p-2 rounded-full">
                                    {getCampaignIcon(campaign.type)}
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-lg">{campaign.name}</h3>
                                    <p className="text-sm text-gray-500">{campaign.type}</p>
                                  </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                                    <span>{campaign.contacts} contacts</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                    <span>{formatDate(campaign.startDate!)}</span>
                                  </div>
                                  <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-0">
                                    {campaign.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                  <Pause className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium">{campaign.progress}%</span>
                              </div>
                              <Progress value={campaign.progress} className="h-2" />
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No active campaigns</div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Campaigns</CardTitle>
                  <CardDescription>Upcoming marketing campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="text-center py-8">Loading scheduled campaigns...</div>
                  ) : campaigns && campaigns.filter(c => c.status === 'Scheduled').length > 0 ? (
                    <div className="space-y-4">
                      {campaigns
                        .filter(campaign => campaign.status === 'Scheduled')
                        .map(campaign => (
                          <div key={campaign.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center">
                                  <div className="mr-3 bg-gray-100 p-2 rounded-full">
                                    {getCampaignIcon(campaign.type)}
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-lg">{campaign.name}</h3>
                                    <p className="text-sm text-gray-500">{campaign.type}</p>
                                  </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-3">
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Users className="h-4 w-4 mr-1 text-gray-400" />
                                    <span>{campaign.contacts} contacts</span>
                                  </div>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                                    <span>{formatDate(campaign.startDate!)}</span>
                                  </div>
                                  <Badge variant="outline" className="bg-gray-100 text-gray-600 border-0">
                                    {campaign.status}
                                  </Badge>
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="icon">
                                  <Play className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            <div className="mt-4">
                              <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-medium">{campaign.progress}%</span>
                              </div>
                              <Progress value={campaign.progress} className="h-2" />
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">No scheduled campaigns</div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Content Generator</CardTitle>
                  <CardDescription>Create marketing content with Gemini AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      variant={contentType === "social" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setContentType("social")}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Social Media Post
                    </Button>
                    <Button
                      variant={contentType === "email" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setContentType("email")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email Content
                    </Button>
                    <Button
                      variant={contentType === "blog" ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setContentType("blog")}
                    >
                      <Type className="mr-2 h-4 w-4" />
                      Blog Post
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium">Prompt</label>
                      <span className="text-xs text-gray-500">What do you want to create?</span>
                    </div>
                    <Textarea
                      placeholder="e.g., Write a LinkedIn post about our new AI product launch targeting marketing professionals"
                      value={contentPrompt}
                      onChange={(e) => setContentPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <Button
                    onClick={handleGenerateContent}
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={generatingContent || !contentPrompt.trim()}
                  >
                    <Wand2 className="mr-2 h-4 w-4" />
                    {generatingContent ? "Generating..." : "Generate Content"}
                  </Button>

                  {generatedContent && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Generated Content</label>
                      <div className="border rounded-md p-4 bg-gray-50">
                        <p className="whitespace-pre-line">{generatedContent}</p>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="default" size="sm">Use in Campaign</Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Analytics</CardTitle>
                  <CardDescription>Performance metrics for your campaigns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 space-y-4">
                    <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Campaign analytics will be displayed here. You can track engagement, conversions, and ROI for your marketing efforts.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        {/* Original page content ends here */}
      </main>
    </div>
  );
}
