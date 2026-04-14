import { supabase } from "./supabaseClient";

export async function fetchContentItems({ page, section }) {
  const query = supabase
    .from("content_items")
    .select("*")
    .eq("page_slug", page)
    .eq("section_key", section)
    .order("sort_order", { ascending: true });

  const { data, error } = await query;
  if (error) {
    throw error;
  }
  return data || [];
}

export async function fetchPageContent({ page }) {
  const { data, error } = await supabase
    .from("page_content")
    .select("*")
    .eq("slug", page)
    .single();

  if (error) {
    throw error;
  }
  return data || null;
}
