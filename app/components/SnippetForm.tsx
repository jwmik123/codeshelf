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
import { Save, Zap } from "lucide-react";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { CodeAnalysisResponse, CodeAnalysisError } from "../api/overview/route";

function SnippetForm({ theme }: { theme: "dark" | "light" }) {
  const [code, setCode] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<CodeAnalysisResponse | null>(null);
  const [category, setCategory] = useState<string>();
  // eslint-disable-next-line
  const [error, setError] = useState<string>("");
  const { language, setLanguage } = useLanguageStore();
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const analyzeCode = async () => {
    try {
      setIsAnalyzing(true);
      setError("");

      const response = await fetch("/api/overview", {
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
      {result ? (
        <>
          {isEditingTitle ? (
            <input
              type="text"
              className="text-xl font-bold mb-2"
              value={result.title}
              onChange={(e) => setResult({ ...result, title: e.target.value })}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <h3
              className="text-xl font-bold mb-2"
              onClick={() => setIsEditingTitle(true)}
            >
              <span className="text-muted-foreground">New Title:</span>{" "}
              {result.title}
            </h3>
          )}
          <p className="text-lg mb-2">
            <span className="text-muted-foreground">Description:</span>{" "}
            {result.description}
          </p>
        </>
      ) : (
        <h3 className="text-xl font-semibold mb-4">Add a new snippet</h3>
      )}

      <CodeMirror
        height="300px"
        value={"// Please enter your code here..."}
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
        <Select
          value={result ? result.language : undefined}
          onValueChange={setLanguage}
        >
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

        <Select
          value={result ? result.category : category}
          onValueChange={setCategory}
        >
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
        <Button disabled={!code || isAnalyzing}>
          <Save className="w-4 h-4 " />
          Save Snippet
        </Button>
      </div>
    </div>
  );
}

export default SnippetForm;
