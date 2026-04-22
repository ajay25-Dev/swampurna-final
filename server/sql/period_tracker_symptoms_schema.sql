-- Run this SQL in Supabase SQL Editor.
-- Daily symptom tracking for period tracker.

create extension if not exists pgcrypto;

create table if not exists public.period_tracker_symptoms (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  track_date date not null,
  symptoms jsonb not null default '[]'::jsonb,
  flow_intensity text,
  pain_level int,
  mood text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint period_tracker_symptoms_unique_user_date unique (user_id, track_date)
);

create index if not exists idx_period_tracker_symptoms_user_date
  on public.period_tracker_symptoms(user_id, track_date desc);

create or replace function public.set_period_tracker_symptoms_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_period_tracker_symptoms_updated_at on public.period_tracker_symptoms;
create trigger trg_period_tracker_symptoms_updated_at
before update on public.period_tracker_symptoms
for each row
execute procedure public.set_period_tracker_symptoms_updated_at();
