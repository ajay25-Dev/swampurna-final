-- Run this SQL in Supabase SQL Editor.
-- Generic activity/feature-usage tracking. The mobile/customer app should call
-- POST /api/v1/activity/track (see server/index.js) whenever a user opens or
-- uses a feature (period tracker, chatbot, cycle snaps, games, education
-- material, etc.) so the admin dashboard can report real feature-usage stats
-- and a true "most active user" ranking across the whole app, not just the
-- period tracker.

create extension if not exists pgcrypto;

create table if not exists public.app_activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  feature text not null,
  event_type text not null default 'view',
  meta jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_app_activity_events_feature_created
  on public.app_activity_events(feature, created_at desc);

create index if not exists idx_app_activity_events_user_created
  on public.app_activity_events(user_id, created_at desc);
