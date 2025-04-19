import { Sidebar } from "@/components/layout/sidebar"; // Added import
import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { Header } from "@/components/layout/header";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { analyzeWithGemini, generateContent, generateInsights, AnalysisResponse } from "@/lib/gemini";
import {
  BrainCircuit,
  SendHorizonal,
  FileText,
  BarChart,
  Users,
  FlaskConical,
  Briefcase,
  Lightbulb,
  RefreshCw,
  ChevronRight
} from "lucide-react";

export default function Gemini() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [activeTab, setActiveTab] = useState("assistant");
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [analysisType, setAnalysisType] = useState<"network" | "content" | "job" | "general">("general");

  const { toast } = useToast();

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  const handleSubmitPrompt = async () => {
    if (!promptInput.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a prompt before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await analyzeWithGemini({
        text: promptInput,
        type: analysisType
      });

      setAnalysisResult(result);
      toast({
        title: "Analysis complete",
        description: "Gemini AI has analyzed your prompt",
      });
    } catch (error) {
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your prompt",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearPrompt = () => {
    setPromptInput("");
    setAnalysisResult(null);
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
            <h1 className="text-2xl font-bold text-[#283E4A] mb-2">Gemini AI Tools</h1>
            <p className="text-gray-500">Leverage AI to enhance your professional networking and marketing activities</p>
          </div>

          <Tabs defaultValue="assistant" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="assistant">AI Assistant</TabsTrigger>
              <TabsTrigger value="content">Content Generator</TabsTrigger>
              <TabsTrigger value="analyzer">Data Analyzer</TabsTrigger>
            </TabsList>

            <TabsContent value="assistant" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-primary" />
                    Gemini AI Assistant
                  </CardTitle>
                  <CardDescription>
                    Ask questions or get assistance with your professional networking activities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button
                      variant={analysisType === "network" ? "default" : "outline"}
                      onClick={() => setAnalysisType("network")}
                      className="justify-start"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Network
                    </Button>
                    <Button
                      variant={analysisType === "content" ? "default" : "outline"}
                      onClick={() => setAnalysisType("content")}
                      className="justify-start"
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Content
                    </Button>
                    <Button
                      variant={analysisType === "job" ? "default" : "outline"}
                      onClick={() => setAnalysisType("job")}
                      className="justify-start"
                    >
                      <Briefcase className="mr-2 h-4 w-4" />
                      Job
                    </Button>
                    <Button
                      variant={analysisType === "general" ? "default" : "outline"}
                      onClick={() => setAnalysisType("general")}
                      className="justify-start"
                    >
                      <Lightbulb className="mr-2 h-4 w-4" />
                      General
                    </Button>
                  </div>

                  <div className="relative">
                    <Textarea
                      placeholder="Type your question or prompt here..."
                      className="min-h-[150px] pr-12"
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                    />
                    <Button
                      size="icon"
                      className="absolute bottom-3 right-3"
                      onClick={handleSubmitPrompt}
                      disabled={isLoading || !promptInput.trim()}
                    >
                      <SendHorizonal className="h-4 w-4" />
                    </Button>
                  </div>

                  {analysisResult && (
                    <Card className="bg-primary/5 border border-primary/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Analysis Results</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{analysisResult.analysis}</p>

                        {analysisResult.recommendations && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Recommendations:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {analysisResult.recommendations.map((rec, idx) => (
                                <li key={idx}>{rec}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {analysisResult.topics && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Suggested Topics:</h4>
                            <div className="flex flex-wrap gap-2">
                              {analysisResult.topics.map((topic, idx) => (
                                <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded-full text-sm">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {analysisResult.strengths && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Strengths:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {analysisResult.strengths.map((strength, idx) => (
                                <li key={idx}>{strength}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {analysisResult.improvements && (
                          <div className="mb-4">
                            <h4 className="font-semibold mb-2">Areas for Improvement:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {analysisResult.improvements.map((item, idx) => (
                                <li key={idx}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {analysisResult.insights && (
                          <div className="mb-2">
                            <h4 className="font-semibold mb-2">Insights:</h4>
                            <p>{analysisResult.insights}</p>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-end pt-0">
                        <Button variant="outline" size="sm" onClick={handleClearPrompt}>
                          <RefreshCw className="mr-2 h-3 w-3" />
                          Start New Analysis
                        </Button>
                      </CardFooter>
                    </Card>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Network Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Analyze your professional network to identify growth opportunities and connection strategies.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Example prompt:</span>
                      </div>
                      <div className="text-sm bg-gray-50 p-3 rounded-md italic">
                        "Analyze my current network and suggest strategies to connect with more professionals in the tech industry"
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="link"
                      className="px-0 text-primary"
                      onClick={() => {
                        setAnalysisType("network");
                        setPromptInput("Analyze my current network and suggest strategies to connect with more professionals in the tech industry");
                      }}
                    >
                      Use this prompt
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Content Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Get suggestions for improving your professional content and optimizing engagement.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Example prompt:</span>
                      </div>
                      <div className="text-sm bg-gray-50 p-3 rounded-md italic">
                        "Analyze my recent LinkedIn posts and suggest ways to improve engagement and reach"
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="link"
                      className="px-0 text-primary"
                      onClick={() => {
                        setAnalysisType("content");
                        setPromptInput("Analyze my recent LinkedIn posts and suggest ways to improve engagement and reach");
                      }}
                    >
                      Use this prompt
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Job Match Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm mb-4">
                      Analyze your skills and experience to identify job opportunities that match your profile.
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Example prompt:</span>
                      </div>
                      <div className="text-sm bg-gray-50 p-3 rounded-md italic">
                        "Analyze my skills and suggest what job roles would be the best match for my experience"
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="link"
                      className="px-0 text-primary"
                      onClick={() => {
                        setAnalysisType("job");
                        setPromptInput("Analyze my skills and suggest what job roles would be the best match for my experience");
                      }}
                    >
                      Use this prompt
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Content Generator
                  </CardTitle>
                  <CardDescription>
                    Create professional marketing content for various platforms
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 space-y-4">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="text-lg font-medium">AI Content Generation</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      The content generator allows you to create professional marketing copy, social media posts, and other content using AI.
                    </p>
                    <Button onClick={() => setActiveTab("assistant")}>
                      Switch to AI Assistant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analyzer" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    Data Analyzer
                  </CardTitle>
                  <CardDescription>
                    Analyze your professional data for insights and trends
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 space-y-4">
                    <BarChart className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="text-lg font-medium">AI Data Analysis</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      The data analyzer allows you to get AI-powered insights from your networking and marketing data.
                    </p>
                    <Button onClick={() => setActiveTab("assistant")}>
                      Switch to AI Assistant
                    </Button>
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
