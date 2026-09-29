-- Run this SQL in Supabase SQL Editor.
-- Required for the "save cycle snap for later" API in server/index.js
-- (mirrors post_saves: a simple per-user/per-snap join table).

create table if not exists public.cycle_snap_saves (
  snap_id uuid not null references public.cycle_snaps(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (snap_id, user_id)
);

create index if not exists idx_cycle_snap_saves_snap_id on public.cycle_snap_saves(snap_id);
create index if not exists idx_cycle_snap_saves_user_id on public.cycle_snap_saves(user_id);
