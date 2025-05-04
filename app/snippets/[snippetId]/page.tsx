import { notFound } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { getSnippet } from "../actions";
import { CodeEditorClient } from "./CodeEditor";
import OptimizeCodeButton from "./OptimizeCodeButton";
import Link from "next/link";

export default async function SnippetPage({
  params,
}: {
  params: { snippetId: string };
}) {
  // Temporarily disabled authentication check
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const snippet = await getSnippet(params.snippetId);

  if (!snippet) {
    notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="container max-w-full px-4 py-8">
          <div className="space-y-8">
            {/* Header Section */}
            <header>
              <div className="flex items-center">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <h1 className="text-4xl font-bold">{snippet.title}</h1>
              </div>
              <p className="mt-2 text-lg text-muted-foreground">
                {snippet.description}
              </p>
            </header>

            {/* Main content grid */}
            <div className="grid grid-cols-1 divide-x lg:grid-cols-2">
              {/* Code Editor Section */}
              <div className="min-w-0">
                {/* min-w-0 prevents overflow */}
                <div className="space-y-4 pr-4">
                  <CodeEditorClient snippet={snippet} />
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link
                      href={`/snippets?language=${snippet.language}`}
                      className="hover:underline"
                    >
                      Language: {snippet.language}
                    </Link>
                    <span>•</span>
                    <Link
                      href={`/snippets?shelf=${snippet.shelf}`}
                      className="hover:underline"
                    >
                      Shelf: {snippet.shelf}
                    </Link>
                    <span>•</span>
                    <span>Likes: {snippet.likes}</span>
                  </div>
                </div>
              </div>

              {/* Improvements Section */}
              <div className="w-full pl-4">
                <OptimizeCodeButton snippet={snippet} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
