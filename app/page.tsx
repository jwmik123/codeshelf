"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  BookMarked,
  Code,
  Home,
  LogOut,
  Plus,
  Search,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface AIExplanation {
  title: string;
  labels: string[];
  description: string;
  implementationSuggestions: string[];
  improvementSuggestions: string[];
}

export default function Dashboard() {
  const [newSnippet, setNewSnippet] = useState("");
  const [snippetLanguage, setSnippetLanguage] = useState("javascript");
  const [snippetLabel, setSnippetLabel] = useState("");
  const [customLabel, setCustomLabel] = useState("");
  const [aiExplanation, setAiExplanation] = useState<AIExplanation | null>(
    null
  );
  const { theme, setTheme } = useTheme();

  const handleAddSnippet = () => {
    // Here you would typically send the new snippet to your backend
    console.log(
      "New snippet:",
      newSnippet,
      "Language:",
      snippetLanguage,
      "Label:",
      snippetLabel || customLabel
    );
    setNewSnippet("");
    setSnippetLanguage("javascript");
    setSnippetLabel("");
    setCustomLabel("");
    setAiExplanation(null);
  };

  const handleGenerateExplanation = () => {
    // Simulate AI generating an explanation
    setAiExplanation({
      title: "Factorial Function",
      labels: ["Recursion", "Mathematics", "Algorithm"],
      description:
        "This code snippet implements a recursive function to calculate the factorial of a given number. It efficiently handles edge cases such as negative numbers and zero.",
      implementationSuggestions: [
        "Consider adding input validation to ensure the input is a non-negative integer.",
        "For large numbers, consider using BigInt to avoid integer overflow.",
        "Add comments to explain the recursive logic for better readability.",
      ],
      improvementSuggestions: [
        "Implement an iterative version for comparison of performance.",
        "Add memoization to improve performance for repeated calculations.",
        "Consider adding a tail-recursive implementation for languages that support it.",
      ],
    });
  };

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "system";
    setTheme(currentTheme);
  }, [setTheme]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border">
        <div className="p-4">
          <h1 className="text-2xl font-bold">CodeShelf AI</h1>
        </div>
        <nav className="mt-4">
          <a
            href="#"
            className="flex items-center px-4 py-2 text-primary bg-accent"
          >
            <Home className="mr-3 h-5 w-5" />
            Dashboard
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-1 text-muted-foreground hover:bg-accent hover:text-primary"
          >
            <BookMarked className="mr-3 h-5 w-5" />
            Discover
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-1 text-muted-foreground hover:bg-accent hover:text-primary"
          >
            <Code className="mr-3 h-5 w-5" />
            My Snippets
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-1 text-muted-foreground hover:bg-accent hover:text-primary"
          >
            <Users className="mr-3 h-5 w-5" />
            Account
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-1 text-muted-foreground hover:bg-accent hover:text-primary"
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-2 mt-1 text-muted-foreground hover:bg-accent hover:text-primary"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </a>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Dashboard</h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search snippets..." className="pl-8 w-64" />
              </div>
              <Select
                value={theme}
                onValueChange={(value) => {
                  setTheme(value);
                  localStorage.setItem("theme", value);
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Add new snippet with AI explanation */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Add New Snippet</CardTitle>
                <CardDescription>
                  Paste your code and add a label
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="snippet">Code Snippet</Label>
                    <div className="relative">
                      <SyntaxHighlighter
                        language={snippetLanguage}
                        style={vscDarkPlus}
                        showLineNumbers={true}
                        customStyle={{
                          margin: 0,
                          padding: "1rem",
                          borderRadius: "0.375rem",
                          fontSize: "0.875rem",
                          lineHeight: "1.25rem",
                        }}
                      >
                        {newSnippet || "// Paste your code here..."}
                      </SyntaxHighlighter>
                      <textarea
                        id="snippet"
                        value={newSnippet}
                        onChange={(e) => setNewSnippet(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-text resize-none"
                        placeholder="Paste your code here..."
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={snippetLanguage}
                      onValueChange={setSnippetLanguage}
                    >
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="csharp">C#</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="ruby">Ruby</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="php">PHP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="label">Label</Label>
                    <Select
                      value={snippetLabel}
                      onValueChange={setSnippetLabel}
                    >
                      <SelectTrigger id="label">
                        <SelectValue placeholder="Select or create a label" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="algorithm">Algorithm</SelectItem>
                        <SelectItem value="datastructure">
                          Data Structure
                        </SelectItem>
                        <SelectItem value="utility">
                          Utility Function
                        </SelectItem>
                        <SelectItem value="component">UI Component</SelectItem>
                        <SelectItem value="api">API Integration</SelectItem>
                        <SelectItem value="custom">
                          Create custom label
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {snippetLabel === "custom" && (
                    <div className="space-y-2">
                      <Label htmlFor="customLabel">Custom Label</Label>
                      <Input
                        id="customLabel"
                        placeholder="Enter custom label"
                        value={customLabel}
                        onChange={(e) => setCustomLabel(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddSnippet}>
                  <Plus className="mr-2 h-4 w-4" /> Add Snippet
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Explanation</CardTitle>
                <CardDescription>
                  Get an AI-generated analysis of your code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  {aiExplanation ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {aiExplanation.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {aiExplanation.labels.map((label, index) => (
                            <Badge key={index} variant="secondary">
                              {label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Description</h4>
                        <p className="text-sm">{aiExplanation.description}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Implementation Suggestions
                        </h4>
                        <ul className="list-disc list-inside text-sm">
                          {aiExplanation.implementationSuggestions.map(
                            (suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            )
                          )}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          Improvement Suggestions
                        </h4>
                        <ul className="list-disc list-inside text-sm">
                          {aiExplanation.improvementSuggestions.map(
                            (suggestion, index) => (
                              <li key={index}>{suggestion}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Click &quot;Generate Explanation&quot; to analyze your
                      code.
                    </p>
                  )}
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerateExplanation}
                  disabled={!newSnippet}
                >
                  <Zap className="mr-2 h-4 w-4" /> Generate Explanation
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Recent snippets grid */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Recent Snippets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>Snippet {i}</CardTitle>
                    <CardDescription>JavaScript</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-2 rounded">
                      <code>
                        console.log(&quot;Hello, CodeShelf AI!&quot;);
                      </code>
                    </pre>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Activity feed */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px]">
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>U{i}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium">
                          User {i} added a new snippet
                        </p>
                        <p className="text-sm text-muted-foreground">
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
