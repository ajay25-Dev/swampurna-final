-- Run this SQL in Supabase SQL Editor.
-- Required for the Educational Content Library (comics, videos, animations,
-- photos, visual guides) - server/index.js "/api/admin/content-library/*"
-- and "/api/public/content-library/*" endpoints, and the Flutter app's
-- Content Library screens.

create extension if not exists pgcrypto;

create table if not exists public.content_library_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- type: 'video' | 'comic' | 'animation' | 'photo' | 'guide'
-- media_url: the video/animation file URL (type = video/animation)
-- image_urls: ordered array of image URLs, e.g. ["url1","url2"] (type = comic/photo)
-- phases: ordered array of {"title": "...", "body": "...", "image_url": "..."} (type = guide)
create table if not exists public.content_library_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.content_library_categories(id) on delete cascade,
  type text not null check (type in ('video', 'comic', 'animation', 'photo', 'guide')),
  title text not null,
  description text,
  thumbnail_url text,
  media_url text,
  image_urls jsonb not null default '[]'::jsonb,
  phases jsonb not null default '[]'::jsonb,
  status text not null default 'published' check (status in ('published', 'draft')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_content_library_items_category_id on public.content_library_items(category_id);
create index if not exists idx_content_library_items_status on public.content_library_items(status);
create index if not exists idx_content_library_items_sort_order on public.content_library_items(sort_order);
create index if not exists idx_content_library_categories_sort_order on public.content_library_categories(sort_order);

-- Idempotent: already defined by social_posts_schema.sql if that ran first.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_content_library_items_updated_at on public.content_library_items;
create trigger trg_content_library_items_updated_at
before update on public.content_library_items
for each row
execute procedure public.set_updated_at();

-- Seed the 5 requested categories (admin can rename/add/remove afterwards).
insert into public.content_library_categories (name, slug, sort_order)
values
  ('Lifestyle & Wellness', 'lifestyle-wellness', 0),
  ('Menstrual Cycle & Anatomy', 'menstrual-cycle-anatomy', 1),
  ('Health Conditions', 'health-conditions', 2),
  ('Hygiene', 'hygiene', 3),
  ('Product Guides', 'product-guides', 4)
on conflict (slug) do nothing;
