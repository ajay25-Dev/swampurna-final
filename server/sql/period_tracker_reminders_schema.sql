-- Run this SQL in Supabase SQL Editor.
-- Reminder and notification preferences for period tracker.

create extension if not exists pgcrypto;

create table if not exists public.period_tracker_reminders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  reminder_type text not null check (reminder_type in ('period', 'pre_period', 'post_period', 'peak_ovulation', 'custom')),
  title text not null,
  message text,
  reminder_time text not null default '09:00',
  days_before int not null default 0,
  custom_date date,
  repeat_type text not null default 'monthly' check (repeat_type in ('none', 'daily', 'weekly', 'monthly')),
  is_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_period_tracker_reminders_user_created
  on public.period_tracker_reminders(user_id, created_at desc);

create or replace function public.set_period_tracker_reminders_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_period_tracker_reminders_updated_at on public.period_tracker_reminders;
create trigger trg_period_tracker_reminders_updated_at
before update on public.period_tracker_reminders
for each row
execute procedure public.set_period_tracker_reminders_updated_at();
