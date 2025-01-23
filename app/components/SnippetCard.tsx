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

interface SnippetCardProps {
  snippet: Snippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(snippet.likes || 0);
  const router = useRouter();
  const handleCopy = async (): Promise<void> => {
    await navigator.clipboard.writeText(snippet.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleLike = () => {
    setLikes((prev) => prev + 1);
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
        <Button onClick={handleLike} variant="ghost" size="sm">
          <HeartIcon className="w-4 h-4" />
        </Button>
        <div className="text-sm text-muted-foreground">
          {likes} {likes === 1 ? "like" : "likes"}
        </div>
      </CardFooter>
    </Card>
  );
}
