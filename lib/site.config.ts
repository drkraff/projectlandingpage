import type { SiteConfig } from "@/types/site-config";

const siteConfig: SiteConfig = {
  // -------------------------------------------------------------------------
  // SEO
  // -------------------------------------------------------------------------
  seo: {
    siteName: "QuoteSnap",
    title: "QuoteSnap — Talk the job. Send the quote before you leave.",
    titleTemplate: "%s | QuoteSnap",
    description:
      "QuoteSnap turns a voice note from the driveway into a clean contractor quote — SMS, WhatsApp, or email — so you’re not retyping tonight.",
    keywords: [
      "QuoteSnap",
      "contractor quotes",
      "voice note to quote",
      "tradie quotes",
      "SMS quote",
      "WhatsApp quote",
      "Australia",
    ],
    ogImage: "/og-image.svg",
    canonicalUrl: "https://quotesnap.com.au",
    noIndex: false,
    contactEmail: "hello@quotesnap.com.au",
    privacyEmail: "privacy@quotesnap.com.au",
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
  // Coming-soon mode (unused — waitlist landing uses hero + FAQ instead)
  // -------------------------------------------------------------------------
  comingSoon: {
    enabled: false,
    headline: "Talk the job. Send the quote before you leave.",
    subheadline:
      "QuoteSnap turns a voice note from the driveway into a clean contractor quote — SMS, WhatsApp, or email — so you’re not retyping tonight.",
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
      subheadline:
        "QuoteSnap turns a voice note from the driveway into a clean contractor quote — SMS, WhatsApp, or email — so you’re not retyping tonight.",
      primaryCta: { label: "Join the waitlist", href: "/#waitlist" },
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
    // Features — honest capability + the night-after-tools-down pain
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
          title: "Voice note",
          description: "Talk the job from the driveway or the ute — before you leave.",
        },
        {
          icon: "file-text",
          title: "Professional quote",
          description: "QuoteSnap turns that note into a clean contractor quote.",
        },
        {
          icon: "send",
          title: "Send it",
          description: "SMS, WhatsApp, or email — so you’re not retyping tonight.",
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
          question: "What is it?",
          answer:
            "Voice note → professional quote → send by SMS/WhatsApp/email.",
        },
        {
          question: "Who’s it for?",
          answer:
            "Owner-operators and small crews who quote on the job or right after.",
        },
        {
          question: "Is it live?",
          answer: "Not yet — pre-MVP waitlist while we finish testing.",
        },
        {
          question: "Cost?",
          answer: "Undecided; early access people get first word.",
        },
        {
          question: "AU?",
          answer:
            "Built with AU tradies in mind; English-speaking markets next.",
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
      successMessage: "You’re on the list. We’ll email when QuoteSnap is ready to try.",
      privacyNote: "We’ll only use this to tell you when it’s ready. No spam.",
      supabaseTable: "waitlist",
    },

    // -----------------------------------------------------------------------
    // Footer
    // -----------------------------------------------------------------------
    footer: {
      enabled: true,
      brand: {
        name: "QuoteSnap",
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
      ],
      socials: [],
      legal: {
        privacyHref: "/privacy",
        termsHref: "/terms",
        cookiesHref: "/cookies",
      },
      copyright: `© ${new Date().getFullYear()} QuoteSnap. All rights reserved.`,
    },
  },
};

export default siteConfig;
