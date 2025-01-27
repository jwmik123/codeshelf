"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, WandIcon } from "lucide-react";
import { Snippet } from "@/types/custom";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { toast } from "react-toastify";
import { useCodeStore } from "@/app/stores/codeStore";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const OptimizeCodeButton = ({ snippet }: { snippet: Snippet }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [improvements, setImprovements] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [codeWithImprovements, setCodeWithImprovements] = useState(
    snippet.code
  );
  const [apply, setApply] = useState<string | null>(null);
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

  const handleApply = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/suggest-apply", {
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
      setApply(data.apply);
      setIsLoading(false);
    } catch (error) {
      console.error("Error getting optimization suggestions:", error);
      setError("Failed to get optimization suggestions");
      setIsLoading(false);
    }
  };

  const applyImprovements = async () => {
    setIsApplying(true);
    try {
      const response = await fetch("/api/apply-improvements", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: snippet?.code,
          improvements: improvements,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get optimization suggestions");
      }

      const data = await response.json();

      useCodeStore.getState().setStoredCode(data.codeWithImprovements);

      setCodeWithImprovements(data.codeWithImprovements);
      toast.success("Snippet updated successfully");

      setIsApplying(false);
    } catch (error) {
      console.error("Error getting optimization suggestions:", error);
      toast.error("Failed to get optimization suggestions");
      setIsApplying(false);
    }
  };

  return (
    <div className="w-full mt-10">
      <div className="flex flex-col gap-4">
        {!improvements && (
          <Button onClick={handleOptimizeCode} variant="default" size="sm">
            <WandIcon className="w-4 h-4 mr-2" />
            Optimize with AI
          </Button>
        )}
        {!apply && (
          <Button onClick={handleApply} variant="default" size="sm">
            <WandIcon className="w-4 h-4 mr-2" />
            Suggest where to implement this code
          </Button>
        )}
        {improvements && (
          <Button
            onClick={applyImprovements}
            variant="default"
            className="bg-blue-500 text-white hover:bg-blue-600"
            size="sm"
          >
            <WandIcon className="w-4 h-4 mr-2" />
            Apply Optimizations
            {isApplying && <Loader2Icon className="w-4 h-4 animate-spin" />}
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
                code: ({ className, children, ...props }: any) => {
                  const content = String(children).replace(/\n$/, "");
                  const isInline = !props.node?.position?.start.line;
                  const isShort = content.split(/\s+/).length <= 2;

                  if (isInline || isShort) {
                    return (
                      <code className="bg-muted px-1.5 py-0.5 rounded-md font-mono text-sm">
                        {content}
                      </code>
                    );
                  }

                  return (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={snippet.language}
                      PreTag="div"
                      className="text-sm"
                    >
                      {content}
                    </SyntaxHighlighter>
                  );
                },
                pre: ({ children }) => (
                  <div className=" bg-muted p-4 rounded-lg my-4 overflow-x-auto">
                    {children}
                  </div>
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
      {apply && apply.length > 0 && (
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
              {apply}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizeCodeButton;
