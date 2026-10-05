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
allows anon INSERT and nothing else. Duplicate emails (unique violation 23505)
are treated as success in `/api/waitlist`. Missing/invalid Supabase env returns
503 without leaking a stack.

## Public URL until DNS
https://projectlandingpage.vercel.app

Do not switch canonical off this host until a domain and mailbox are purchased and pointed.

## Intended email (pending DNS — not live)
- hello@vela.io
- privacy@vela.io

Owner setup (Supabase RLS, Vercel Firewall, domain, mailboxes): `docs/OWNER-CHECKLIST.md`

## Structure
/app          - routes and pages
/components   - shared components
/lib          - site.config.ts + utilities
/types        - shared types
/docs         - owner checklist
