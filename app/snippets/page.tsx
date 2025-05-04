import { Separator } from "@/components/ui/separator";
import { SnippetList } from "../components/SnippetList";
import { getSnippets } from "./actions";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { FilterControls } from "@/app/components/FilterControls";

export default async function Snippets({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Temporarily disabled authentication check
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  const snippets = await getSnippets({
    language: searchParams.language as string,
    shelf: searchParams.shelf as string,
    popularity: searchParams.popularity as string,
    sort: searchParams.sort as string,
  });

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <section className="mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-4xl font-bold mb-2">Snippets</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Browse and filter through our collection of code snippets
            </p>
          </header>
          <FilterControls searchParams={searchParams} />
          <Separator className="w-full" />
          <SnippetList snippets={snippets} />
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
