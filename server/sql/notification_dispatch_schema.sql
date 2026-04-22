-- Run this SQL in Supabase SQL Editor.
-- Device tokens + queued reminder notifications.

create extension if not exists pgcrypto;

create table if not exists public.notification_devices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  device_id text not null,
  push_token text not null,
  platform text,
  app_version text,
  timezone text,
  is_active boolean not null default true,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint notification_devices_unique_user_device unique (user_id, device_id)
);

create index if not exists idx_notification_devices_user_active
  on public.notification_devices(user_id, is_active, last_seen_at desc);

create table if not exists public.notification_dispatch_queue (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  reminder_id uuid not null references public.period_tracker_reminders(id) on delete cascade,
  reminder_type text not null,
  title text not null,
  message text,
  trigger_date date not null,
  scheduled_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed', 'cancelled')),
  provider text,
  provider_message_id text,
  error_message text,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint notification_dispatch_unique_event unique (user_id, reminder_id, scheduled_at)
);

create index if not exists idx_notification_dispatch_user_status
  on public.notification_dispatch_queue(user_id, status, scheduled_at);

create or replace function public.set_notification_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_notification_devices_updated_at on public.notification_devices;
create trigger trg_notification_devices_updated_at
before update on public.notification_devices
for each row
execute procedure public.set_notification_updated_at();

drop trigger if exists trg_notification_dispatch_queue_updated_at on public.notification_dispatch_queue;
create trigger trg_notification_dispatch_queue_updated_at
before update on public.notification_dispatch_queue
for each row
execute procedure public.set_notification_updated_at();
