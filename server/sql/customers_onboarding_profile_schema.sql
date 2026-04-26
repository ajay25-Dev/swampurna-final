-- Adds onboarding/profile fields captured from mobile onboarding flow.
-- Run this once in Supabase SQL editor.

alter table if exists public.customers
  add column if not exists onboarding_source text,
  add column if not exists birth_year integer,
  add column if not exists pregnancy_status text;

alter table if exists public.customers
  drop constraint if exists customers_birth_year_check;

alter table if exists public.customers
  add constraint customers_birth_year_check
  check (birth_year is null or (birth_year >= 1940 and birth_year <= 2100));

