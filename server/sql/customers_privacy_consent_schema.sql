-- Records that a customer actually accepted the privacy policy / terms of
-- use shown during onboarding, instead of that acceptance only existing as
-- a transient "don't show this screen again" flag on the device.
-- Run this once in Supabase SQL editor.

alter table if exists public.customers
  add column if not exists privacy_policy_accepted boolean,
  add column if not exists privacy_policy_version text,
  add column if not exists privacy_policy_accepted_at timestamptz;
