import { useState } from "react";
import { materialDark } from "@uiw/codemirror-theme-material";
import { langs } from "@uiw/codemirror-extensions-langs";
import { materialLight } from "@uiw/codemirror-theme-material";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useLanguageStore } from "../stores/languageStore";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import {
  CodeAnalysisResponse,
  CodeAnalysisError,
} from "../api/analyze-code/route";

function SnippetForm({ theme }: { theme: "dark" | "light" }) {
  const [code, setCode] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<CodeAnalysisResponse | null>(null);
  const [error, setError] = useState<string>("");
  const { language, setLanguage } = useLanguageStore();

  const analyzeCode = async () => {
    try {
      setIsAnalyzing(true);
      setError("");

      const response = await fetch("/api/analyze-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        throw new Error("Failed to analyze code");
      }
      const data = (await response.json()) as
        | CodeAnalysisResponse
        | CodeAnalysisError;

      if ("error" in data) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to analyze code. Please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <CodeMirror
        height="300px"
        value={`// Please enter your code here...`}
        onChange={(value) => setCode(value)}
        theme={theme === "dark" ? materialDark : materialLight}
        basicSetup={{
          foldGutter: false,
          dropCursor: false,
          allowMultipleSelections: false,
          indentOnInput: false,
        }}
        extensions={[langs[language as keyof typeof langs]()] as Extension[]}
        style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}
      />
      <div className="flex gap-4 items-center mt-4">
        {result && (
          <div className="mt-4 space-y-2">
            <p>
              <strong>Title:</strong> {result.title}
            </p>
            <p>
              <strong>Language:</strong> {result.language}
            </p>
            <p>
              <strong>Description:</strong> {result.description}
            </p>
          </div>
        )}
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(langs).map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Shelf" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="algorithms">Algorithms</SelectItem>
            <SelectItem value="utils">Utilities</SelectItem>
            <SelectItem value="configs">Configurations</SelectItem>
            <SelectItem value="snippets">Code Snippets</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={analyzeCode} disabled={!code || isAnalyzing}>
          <Zap className="w-4 h-4 " />
          {isAnalyzing ? "Analyzing..." : "Analyze Code"}
        </Button>
      </div>
    </div>
  );
}

export default SnippetForm;
