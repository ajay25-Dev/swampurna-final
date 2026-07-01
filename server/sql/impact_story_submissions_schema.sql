-- Run this SQL in Supabase SQL Editor.
-- Stores "Share Your Story" submissions from website/app users.

create extension if not exists pgcrypto;

create table if not exists public.impact_story_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  title text not null,
  story text not null,
  image_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

