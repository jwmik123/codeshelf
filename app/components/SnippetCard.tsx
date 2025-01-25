"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeMirror from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { materialDark } from "@uiw/codemirror-theme-material";
import { CopyCheck, CopyIcon, HeartIcon } from "lucide-react";
import { Snippet } from "@/types/custom";
import { likeSnippet } from "../snippets/actions";

interface SnippetCardProps {
  snippet: Snippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [currentLikes, setCurrentLikes] = useState(snippet.likes);
  const [isLiking, setIsLiking] = useState(false);
  const [likeError, setLikeError] = useState<string | null>(null);
  const [hasUserLiked, setHasUserLiked] = useState(snippet.hasLiked);

  const router = useRouter();
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(snippet.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLike = async () => {
    if (isLiking) return;

    try {
      setIsLiking(true);
      setLikeError(null);

      // Optimistic update
      setCurrentLikes((prev) => (prev ?? 0) + 1);

      const updatedSnippet = await likeSnippet(snippet.id);

      // Update with actual value from server
      if (updatedSnippet) {
        setCurrentLikes(updatedSnippet.likes);
        setHasUserLiked(updatedSnippet.hasLiked);
      }
    } catch (error) {
      // Revert optimistic update on error
      setCurrentLikes((prev) => (prev ?? 0) - 1);
      setHasUserLiked(false);
      setLikeError("Failed to like snippet");
      console.error("Like error:", error);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <Card>
      <CardHeader
        onClick={() => router.push(`/snippets/${snippet.id}`)}
        className="cursor-pointer group"
      >
        <CardTitle className="text-lg group-hover:underline">
          {snippet.title}
        </CardTitle>
        <CardDescription>{snippet.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <div>Language: {snippet.language}</div>
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2"
            onClick={handleCopy}
          >
            {isCopied ? <CopyCheck /> : <CopyIcon className="w-4 h-4" />}
          </Button>
        </div>
        <div className="relative">
          <pre className="bg-muted rounded-md overflow-scroll transition-all duration-200 max-h-64">
            <CodeMirror
              value={snippet.code}
              theme={materialDark}
              extensions={[langs[snippet.language as keyof typeof langs]()]}
              editable={false}
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: false,
              }}
            />
          </pre>
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2">
        <Button
          onClick={handleLike}
          disabled={isLiking}
          variant="ghost"
          size="sm"
          className={`
            relative transition-all duration-200
            ${isLiking ? "opacity-50" : "hover:bg-primary/10"}
          `}
        >
          <HeartIcon
            className={`w-4 h-4 ${isLiking ? "animate-pulse" : ""} ${
              hasUserLiked ? "fill-red-500 stroke-red-500" : ""
            }`}
          />
          {isLiking && (
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          )}
        </Button>
        <div className="text-sm text-muted-foreground">
          {currentLikes} {currentLikes === 1 ? "like" : "likes"}
        </div>
      </CardFooter>
    </Card>
  );
}
