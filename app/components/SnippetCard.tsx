import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { langs } from "@uiw/codemirror-extensions-langs";
import { materialDark } from "@uiw/codemirror-theme-material";
import { CopyIcon } from "lucide-react";
interface SnippetCardProps {
  title: string;
  description: string;
  language: string;
  preview: string;
}

export function SnippetCard({
  title,
  description,
  language,
  preview,
}: SnippetCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
          <div>Language: {language}</div>
          <Button variant="ghost" size="sm" className="h-6 px-2">
            <CopyIcon className="w-4 h-4" />
          </Button>
        </div>
        <pre className="bg-muted p-2 rounded-md overflow-x-auto">
          <CodeMirror
            value={preview}
            theme={materialDark}
            extensions={[langs.javascript()]}
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
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
