"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CommandIcon } from "lucide-react";
import React from "react";
import { useEffect, useRef, useState } from "react";

function Search() {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <SearchIcon className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        ref={searchInputRef}
        type="search"
        placeholder={`Search snippets...`}
        className="w-full pl-8"
        onFocus={() => setIsSearching(true)}
        onBlur={() => setIsSearching(false)}
      />

      {!isSearching && (
        <div className="absolute right-4 top-1/2 transform text-muted-foreground -translate-y-1/2 flex items-center justify-center gap-1">
          <CommandIcon className="w-3 h-3" />
          <span className="text-xs">+</span>
          <span className="text-sm">K</span>
        </div>
      )}
    </>
  );
}

export default Search;
