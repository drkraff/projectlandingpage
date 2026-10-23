# Vela

## Goal
Pre-MVP waitlist landing page for **Vela**.

Talk the job. Send the quote before you leave.

Content is driven by `lib/site.config.ts`. Social proof and pricing stay off until there is real traction and a decided price.

## Stack
Next.js, TypeScript, Tailwind CSS, shadcn/ui
Supabase (waitlist), next-themes (dark/light)

## Waitlist
Public signup uses the anon key only. Apply `docs/supabase-waitlist.sql` so RLS
allows anon INSERT and nothing else. If the table already exists, run
`docs/supabase-waitlist-source.sql` before deploying — inserts that include the
source columns fail until those columns exist. Duplicate emails (unique
violation 23505) are treated as success in `/api/waitlist`. A missing source
column (Postgres 42703 or PostgREST PGRST204) retries the insert with email
only. Missing/invalid Supabase env returns 503 without leaking a stack.

## Public URL
https://www.velaquote.com

Apex `velaquote.com` redirects to www. Canonical, sitemap, robots, and the social card use that origin.

## Intended email (pending DNS — not live)
- ofer@velaquote.com
- privacy@vela.io

Owner setup (Supabase RLS, Vercel Firewall, domain, mailboxes): `docs/OWNER-CHECKLIST.md`

## Structure
/app          - routes and pages
/components   - shared components
/lib          - site.config.ts + utilities
/types        - shared types
/docs         - owner checklist
