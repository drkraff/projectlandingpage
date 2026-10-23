-- Waitlist table + RLS for the public signup API.
-- Run this in the Supabase SQL editor.
--
-- The app uses the anon key only (see .env.example). Do not put a service-role
-- key in the Next.js app. Unique email violations (Postgres 23505) are treated
-- as success in app/api/waitlist — duplicate signups must not leak existence.
--
-- Source columns are nullable text. CREATE TABLE IF NOT EXISTS does not add
-- them when public.waitlist already exists. Run docs/supabase-waitlist-source.sql
-- before deploying that insert — without those columns, a signup that sends
-- source fields fails until the API retries with email only.

create table if not exists public.waitlist (
  email text not null unique,
  created_at timestamptz not null default now(),
  referrer_host text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_path text
);

alter table public.waitlist enable row level security;

-- Default privileges often grant anon/authenticated full CRUD. Policies do not
-- revoke those grants — strip them, then allow INSERT only.
revoke all on table public.waitlist from anon, authenticated;
grant insert on table public.waitlist to anon;

-- Anon INSERT only. No SELECT (or UPDATE/DELETE) policy for anon.
-- The waitlist route inserts without .select(); do not add RETURNING / .select()
-- or ON CONFLICT in the API, because those require a SELECT policy.
create policy "anon_insert_waitlist"
  on public.waitlist
  for insert
  to anon
  with check (true);
