"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, WandIcon } from "lucide-react";
import { Snippet } from "@/types/custom";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const OptimizeCodeButton = ({ snippet }: { snippet: Snippet }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [improvements, setImprovements] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleOptimizeCode = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/suggest-improvement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: snippet?.code,
          language: snippet?.language,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get optimization suggestions");
      }

      const data = await response.json();
      setImprovements(data.improvements);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting optimization suggestions:", error);
      setError("Failed to get optimization suggestions");
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        {!improvements && (
          <Button onClick={handleOptimizeCode} variant="default" size="sm">
            <WandIcon className="w-4 h-4 mr-2" />
            Optimize with AI
          </Button>
        )}
        {improvements && (
          <Button
            onClick={handleOptimizeCode}
            variant="default"
            className="bg-blue-500 text-white hover:bg-blue-600"
            size="sm"
          >
            <WandIcon className="w-4 h-4 mr-2" />
            Apply Optimizations
          </Button>
        )}
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 mt-8">
          <Loader2Icon className="w-4 h-4 animate-spin" />
          <p>Thinking...</p>
        </div>
      )}

      {error && <p>{error}</p>}

      {improvements && improvements.length > 0 && (
        <div className="mt-4">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-2xl font-bold my-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-bold my-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-bold my-2">{children}</h3>
                ),
                p: ({ children }) => <p className="my-2">{children}</p>,
                ul: ({ children }) => (
                  <ul className="list-disc ml-6 my-2">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal ml-6 my-2">{children}</ol>
                ),
                li: ({ children }) => <li className="my-1">{children}</li>,
                code: ({ children }) => (
                  <code className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-muted p-4 rounded-lg my-4 overflow-x-auto">
                    {children}
                  </pre>
                ),
                strong: ({ children }) => (
                  <strong className="font-bold">{children}</strong>
                ),
                em: ({ children }) => <em className="italic">{children}</em>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary pl-4 my-4 italic">
                    {children}
                  </blockquote>
                ),
              }}
            >
              {improvements}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizeCodeButton;
