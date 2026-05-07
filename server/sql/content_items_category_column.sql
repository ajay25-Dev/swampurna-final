-- Run in Supabase SQL editor.
-- Adds dedicated category column for content items.

alter table if exists public.content_items
  add column if not exists category text,
  add column if not exists category_id uuid references public.news_categories(id) on delete set null;

create index if not exists idx_content_items_page_section_category
  on public.content_items(page_slug, section_key, category);

create index if not exists idx_content_items_page_section_category_id
  on public.content_items(page_slug, section_key, category_id);
