-- Run this SQL in Supabase SQL Editor.
-- Adds extra tracking fields from app "Edit period tracker" screen.

alter table if exists public.period_tracker_symptoms
  add column if not exists spotting text,
  add column if not exists pain_type text,
  add column if not exists sleep_quality text,
  add column if not exists sex_life text,
  add column if not exists energy_level text;

