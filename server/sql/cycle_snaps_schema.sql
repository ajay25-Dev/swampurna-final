-- Run this SQL in Supabase SQL Editor.
-- Community cycle snaps submitted by users for review.

create extension if not exists pgcrypto;

create table if not exists public.cycle_snaps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text,
  description text not null,
  media_url text not null,
  media_type text not null check (media_type in ('image', 'video')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  reviewed_by uuid references public.users(id) on delete set null,
  reviewed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cycle_snaps_status_created
  on public.cycle_snaps(status, created_at desc);

create index if not exists idx_cycle_snaps_user_created
  on public.cycle_snaps(user_id, created_at desc);

create or replace function public.set_cycle_snaps_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_cycle_snaps_updated_at on public.cycle_snaps;
create trigger trg_cycle_snaps_updated_at
before update on public.cycle_snaps
for each row
execute procedure public.set_cycle_snaps_updated_at();
