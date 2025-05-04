import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { SnippetList } from "../components/SnippetList";
import { getUserSnippets } from "../snippets/actions";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

export default async function UserSnippets() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Temporarily disabled authentication check
  // if (!user) {
  //   redirect("/login");
  // }

  const snippets = await getUserSnippets(user?.id || "anonymous");

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <section className="mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="flex items-center">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-4xl font-bold mb-2">My Snippets</h1>
            </div>
          </header>
          <Separator className="w-full" />
          <SnippetList snippets={snippets} />
        </section>
      </SidebarInset>
    </SidebarProvider>
  );
}
