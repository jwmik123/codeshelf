"use server";

import { createClient } from "@/utils/supabase/server";
import { Snippet } from "@/types/custom";
import { revalidatePath } from "next/cache";

interface SearchParams {
  language?: string;
  shelf?: string;
  popularity?: string;
  sort?: string;
}

export async function removeSnippet(snippetId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("code_snippets")
    .delete()
    .eq("id", snippetId);
  return { data, error };
}

// Add a snippet
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

// Update a snippet
export async function getSnippet(snippetId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("code_snippets")
    .select("*")
    .eq("id", snippetId)
    .single();
  return { data, error };
}

// Add a snippet
export async function updateSnippet(snippet: Snippet) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("code_snippets")
    .update({
      ...snippet,
      updated_at: new Date().toISOString(),
    })
    .eq("id", snippet.id)
    .select();
  if (error) {
    throw new Error(error.message);
  }

  revalidatePath(`/snippets/${snippet.id}`);
  return data;
}

// like snippet
export async function likeSnippet(snippetId: string): Promise<Snippet | null> {
  const supabase = await createClient();

  try {
    const { data: currentSnippet, error: fetchError } = await supabase
      .from("code_snippets")
      .select("likes")
      .eq("id", snippetId)
      .maybeSingle();

    if (fetchError) {
      throw new Error("Failed to fetch snippet");
    }

    if (!currentSnippet) {
      throw new Error("Snippet not found");
    }

    const { data: updatedSnippet, error: updateError } = await supabase
      .from("code_snippets")
      .update({
        likes: (currentSnippet.likes || 0) + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", snippetId)
      .select()
      .maybeSingle();

    if (updateError) {
      throw new Error("Failed to update snippet");
    }

    return updatedSnippet;
  } catch (error) {
    console.error("Like snippet error:", error);
    throw error;
  }
}

// Get all snippets
export async function getSnippets(params?: SearchParams) {
  const supabase = await createClient();

  let query = supabase.from("code_snippets").select("*");

  // Apply language filter
  if (params?.language) {
    query = query.eq("language", params.language);
  }

  // Apply shelf filter
  if (params?.shelf) {
    query = query.eq("shelf", params.shelf);
  }

  // Apply sorting
  if (params?.sort) {
    switch (params.sort) {
      case "newest":
        query = query.order("created_at", { ascending: false });
        break;
      case "oldest":
        query = query.order("created_at", { ascending: true });
        break;
    }
  }

  // Apply popularity sorting
  if (params?.popularity) {
    switch (params.popularity) {
      case "most":
        query = query.order("likes", { ascending: false });
        break;
      case "least":
        query = query.order("likes", { ascending: true });
        break;
    }
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// Get all snippets for a user
export async function getUserSnippets(userId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("code_snippets")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
