# Owner checklist

Canonical host stays **https://projectlandingpage.vercel.app** until a domain and mailboxes are purchased and pointed. Do not change `seo.canonicalUrl` before that.

## 1. Supabase waitlist

Public env (see `.env.example`; never use the service-role key in this app):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Set the same values in the Vercel project for Production and Preview.

RLS on table `waitlist`:

- Allow **anon INSERT only**
- Do **not** grant anon SELECT, UPDATE, or DELETE
- Unique constraint on email is fine (API treats duplicates as success)

## 2. Vercel Firewall

The API has an in-memory rate limit. Complement it in production:

- Vercel Dashboard → Firewall
- Rate-limit **POST** `/api/waitlist`
- Suggested starting point: 8 requests / 10 minutes / IP (matches `lib/rate-limit.ts`)

## 3. Domain cutover (after purchase)

1. Buy the domain and point DNS to Vercel.
2. Add the domain on the Vercel project; wait until HTTPS is live.
3. Set up mailboxes **before** treating emails as live:
   - `hello@vela.io`
   - `privacy@vela.io`
4. Then change `seo.canonicalUrl` in `lib/site.config.ts` to the new origin.
5. Confirm production: title, canonical, OG URL, footer, legal pages, waitlist POST.

Until those steps are done, keep canonical on `https://projectlandingpage.vercel.app`. `hello@vela.io` / `privacy@vela.io` are intended addresses only — pending DNS, not live inboxes.

## 4. Do not ship yet

- Social proof and pricing stay off (no invented traction or price).
- GitHub repo and Vercel project names can stay `projectlandingpage`.
