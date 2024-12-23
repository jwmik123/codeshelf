"use server";

import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SnippetList } from "../components/SnippetList";
import { getSnippets } from "./actions";

export default async function Snippets() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const snippets = await getSnippets();

  return (
    <section>
      <h1>Snippets</h1>
      <Separator className="w-full" />
      <SnippetList snippets={snippets} />
    </section>
  );
}
