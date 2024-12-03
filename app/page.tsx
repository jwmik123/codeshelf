"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

import { Card } from "@/components/ui/card";
import SnippetForm from "./components/SnippetForm";
import { SnippetCard } from "./components/SnippetCard";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

// This would typically come from your backend
const sampleSnippets = [
  {
    id: 1,
    title: "Quick Sort",
    description: "A quick sort implementation in Python",
    language: "Python",
    preview:
      "def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)",
  },
  {
    id: 2,
    title: "3D Cube",
    description: "A 3D cube in Three.js",
    language: "Three.js",
    preview:
      "const geometry = new THREE.BoxGeometry(1, 1, 1);\nconst material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });\nconst cube = new THREE.Mesh(geometry, material);\nscene.add(cube);",
  },
  {
    id: 3,
    title: "API Request",
    description: "An API request in JavaScript",
    language: "JavaScript",
    preview:
      "async function fetchData() {\n  try {\n    const response = await fetch('https://api.example.com/data');\n    const data = await response.json();\n    console.log(data);\n  } catch (error) {\n    console.error('Error:', error);\n  }\n}",
  },
];

export default function Dashboard() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "system";
    setTheme(currentTheme);
  }, [setTheme]);

  return (
    <div className="flex h-screen bg-background text-foreground">
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Welcome back Jo&euml;l! 👋</h2>
          </div>
          {/* Create new snippet form */}
          <Card className="flex flex-col gap-4 p-4">
            <SnippetForm theme={(theme as "light" | "dark") || "dark"} />
          </Card>

          {/* Your pinned snippets */}
          <div className="my-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Pinned snippets</h2>
              <Button variant="outline" size="sm">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit pins
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sampleSnippets.map((snippet) => (
                <SnippetCard
                  key={snippet.id}
                  title={snippet.title}
                  description={snippet.description}
                  language={snippet.language}
                  preview={snippet.preview}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
