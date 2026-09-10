-- Run this SQL in Supabase SQL Editor.
-- Stores public "Contact Us" website form submissions so admin can review them.
-- Safe to run multiple times.

create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text,
  email text not null,
  phone text,
  subject text,
  message text not null,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contact_submissions
  add column if not exists first_name text,
  add column if not exists last_name text,
  add column if not exists email text,
  add column if not exists phone text,
  add column if not exists subject text,
  add column if not exists message text,
  add column if not exists status text not null default 'new',
  add column if not exists created_at timestamptz not null default now(),
  add column if not exists updated_at timestamptz not null default now();

create index if not exists idx_contact_submissions_status_created
  on public.contact_submissions(status, created_at desc);

create or replace function public.set_contact_submissions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_contact_submissions_updated_at on public.contact_submissions;

create trigger trg_contact_submissions_updated_at
before update on public.contact_submissions
for each row
execute procedure public.set_contact_submissions_updated_at();

-- Refresh Supabase/PostgREST schema cache so the API can see new columns immediately.
notify pgrst, 'reload schema';
