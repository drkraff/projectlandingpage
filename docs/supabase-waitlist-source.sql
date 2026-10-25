-- Add nullable signup-source columns to public.waitlist.
-- Run this in the Supabase SQL editor BEFORE deploying the app that inserts them.
--
-- Without these columns, an insert that includes referrer_host, utm_source,
-- utm_medium, utm_campaign, or landing_path fails. The API then retries with
-- email only (Postgres 42703 / PostgREST PGRST204), so the signup can succeed
-- but the source is dropped. Run this script first so the source is stored.
--
-- Existing rows stay valid (every new column is nullable). Anon stays
-- INSERT-only: do not add a SELECT policy, RETURNING, or ON CONFLICT.

alter table public.waitlist
  add column if not exists referrer_host text,
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists landing_path text;
