import { Snippet } from "@/types/custom";
import { SnippetCard } from "./SnippetCard";

export function SnippetList({ snippets }: { snippets: Array<Snippet> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {snippets.map((snippet) => (
        <>
          <SnippetCard key={snippet.id} snippet={snippet} />
        </>
      ))}
    </div>
  );
}
