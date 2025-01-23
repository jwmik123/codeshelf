import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
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
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const snippet = await getSnippet(params.snippetId);

  if (!snippet.data) {
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
                <h1 className="text-4xl font-bold">{snippet.data.title}</h1>
              </div>
              <p className="mt-2 text-lg text-muted-foreground">
                {snippet.data.description}
              </p>
            </header>

            {/* Main content grid */}
            <div className="grid grid-cols-1 divide-x lg:grid-cols-2">
              {/* Code Editor Section */}
              <div className="min-w-0">
                {/* min-w-0 prevents overflow */}
                <div className="space-y-4 pr-4">
                  <CodeEditorClient snippet={snippet.data} />
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Link
                      href={`/snippets?language=${snippet.data.language}`}
                      className="hover:underline"
                    >
                      Language: {snippet.data.language}
                    </Link>
                    <span>•</span>
                    <Link
                      href={`/snippets?shelf=${snippet.data.shelf}`}
                      className="hover:underline"
                    >
                      Shelf: {snippet.data.shelf}
                    </Link>
                    <span>•</span>
                    <span>Likes: {snippet.data.likes}</span>
                  </div>
                </div>
              </div>

              {/* Improvements Section */}
              <div className="w-full pl-4">
                <OptimizeCodeButton snippet={snippet.data} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
