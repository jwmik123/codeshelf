// In CodeEditor.tsx
"use client";

import { materialDark } from "@uiw/codemirror-theme-material";
import { langs } from "@uiw/codemirror-extensions-langs";
import dynamic from "next/dynamic";
import { EditorView, Compartment } from "@uiw/react-codemirror";
import { useRef, useState } from "react";
import { removeSnippet, updateSnippet } from "../actions";
import { Snippet } from "@/types/custom";
import { Button } from "@/components/ui/button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
});

interface CodeEditorClientProps {
  snippet: Snippet;
}

export function CodeEditorClient({ snippet }: CodeEditorClientProps) {
  const editorRef = useRef<EditorView | null>(null);
  const compartmentRef = useRef(new Compartment());
  const [updatedCode, setUpdatedCode] = useState(snippet.code);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const extensions = [
    EditorView.lineWrapping,
    langs[snippet.language as keyof typeof langs](),
  ];

  const onCreateEditor = (view: EditorView) => {
    editorRef.current = view;
    view.dispatch({
      effects: compartmentRef.current.reconfigure(EditorView.lineWrapping),
    });
  };

  const handleUpdateSnippet = async () => {
    setIsUpdating(true);
    try {
      await updateSnippet({
        ...snippet,
        code: updatedCode,
      });

      toast.success("Snippet updated successfully");
    } catch (error: any) {
      console.error("Update error:", error);
      toast.error(error.message || "Failed to update snippet");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemoveSnippet = async () => {
    try {
      await removeSnippet(snippet.id);
      router.push("/snippets");
      toast.success("Snippet removed successfully");
    } catch (error) {
      console.error("Error removing snippet:", error);
      toast.error("Failed to remove snippet");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-4 space-x-4">
        <Button
          onClick={handleUpdateSnippet}
          variant="default"
          size="sm"
          disabled={isUpdating}
        >
          {isUpdating ? "Saving..." : "Save"}
        </Button>
        <Button
          onClick={handleRemoveSnippet}
          variant="destructive"
          size="sm"
          disabled={isUpdating}
        >
          Remove Snippet
        </Button>
      </div>

      <CodeMirror
        value={updatedCode}
        theme={materialDark}
        onChange={(value) => {
          setUpdatedCode(value);
        }}
        extensions={extensions}
        onCreateEditor={onCreateEditor}
        className="single-code-editor"
      />
    </div>
  );
}
