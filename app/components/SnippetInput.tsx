import React from "react";
import CodeMirror, { Extension } from "@uiw/react-codemirror";
import { materialDark, materialLight } from "@uiw/codemirror-theme-material";
import { langs } from "@uiw/codemirror-extensions-langs";
import { useLanguageStore } from "../stores/languageStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
function SnippetInput({ theme }: { theme: "dark" | "light" }) {
  const { language } = useLanguageStore();
  return (
    <>
      <CodeMirror
        height="300px"
        value={`const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);`}
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
    </>
  );
}

export default SnippetInput;
