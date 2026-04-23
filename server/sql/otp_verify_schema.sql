-- Run this SQL in Supabase SQL Editor.
-- OTP storage for email login verification.

create extension if not exists pgcrypto;

create table if not exists public.otp_verify (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  email text not null,
  purpose text not null default 'login',
  otp_hash text not null,
  expires_at timestamptz not null,
  verified boolean not null default false,
  verified_at timestamptz,
  attempts int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_otp_verify_lookup
  on public.otp_verify(email, purpose, is_active, verified, created_at desc);

create or replace function public.set_otp_verify_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_otp_verify_updated_at on public.otp_verify;
create trigger trg_otp_verify_updated_at
before update on public.otp_verify
for each row
execute procedure public.set_otp_verify_updated_at();
