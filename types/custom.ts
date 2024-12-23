import { Database } from "./supabase";

export type Snippet = Database["public"]["Tables"]["code_snippets"]["Row"];
