"use client";

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
import { CopyCheck, CopyIcon } from "lucide-react";
import { Snippet } from "@/types/custom";
import { useState } from "react";

export function SnippetCard({ snippet }: { snippet: Snippet }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet.code);
    setIsCopied(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{snippet.title}</CardTitle>
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
          <pre
            className={`bg-muted rounded-md overflow-scroll transition-all duration-200 max-h-64`}
          >
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
      <CardFooter></CardFooter>
    </Card>
  );
}
