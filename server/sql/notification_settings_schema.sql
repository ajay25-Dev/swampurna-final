-- Run this SQL in Supabase SQL Editor.
-- Stores user-level notification toggle preferences.

create extension if not exists pgcrypto;

create table if not exists public.notification_settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  period_reminder_enabled boolean not null default true,
  ovulation_reminder_enabled boolean not null default true,
  daily_insights_enabled boolean not null default true,
  daily_period_reminder_enabled boolean not null default false,
  app_updates_enabled boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_notification_settings_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_notification_settings_updated_at on public.notification_settings;
create trigger trg_notification_settings_updated_at
before update on public.notification_settings
for each row
execute procedure public.set_notification_settings_updated_at();
