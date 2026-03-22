# ProjectLandingPage

## Goal
Config-driven SaaS landing page template.
One site.config.ts controls all content.
Deploy a new landing page for any SaaS idea by editing only the config.

## Stack
Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
Supabase (waitlist), next-themes (dark/light), next-intl (LTR/RTL)

## Sections (all toggleable via config)
Hero, Social Proof, Features, Pricing, FAQ, Waitlist/CTA, Footer

## Core features (always on)
SEO metadata, cookie consent, analytics events,
dark/light mode toggle, coming-soon/live mode, LTR/RTL support

## Structure
/app          - routes and pages
/components   - shared components
/lib          - site.config.ts + utilities
/types        - shared types

## Current phase
Phase 1 — site.config.ts schema + project structure