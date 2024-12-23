"use client";

import { useEffect, useRef, useState } from "react";
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
import { Extension } from "@uiw/react-codemirror";
import { CodeAnalysisResponse, CodeAnalysisError } from "../api/overview/route";
import { toast } from "react-toastify";
import { addSnippet } from "../snippets/actions";
import { Snippet } from "@/types/custom";
import dynamic from "next/dynamic";

// Dynamically import CodeMirror with no server-side rendering
const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
});

function SnippetForm({ theme }: { theme: "dark" | "light" }) {
  const [code, setCode] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<CodeAnalysisResponse | null>(null);
  const [shelf, setShelf] = useState<string>("default");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>("");
  const { language, setLanguage } = useLanguageStore();
  const [isEditingTitle, setIsEditingTitle] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (result) {
      if (result.language && result.language in langs) {
        setLanguage(result.language);
      }
      if (result.category) {
        setShelf(result.category);
      }
    }
  }, [result, setLanguage]);
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
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to analyze code. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = async () => {
    try {
      // Get the current title and description from result or use defaults
      const title = result?.title || "Untitled Snippet";
      const description = result?.description || "";

      const newSnippet: Snippet = {
        title,
        description,
        code: code || "",
        language: language || "javascript",
        shelf: shelf || "default",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: null,
        id: crypto.randomUUID(),
      };

      if (!newSnippet.code) {
        toast.error("Please enter some code");
        return;
      }

      await addSnippet(newSnippet);
      toast.success("Snippet saved successfully!");
      formRef.current?.reset();
      setCode("");
      setResult(null);
    } catch (error) {
      toast.error("Failed to save snippet");
      console.error("Save error:", error);
    }
  };

  return (
    <form ref={formRef} action={handleSubmit}>
      {/* Hidden form fields to store the data */}
      <input
        type="hidden"
        name="title"
        value={result?.title || "Untitled Snippet"}
      />
      <input
        type="hidden"
        name="description"
        value={result?.description || ""}
      />
      <input type="hidden" name="code" value={code} />
      <input type="hidden" name="language" value={language} />
      <input type="hidden" name="shelf" value={shelf} />

      {result ? (
        <>
          {isEditingTitle ? (
            <input
              type="text"
              className="text-xl font-bold mb-2 p-2 border rounded"
              value={result.title}
              onChange={(e) => setResult({ ...result, title: e.target.value })}
              onBlur={() => setIsEditingTitle(false)}
              autoFocus
            />
          ) : (
            <h3
              className="text-xl font-bold mb-2 cursor-pointer"
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
        value={code || "// Please enter your code here..."}
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

        <Select value={shelf} onValueChange={setShelf}>
          <SelectTrigger>
            <SelectValue placeholder="Select Shelf" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default Shelf</SelectItem>
            {result?.category && result.category !== "default" && (
              <SelectItem value={result.category}>{result.category}</SelectItem>
            )}
          </SelectContent>
        </Select>

        <Button
          type="button"
          onClick={analyzeCode}
          disabled={!code || isAnalyzing}
        >
          <Zap className="w-4 h-4 mr-2" />
          {isAnalyzing ? "Analyzing..." : "Analyze Code"}
        </Button>

        <Button type="submit" disabled={!code}>
          <Save className="w-4 h-4 mr-2" />
          Save Snippet
        </Button>
      </div>
    </form>
  );
}

export default SnippetForm;
