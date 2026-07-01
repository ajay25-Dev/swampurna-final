-- Run this SQL in Supabase SQL Editor.
-- Master options shown in the period tracker customization flow.

create extension if not exists pgcrypto;

create table if not exists public.period_tracker_options (
  id uuid primary key default gen_random_uuid(),
  category_key text not null,
  category_label text not null,
  option_key text not null,
  option_label text not null,
  purpose text,
  prediction_effect text,
  confidence_impact text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint period_tracker_options_unique_option unique (category_key, option_key)
);

create index if not exists idx_period_tracker_options_category_sort
  on public.period_tracker_options(category_key, sort_order);

create or replace function public.set_period_tracker_options_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_period_tracker_options_updated_at on public.period_tracker_options;
create trigger trg_period_tracker_options_updated_at
before update on public.period_tracker_options
for each row
execute procedure public.set_period_tracker_options_updated_at();

create table if not exists public.period_tracker_user_options (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  selections jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint period_tracker_user_options_unique_user unique (user_id),
  constraint period_tracker_user_options_object check (jsonb_typeof(selections) = 'object')
);

create index if not exists idx_period_tracker_user_options_user
  on public.period_tracker_user_options(user_id);

create or replace function public.set_period_tracker_user_options_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_period_tracker_user_options_updated_at on public.period_tracker_user_options;
create trigger trg_period_tracker_user_options_updated_at
before update on public.period_tracker_user_options
for each row
execute procedure public.set_period_tracker_user_options_updated_at();

insert into public.period_tracker_options (
  category_key,
  category_label,
  option_key,
  option_label,
  purpose,
  prediction_effect,
  confidence_impact,
  sort_order
) values
  ('flow', 'Flow', 'light', 'Light', 'Understand period intensity pattern', 'Adjust period duration tendency', '+3% to +5%', 10),
  ('flow', 'Flow', 'medium', 'Medium', 'Understand period intensity pattern', 'Adjust period duration tendency', '+3% to +5%', 20),
  ('flow', 'Flow', 'heavy', 'Heavy', 'Understand period intensity pattern', 'Adjust period duration tendency', '+3% to +5%', 30),
  ('spotting', 'Spotting', 'yes', 'Yes', 'Detect early period signals', 'Move period earlier by 1-3 days if pattern repeats', '+5% to +10%', 10),
  ('spotting', 'Spotting', 'no', 'No', 'Detect early period signals', 'Move period earlier by 1-3 days if pattern repeats', '+5% to +10%', 20),
  ('spotting_color', 'Spotting', 'red', 'Red', 'Detect early period signals', 'Move period earlier by 1-3 days if pattern repeats', '+5% to +10%', 30),
  ('spotting_color', 'Spotting', 'brown', 'Brown', 'Detect early period signals', 'Move period earlier by 1-3 days if pattern repeats', '+5% to +10%', 40),
  ('pain', 'Pain', 'no_pain', 'No pain', 'Detect possible cycle stage', 'If repeated across cycles, improve cycle stage detection', '+3% to +8%', 10),
  ('pain', 'Pain', 'mild_cramps', 'Mild cramps', 'Detect possible cycle stage', 'If repeated across cycles, improve cycle stage detection', '+3% to +8%', 20),
  ('pain', 'Pain', 'strong_cramps', 'Strong cramps', 'Detect possible cycle stage', 'If repeated across cycles, improve cycle stage detection', '+3% to +8%', 30),
  ('mood', 'Mood', 'fine', 'Fine', 'Detect PMS patterns', 'Slight adjustment of pre-period window', '+2% to +5%', 10),
  ('mood', 'Mood', 'mood_swings', 'Mood swings', 'Detect PMS patterns', 'Slight adjustment of pre-period window', '+2% to +5%', 20),
  ('mood', 'Mood', 'low_mood', 'Low mood', 'Detect PMS patterns', 'Slight adjustment of pre-period window', '+2% to +5%', 30),
  ('feelings', 'Feelings', 'mood_swings', 'Mood Swings', 'Detect PMS patterns', 'Slight adjustment of pre-period window', '+2% to +5%', 10),
  ('feelings', 'Feelings', 'not_in_control', 'Not in control', 'Detect PMS patterns', 'Slight adjustment of pre-period window', '+2% to +5%', 20),
  ('feelings', 'Feelings', 'fine', 'Fine', 'Detect PMS patterns', 'Slight adjustment of pre-period window', '+2% to +5%', 30)
on conflict (category_key, option_key) do update set
  category_label = excluded.category_label,
  option_label = excluded.option_label,
  purpose = excluded.purpose,
  prediction_effect = excluded.prediction_effect,
  confidence_impact = excluded.confidence_impact,
  sort_order = excluded.sort_order,
  is_active = true;
