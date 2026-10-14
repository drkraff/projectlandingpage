# Vela

Android beta signup for **Vela** (pronounced VAY-lah): talk through the job, get a clean quote before you leave the driveway.

A voice note becomes a quote you review, then a PDF. For US owner-operator electricians, plumbers, and handymen. iPhone users can join the same waitlist.

Public URL until DNS: [https://projectlandingpage.vercel.app](https://projectlandingpage.vercel.app)

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

Do not assume `vela.io` is purchased or pointed. Keep the canonical URL on `https://projectlandingpage.vercel.app` until the owner buys and points a domain and mailbox.

Owner setup (Supabase RLS, Vercel Firewall, domain cutover): [`docs/OWNER-CHECKLIST.md`](docs/OWNER-CHECKLIST.md).

## Scripts

```bash
npm run lint
npm run build
```
