import { Snippet } from "@/types/custom";
import { SnippetCard } from "./SnippetCard";

export function SnippetList({ snippets }: { snippets: Array<Snippet> }) {
  if (snippets.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        No snippets found
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {snippets.map((snippet) => (
        <>
          <SnippetCard key={snippet.id} snippet={snippet} />
        </>
      ))}
    </div>
  );
}
