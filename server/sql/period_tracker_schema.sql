-- Run this SQL in Supabase SQL Editor.
-- Table for storing user period tracker selections/history.

create extension if not exists pgcrypto;

create table if not exists public.period_tracker_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  period_start_date date not null,
  period_end_date date,
  selected_dates jsonb not null default '[]'::jsonb,
  has_no_idea boolean not null default false,
  cycle_length_days int,
  period_length_days int,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_period_tracker_user_start
  on public.period_tracker_logs(user_id, period_start_date desc);

create or replace function public.set_period_tracker_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_period_tracker_updated_at on public.period_tracker_logs;
create trigger trg_period_tracker_updated_at
before update on public.period_tracker_logs
for each row
execute procedure public.set_period_tracker_updated_at();

