# Owner checklist

The live site is **https://www.velaquote.com**. Apex `velaquote.com` redirects to www. `seo.canonicalUrl`, the sitemap, robots, and the Open Graph image already use that origin.

## 1. Supabase waitlist

Public env (see `.env.example`; never use the service-role key in this app):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Set the same values in the Vercel project for Production and Preview.

`docs/supabase-waitlist.sql` is a script to run by hand. It is not a migration, so the repo cannot prove the live database matches it. In the Supabase SQL editor, confirm:

- `select relrowsecurity from pg_class where relname = 'waitlist';` is true
- `select polname, cmd from pg_policies where tablename = 'waitlist';` shows one policy, INSERT, for anon — no SELECT, UPDATE, or DELETE policy
- `select grantee, privilege_type from information_schema.role_table_grants where table_name = 'waitlist' and grantee in ('anon', 'authenticated');` shows anon INSERT only

The key in Vercel named `NEXT_PUBLIC_SUPABASE_ANON_KEY` must be the anon key, not the service_role key. The service_role key bypasses RLS. It must not be added to this app.

## 2. Vercel Firewall

The API has an in-memory rate limit. Complement it in production:

- Vercel Dashboard → Firewall
- Rate-limit **POST** `/api/waitlist`
- Suggested starting point: 8 requests / 10 minutes / IP (matches `lib/rate-limit.ts`)

## 3. Mailboxes

The website domain is live. These addresses are on `vela.io`, not `velaquote.com`, and are still not confirmed as receiving mail:

- `ofer@velaquote.com`
- `privacy@vela.io`

Set up mailboxes before treating those addresses as live. Do not point canonical back at `projectlandingpage.vercel.app`.

## 4. Do not ship yet

- Social proof and pricing stay off (no invented traction or price).
- GitHub repo and Vercel project names can stay `projectlandingpage`.
