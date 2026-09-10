-- Run this SQL in Supabase SQL Editor.
-- Stores "Event Detail Form" submissions from the Competition/Event detail pages
-- so admin can review who registered interest in each event.
-- Safe to run multiple times.

create extension if not exists pgcrypto;

create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_title text not null,
  event_slug text,
  name text not null,
  email text,
  phone text,
  details text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.event_registrations
  add column if not exists event_title text,
  add column if not exists event_slug text,
  add column if not exists name text,
  add column if not exists email text,
  add column if not exists phone text,
  add column if not exists details text,
  add column if not exists status text not null default 'new',
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_event_registrations_status_created
  on public.event_registrations(status, created_at desc);

create index if not exists idx_event_registrations_event_slug
  on public.event_registrations(event_slug);

create or replace function public.set_event_registrations_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_event_registrations_updated_at on public.event_registrations;

create trigger trg_event_registrations_updated_at
before update on public.event_registrations
for each row
execute procedure public.set_event_registrations_updated_at();

-- Refresh Supabase/PostgREST schema cache so the API can see new columns immediately.
notify pgrst, 'reload schema';
