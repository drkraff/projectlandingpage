import type { SiteConfig } from "@/types/site-config";

const siteConfig: SiteConfig = {
  // -------------------------------------------------------------------------
  // SEO
  // -------------------------------------------------------------------------
  seo: {
    siteName: "Acme",
    title: "Acme — The best way to do X",
    titleTemplate: "%s | Acme",
    description: "Acme helps teams do X faster. Start free, no credit card needed.",
    keywords: ["saas", "productivity", "tool"],
    ogImage: "/og-image.svg",
    twitterHandle: "@acmehq",
    canonicalUrl: "https://acme.com",
    noIndex: false,
  },

  // -------------------------------------------------------------------------
  // Theme
  // -------------------------------------------------------------------------
  theme: {
    defaultMode: "system",
    primaryColor: "violet",
    accentColor: "sky",
    borderRadius: "md",
  },

  // -------------------------------------------------------------------------
  // Locale
  // -------------------------------------------------------------------------
  locale: {
    defaultLocale: "en",
    locales: ["en"],
    direction: "ltr",
  },

  // -------------------------------------------------------------------------
  // Coming-soon mode
  // -------------------------------------------------------------------------
  comingSoon: {
    enabled: false,
    headline: "Something great is coming.",
    subheadline: "We're putting the finishing touches on it. Enter your email to be first in line.",
    launchDate: "2026-06-01T00:00:00Z",
    collectEmails: true,
  },

  // -------------------------------------------------------------------------
  // Sections
  // -------------------------------------------------------------------------
  sections: {
    // -----------------------------------------------------------------------
    // Hero
    // -----------------------------------------------------------------------
    hero: {
      enabled: true,
      badge: "Now in public beta",
      headline: "The fastest way to build X",
      subheadline:
        "Acme gives your team everything you need to ship faster — without the complexity.",
      primaryCta: { label: "Get started free", href: "#waitlist" },
      secondaryCta: { label: "See how it works", href: "#features" },
      socialProofLine: "Loved by 2,000+ teams worldwide",
      media: undefined,
    },

    // -----------------------------------------------------------------------
    // Social Proof
    // -----------------------------------------------------------------------
    socialProof: {
      enabled: true,
      heading: "Trusted by teams at",
      logos: [
        { name: "Vercel", src: "/logos/vercel.svg", alt: "Vercel logo", width: 80, height: 20 },
        { name: "Linear", src: "/logos/linear.svg", alt: "Linear logo", width: 80, height: 20 },
        { name: "Stripe", src: "/logos/stripe.svg", alt: "Stripe logo", width: 80, height: 20 },
      ],
      metrics: [
        { value: "2,000+", label: "Teams" },
        { value: "99.9%", label: "Uptime" },
        { value: "4.9/5", label: "Avg. rating" },
      ],
      testimonials: [
        {
          quote: "Shipped our landing page in under an hour. Config-driven content means anyone on the team can update copy without touching code.",
          author: "Sarah Chen",
          role: "CTO",
          company: "Linear",
          avatar: { src: "https://i.pravatar.cc/400?img=47", alt: "Sarah Chen", width: 400, height: 400 },
        },
        {
          quote: "We replaced our old static site in a weekend. The editorial design system is exactly what modern SaaS should look like.",
          author: "Marcus Webb",
          role: "Founder",
          company: "Vercel",
          avatar: { src: "https://i.pravatar.cc/400?img=11", alt: "Marcus Webb", width: 400, height: 400 },
        },
        {
          quote: "Finally a landing page template that doesn't look like a template. Distinctive typography and real design thinking.",
          author: "Priya Nair",
          role: "Head of Marketing",
          company: "Stripe",
          avatar: { src: "https://i.pravatar.cc/400?img=45", alt: "Priya Nair", width: 400, height: 400 },
        },
        {
          quote: "The dark editorial aesthetic is rare. Most SaaS templates look identical. This one has a point of view.",
          author: "Tom Okafor",
          role: "Product Lead",
          company: "Loom",
          avatar: { src: "https://i.pravatar.cc/400?img=12", alt: "Tom Okafor", width: 400, height: 400 },
        },
        {
          quote: "Dark mode done right. Consistent color language throughout. No gradient soup anywhere on the page.",
          author: "Elan Russo",
          role: "CEO",
          company: "Retool",
          avatar: { src: "https://i.pravatar.cc/400?img=53", alt: "Elan Russo", width: 400, height: 400 },
        },
        {
          quote: "I've evaluated 12 landing page templates. This is the only one that passes a real design review.",
          author: "Jamie Yuen",
          role: "Design Engineer",
          company: "Figma",
          avatar: { src: "https://i.pravatar.cc/400?img=32", alt: "Jamie Yuen", width: 400, height: 400 },
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Features
    // -----------------------------------------------------------------------
    features: {
      enabled: true,
      headline: "Everything you need, nothing you don't",
      subheadline: "Acme is designed to get out of your way and let you focus on what matters.",
      layout: "grid",
      items: [
        {
          icon: "zap",
          title: "Blazing fast",
          description: "Built on edge infrastructure so your users never wait.",
        },
        {
          icon: "shield",
          title: "Secure by default",
          description: "SOC2 Type II certified with end-to-end encryption.",
        },
        {
          icon: "sliders",
          title: "Fully customizable",
          description: "Adapt every workflow to your team's exact process.",
        },
        {
          icon: "bar-chart-2",
          title: "Real-time analytics",
          description: "Know what's happening the moment it happens.",
        },
        {
          icon: "plug",
          title: "Integrates with everything",
          description: "Connects to 100+ tools your team already uses.",
        },
        {
          icon: "headphones",
          title: "World-class support",
          description: "Human support, 24/7. No bots, no tickets, just answers.",
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Pricing
    // -----------------------------------------------------------------------
    pricing: {
      enabled: true,
      headline: "Simple, transparent pricing",
      subheadline: "Start free. Upgrade when you're ready. No hidden fees.",
      showBillingToggle: true,
      defaultInterval: "monthly",
      tiers: [
        {
          name: "Free",
          description: "For individuals and small projects.",
          price: {
            monthly: 0,
            annual: 0,
            currency: "USD",
            currencySymbol: "$",
          },
          features: [
            "Up to 3 projects",
            "1 GB storage",
            "Community support",
          ],
          cta: { label: "Get started free", href: "#waitlist" },
        },
        {
          name: "Pro",
          description: "For growing teams that need more.",
          badge: "Most popular",
          highlighted: true,
          price: {
            monthly: 29,
            annual: 24,
            currency: "USD",
            currencySymbol: "$",
          },
          features: [
            "Unlimited projects",
            "50 GB storage",
            "Priority support",
            "Advanced analytics",
            "Custom integrations",
          ],
          cta: { label: "Start free trial", href: "#waitlist" },
        },
        {
          name: "Enterprise",
          description: "Custom contracts, SLAs, and dedicated support.",
          price: "custom",
          features: [
            "Everything in Pro",
            "Unlimited storage",
            "SSO / SAML",
            "Dedicated success manager",
            "Custom SLA",
          ],
          cta: { label: "Talk to sales", href: "mailto:sales@acme.com", external: true },
        },
      ],
    },

    // -----------------------------------------------------------------------
    // FAQ
    // -----------------------------------------------------------------------
    faq: {
      enabled: true,
      headline: "Frequently asked questions",
      subheadline: "Can't find what you're looking for? Reach out to our support team.",
      items: [
        {
          question: "Do I need a credit card to sign up?",
          answer: "No. You can start for free without a credit card. Upgrade any time.",
        },
        {
          question: "Can I cancel my subscription at any time?",
          answer: "Yes. Cancel any time from your account settings. No questions asked.",
        },
        {
          question: "Is there a free trial for paid plans?",
          answer: "Yes. Every paid plan includes a 14-day free trial.",
        },
        {
          question: "Do you offer discounts for non-profits or startups?",
          answer: "Yes. Email us at billing@acme.com and we'll set you up.",
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Waitlist / CTA
    // -----------------------------------------------------------------------
    waitlist: {
      enabled: true,
      headline: "Be the first to know",
      subheadline: "Join thousands of teams already on the waitlist.",
      inputPlaceholder: "you@company.com",
      submitLabel: "Join the waitlist",
      successMessage: "You're on the list! We'll be in touch soon.",
      privacyNote: "No spam. Unsubscribe any time.",
      supabaseTable: "waitlist",
    },

    // -----------------------------------------------------------------------
    // Footer
    // -----------------------------------------------------------------------
    footer: {
      enabled: true,
      brand: {
        name: "Acme",
        logo: { src: "/logo.svg", alt: "Acme logo", width: 80, height: 24 },
        tagline: "Ship faster with less friction.",
      },
      linkGroups: [
        {
          heading: "Product",
          items: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Changelog", href: "/changelog" },
            { label: "Roadmap", href: "/roadmap" },
          ],
        },
        {
          heading: "Company",
          items: [
            { label: "About", href: "/about" },
            { label: "Blog", href: "/blog" },
            { label: "Careers", href: "/careers" },
            { label: "Contact", href: "/contact" },
          ],
        },
        {
          heading: "Developers",
          items: [
            { label: "Docs", href: "/docs" },
            { label: "API Reference", href: "/docs/api" },
            { label: "Status", href: "https://status.acme.com", external: true },
          ],
        },
      ],
      socials: [
        { platform: "twitter", href: "https://twitter.com/acmehq", label: "Twitter" },
        { platform: "github", href: "https://github.com/acmehq", label: "GitHub" },
        { platform: "discord", href: "https://discord.gg/acme", label: "Discord" },
      ],
      legal: {
        privacyHref: "/privacy",
        termsHref: "/terms",
        cookiesHref: "/cookies",
      },
      copyright: `© ${new Date().getFullYear()} Acme, Inc. All rights reserved.`,
    },
  },
};

export default siteConfig;
