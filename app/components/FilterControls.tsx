"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { langs } from "@uiw/codemirror-extensions-langs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export function FilterControls({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const search = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(search);
      params.set(name, value);
      return params.toString();
    },
    [search]
  );

  const handleReset = () => {
    router.push("/snippets");
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Select
        value={searchParams.language as string}
        onValueChange={(value) => {
          router.push("/snippets?" + createQueryString("language", value));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a language" />
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
        value={searchParams.shelf as string}
        onValueChange={(value) => {
          router.push("/snippets?" + createQueryString("shelf", value));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Shelf" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Algorithms">Algorithms</SelectItem>
          <SelectItem value="Data Structures">Data Structures</SelectItem>
          <SelectItem value="Web Development">Web Development</SelectItem>
          <SelectItem value="Machine Learning">Machine Learning</SelectItem>
          <SelectItem value="Security">Security</SelectItem>
          <SelectItem value="Performance">Performance</SelectItem>
          <SelectItem value="Code Organization">Code Organization</SelectItem>
          <SelectItem value="Error Handling">Error Handling</SelectItem>
          <SelectItem value="Security Considerations">
            Security Considerations
          </SelectItem>
          <SelectItem value="AI">AI</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.popularity as string}
        onValueChange={(value) => {
          router.push("/snippets?" + createQueryString("popularity", value));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Popularity" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="most">Most Popular</SelectItem>
          <SelectItem value="least">Least Popular</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.sort as string}
        onValueChange={(value) => {
          router.push("/snippets?" + createQueryString("sort", value));
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest First</SelectItem>
          <SelectItem value="oldest">Oldest First</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="outline" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}
