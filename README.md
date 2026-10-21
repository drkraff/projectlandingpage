# Vela

Pre-MVP waitlist for **Vela** (pronounced VAY-lah): talk the job, send the quote before you leave.

A voice note from the driveway becomes a clean contractor quote — SMS, WhatsApp, or email.

Public site: [https://www.velaquote.com](https://www.velaquote.com) (apex `velaquote.com` redirects to www).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and set the public Supabase keys if you want waitlist signups to persist.

## Content

Landing copy, SEO, and section toggles live in `lib/site.config.ts`.

Social proof and pricing stay disabled. No invented traction.

## Legal / email

Intended addresses (pending DNS — not live):

- `hello@vela.io`
- `privacy@vela.io`

Canonical, sitemap, robots, and the Open Graph image use `https://www.velaquote.com`. `hello@vela.io` and `privacy@vela.io` are still intended mailboxes on a different domain — do not assume that mail is delivered.

Owner setup (Supabase RLS, Vercel Firewall, domain cutover): [`docs/OWNER-CHECKLIST.md`](docs/OWNER-CHECKLIST.md).

## Scripts

```bash
npm run lint
npm run build
```
