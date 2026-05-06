-- Run this SQL in Supabase SQL Editor.
-- Dynamic categories for News Articles admin dropdown.

create extension if not exists pgcrypto;

create table if not exists public.news_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_news_categories_active_sort
  on public.news_categories(is_active, sort_order, name);

create or replace function public.set_news_categories_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_news_categories_updated_at on public.news_categories;
create trigger trg_news_categories_updated_at
before update on public.news_categories
for each row
execute procedure public.set_news_categories_updated_at();

insert into public.news_categories (name, slug, sort_order)
values
  ('News', 'news', 1),
  ('Opinion', 'opinion', 2),
  ('Research', 'research', 3),
  ('Data', 'data', 4)
on conflict (slug) do nothing;

