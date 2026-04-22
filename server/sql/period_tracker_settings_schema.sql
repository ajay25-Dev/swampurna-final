-- Run this SQL in Supabase SQL Editor.
-- Stores per-user period tracker setup/preferences.

create extension if not exists pgcrypto;

create table if not exists public.period_tracker_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  last_period_start_date date not null,
  period_end_date date,
  selected_dates jsonb not null default '[]'::jsonb,
  has_no_idea boolean not null default false,
  cycle_length_days int not null default 28,
  period_length_days int not null default 5,
  pre_period_days int not null default 2,
  post_period_days int not null default 2,
  ovulation_start_day int not null default 11,
  ovulation_window_days int not null default 5,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_period_tracker_settings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_period_tracker_settings_updated_at on public.period_tracker_settings;
create trigger trg_period_tracker_settings_updated_at
before update on public.period_tracker_settings
for each row
execute procedure public.set_period_tracker_settings_updated_at();

