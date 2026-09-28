-- Run this SQL in Supabase SQL Editor.
-- Likes/dislikes and comments on cycle snaps - mirrors the existing
-- post_likes/post_comments pattern (see social_posts_schema.sql), with
-- reactions extended to support a real like/dislike toggle (posts only
-- have "like", so this isn't a straight copy for that table).

create extension if not exists pgcrypto;

-- One row per (snap, user): reaction_type is 'like' or 'dislike'.
-- Toggling logic lives in the API route, not here - tapping the same
-- reaction again deletes the row (back to neutral); tapping the other
-- reaction updates the existing row's type instead of adding a second row.
create table if not exists public.cycle_snap_reactions (
  snap_id uuid not null references public.cycle_snaps(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  reaction_type text not null check (reaction_type in ('like', 'dislike')),
  created_at timestamptz not null default now(),
  primary key (snap_id, user_id)
);

create table if not exists public.cycle_snap_comments (
  id uuid primary key default gen_random_uuid(),
  snap_id uuid not null references public.cycle_snaps(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_cycle_snap_reactions_snap_id
  on public.cycle_snap_reactions(snap_id);
create index if not exists idx_cycle_snap_comments_snap_id
  on public.cycle_snap_comments(snap_id);
