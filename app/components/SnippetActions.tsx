"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { langs } from "@uiw/codemirror-extensions-langs";
import { Zap } from "lucide-react";
import React from "react";
import { useLanguageStore } from "../stores/languageStore";
function SnippetActions() {
  const { language, setLanguage } = useLanguageStore();
  return (
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

      <Button>
        <Zap className="w-4 h-4 " />
        Add to Shelf
      </Button>
    </div>
  );
}

export default SnippetActions;
