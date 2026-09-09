import { supabase } from "./supabaseClient";

function isPubliclyVisible(item) {
  const status = item?.meta?.status;
  if (status === "draft") return false;
  const expiresAt = item?.meta?.expires_at;
  if (expiresAt) {
    const expiry = new Date(expiresAt);
    if (!Number.isNaN(expiry.getTime()) && expiry.getTime() < Date.now()) return false;
  }
  return true;
}

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
  return (data || []).filter(isPubliclyVisible);
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
