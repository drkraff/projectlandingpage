# Vela

Pre-MVP waitlist for **Vela** (pronounced VAY-lah): talk the job, send the quote before you leave.

A voice note from the driveway becomes a clean contractor quote — WhatsApp or email (SMS coming).

Public site: [https://www.velaquote.com](https://www.velaquote.com) (apex `velaquote.com` redirects to www).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set the public Supabase keys if you want waitlist signups to persist.
Set `CRON_SECRET` on the Vercel project to a long random value.
Vercel Cron sends it as `Authorization: Bearer <CRON_SECRET>` to `GET /api/cron/keepalive` on `0 6 * * *` UTC.
Until that variable is set, the route returns 401 and does not query Supabase.

## Content

Landing copy, SEO, and section toggles live in `lib/site.config.ts`.

Social proof and pricing stay disabled. No invented traction.

## Legal / email

Intended addresses (pending DNS — not live):

- `ofer@velaquote.com`
- `privacy@vela.io`

Canonical, sitemap, robots, and the Open Graph image use `https://www.velaquote.com`. `ofer@velaquote.com` and `privacy@vela.io` are still intended mailboxes on a different domain — do not assume that mail is delivered.

Owner setup (Supabase RLS, Vercel Firewall, domain cutover): [`docs/OWNER-CHECKLIST.md`](docs/OWNER-CHECKLIST.md).

## Scripts

```bash
npm run lint
npm run build
```
