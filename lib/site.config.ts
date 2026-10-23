import type { SiteConfig } from "@/types/site-config";

const siteConfig: SiteConfig = {
  // -------------------------------------------------------------------------
  // SEO
  // -------------------------------------------------------------------------
  seo: {
    siteName: "Vela",
    title: "Voice to Quote App for Contractors | Vela",
    titleTemplate: "%s | Vela",
    description:
      "Talk the job on site and Vela turns your voice note into a clean quote you can share by WhatsApp or email before you leave. Join the early-access waitlist.",
    // Absolute so og:image / twitter:image do not depend on the request host.
    ogImage: "https://www.velaquote.com/og-image.png",
    // Apex velaquote.com redirects here.
    canonicalUrl: "https://www.velaquote.com",
    noIndex: false,
    // Intended mailboxes. Pending DNS — vela.io is not purchased or pointed.
    // These addresses are not live; do not assume mail is received.
    contactEmail: "ofer@velaquote.com",
    privacyEmail: "privacy@vela.io",
  },

  // -------------------------------------------------------------------------
  // Theme
  // -------------------------------------------------------------------------
  theme: {
    // Visual tokens live in app/globals.css (screenshot-matched; quoteSnap
    // theme files were not readable from this environment).
    defaultMode: "dark",
    primaryColor: "orange",
    accentColor: "orange",
    borderRadius: "lg",
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
  // Coming-soon mode (unused — waitlist landing uses hero + FAQ instead)
  // -------------------------------------------------------------------------
  comingSoon: {
    enabled: false,
    headline: "Talk the job. Send the quote before you leave.",
    subheadline:
      "A voice note from the driveway becomes a clean contractor quote — WhatsApp or email (SMS coming) — so you’re not retyping after tools-down.",
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
      badge: "Pre-MVP waitlist",
      headline: "Talk the job. Send the quote before you leave.",
      lead:
        "Vela is a voice-to-quote app for electricians, plumbers and handymen: record a voice note on site and get a professional quote to send by WhatsApp or email.",
      subheadline:
        "A voice note from the driveway becomes a clean contractor quote — WhatsApp or email (SMS coming) — so you’re not retyping after tools-down.",
      primaryCta: { label: "Join the waitlist", href: "/#waitlist" },
      // Audience line under the headline (not a second CTA).
      secondaryCta: { label: "For owner-operators who quote on-site", href: "/#features" },
    },

    // -----------------------------------------------------------------------
    // Social Proof — disabled. No invented traction.
    // -----------------------------------------------------------------------
    socialProof: {
      enabled: false,
      logos: [],
      metrics: [],
      testimonials: [],
    },

    // -----------------------------------------------------------------------
    // Features
    // -----------------------------------------------------------------------
    features: {
      enabled: true,
      headline: "Drowning in estimates every night after the tools go down.",
      subheadline:
        "By morning the urgency’s gone. Take 2–3 days and you feel like you lose the job half the time.",
      layout: "list",
      items: [
        {
          icon: "mic",
          title: "Talk it on site",
          description: "Capture the job as a voice note while you’re still there.",
        },
        {
          icon: "file-text",
          title: "Get a clean quote",
          description: "Turn that note into a professional quote you can review.",
        },
        {
          icon: "send",
          title: "Send before you leave",
          description: "WhatsApp or email (SMS coming) — quote in their hand same visit.",
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Pricing — disabled. Cost is undecided.
    // -----------------------------------------------------------------------
    pricing: {
      enabled: false,
      headline: "",
      showBillingToggle: false,
      defaultInterval: "monthly",
      tiers: [],
    },

    // -----------------------------------------------------------------------
    // FAQ
    // -----------------------------------------------------------------------
    faq: {
      enabled: true,
      headline: "Straight answers",
      subheadline: "Pre-MVP. No spin.",
      items: [
        {
          question: "What is Vela?",
          answer:
            "Voice note → professional quote → send by WhatsApp or email (SMS coming).",
        },
        {
          question: "Who’s it for?",
          answer:
            "Electricians, plumbers and handymen — owner-operators and small crews who quote on-site or right after.",
        },
        {
          question: "Is it live?",
          answer: "Not yet — this is a pre-MVP waitlist.",
        },
        {
          question: "What does it cost?",
          answer: "Undecided. Early access hears first.",
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Waitlist / CTA
    // -----------------------------------------------------------------------
    waitlist: {
      enabled: true,
      headline: "Join the waitlist",
      subheadline: "For owner-operators who quote on-site.",
      inputPlaceholder: "you@email.com",
      submitLabel: "Join the waitlist",
      successMessage: "You’re on the list. We’ll email when Vela is ready to try.",
      privacyNote:
        "Email only. We’ll write when Vela is ready to try — nothing else.",
      supabaseTable: "waitlist",
    },

    // -----------------------------------------------------------------------
    // Footer
    // -----------------------------------------------------------------------
    footer: {
      enabled: true,
      brand: {
        name: "Vela",
        tagline: "Talk the job. Send the quote before you leave.",
      },
      linkGroups: [
        {
          heading: "On this page",
          items: [
            { label: "How it works", href: "/#features" },
            { label: "FAQ", href: "/#faq" },
            { label: "Waitlist", href: "/#waitlist" },
          ],
        },
        {
          heading: "Trades",
          items: [
            {
              label: "Voice to quote for electricians",
              href: "/voice-to-quote-electricians",
            },
          ],
        },
      ],
      socials: [],
      legal: {
        privacyHref: "/privacy",
        termsHref: "/terms",
        cookiesHref: "/cookies",
      },
      copyright: `© ${new Date().getFullYear()} Vela`,
    },
  },
};

export default siteConfig;
