import { createClient } from "@/utils/supabase/server";

export async function getSnippets() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("code_snippets").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
