-- Run this SQL in Supabase SQL Editor.
-- Stores user submitted report-a-problem tickets.

create extension if not exists pgcrypto;

create table if not exists public.support_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  issue_types jsonb not null default '[]'::jsonb,
  details text not null,
  media_url text,
  media_type text check (media_type in ('image', 'video')),
  status text not null default 'open' check (status in ('open', 'in_progress', 'resolved', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_support_reports_user_created
  on public.support_reports(user_id, created_at desc);

create or replace function public.set_support_reports_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_support_reports_updated_at on public.support_reports;
create trigger trg_support_reports_updated_at
before update on public.support_reports
for each row
execute procedure public.set_support_reports_updated_at();
