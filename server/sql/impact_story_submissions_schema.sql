-- Run this SQL in Supabase SQL Editor.
-- Stores "Share Your Story" submissions from website/app users.
-- Safe to run multiple times; it also repairs older versions of the table.

create extension if not exists pgcrypto;

create table if not exists public.impact_story_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  email text,
  title text,
  story text,
  image_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.impact_story_submissions
  add column if not exists full_name text,
  add column if not exists email text,
  add column if not exists title text,
  add column if not exists story text,
  add column if not exists image_url text,
  add column if not exists status text not null default 'pending',
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'impact_story_submissions'
      and column_name = 'name'
  ) then
    update public.impact_story_submissions
    set full_name = coalesce(nullif(full_name, ''), nullif(name, ''), 'Anonymous')
    where full_name is null or full_name = '';
  end if;
end;
$$;

update public.impact_story_submissions
set
  full_name = coalesce(nullif(full_name, ''), 'Anonymous'),
  title = coalesce(nullif(title, ''), 'Untitled story'),
  story = coalesce(nullif(story, ''), 'No story text provided.')
where full_name is null
  or full_name = ''
  or title is null
  or title = ''
  or story is null
  or story = '';

alter table public.impact_story_submissions
  alter column full_name set not null,
  alter column title set not null,
  alter column story set not null;

create index if not exists idx_impact_story_submissions_status_created
  on public.impact_story_submissions(status, created_at desc);

create or replace function public.set_impact_story_submissions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_impact_story_submissions_updated_at on public.impact_story_submissions;

create trigger trg_impact_story_submissions_updated_at
before update on public.impact_story_submissions
for each row
execute procedure public.set_impact_story_submissions_updated_at();

-- Refresh Supabase/PostgREST schema cache so the API can see new columns immediately.
notify pgrst, 'reload schema';