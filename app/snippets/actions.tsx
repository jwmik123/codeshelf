"use server";

import { createClient } from "@/utils/supabase/server";
import { Snippet } from "@/types/custom";
import { revalidatePath } from "next/cache";

export async function addSnippet(snippet: Snippet) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase.from("code_snippets").insert({
    title: snippet.title,
    description: snippet.description,
    language: snippet.language,
    shelf: snippet.shelf,
    code: snippet.code,
    user_id: user.id,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/snippets");

  return data;
}

export async function getSnippets() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase.from("code_snippets").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
