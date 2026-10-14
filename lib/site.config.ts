import type { SiteConfig } from "@/types/site-config";

const siteConfig: SiteConfig = {
  // -------------------------------------------------------------------------
  // SEO
  // -------------------------------------------------------------------------
  seo: {
    siteName: "Vela",
    title: "Vela — Talk through the job. Get a clean quote before you leave the driveway.",
    titleTemplate: "%s | Vela",
    description:
      "Vela turns a voice note about a job into a quote you review, then a PDF. Android beta for US owner-operator electricians, plumbers, and handymen.",
    keywords: [
      "Vela",
      "contractor quote",
      "electrician quote",
      "plumber quote",
      "handyman quote",
      "voice note to quote",
      "Android beta",
    ],
    ogImage: "/og-image.png",
    // Public URL until DNS. Do not switch canonical off vercel.app until
    // the owner buys and points a domain.
    canonicalUrl: "https://projectlandingpage.vercel.app",
    noIndex: false,
    // Intended mailboxes. Pending DNS — vela.io is not purchased or pointed.
    // These addresses are not live; do not assume mail is received.
    contactEmail: "hello@vela.io",
    privacyEmail: "privacy@vela.io",
  },

  // -------------------------------------------------------------------------
  // Theme
  // -------------------------------------------------------------------------
  theme: {
    defaultMode: "dark",
    primaryColor: "sage",
    accentColor: "sage",
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
  // Coming-soon mode (unused — the beta landing is the live page)
  // -------------------------------------------------------------------------
  comingSoon: {
    enabled: false,
    headline: "Talk through the job. Get a clean quote before you leave the driveway.",
    subheadline:
      "A voice note about the job becomes a quote you can review, then send as a PDF.",
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
      badge: "Android beta · United States",
      headline:
        "Talk through the job. Get a clean quote before you leave the driveway.",
      subheadline:
        "For owner-operators — electricians, plumbers, and handymen. A voice note about the job becomes a quote you review, then a PDF.",
      primaryCta: { label: "Get the Android beta", href: "/#waitlist" },
      secondaryCta: { label: "On iPhone? Join the waitlist", href: "/#waitlist" },
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
    // How it works
    // -----------------------------------------------------------------------
    features: {
      enabled: true,
      headline: "How it works",
      subheadline: "Three steps. You check the price, and you decide what gets sent.",
      layout: "list",
      items: [
        {
          icon: "mic",
          title: "Talk through the job",
          description:
            "Record a voice note while you are still there. Room size in feet, hours, and the parts you saw.",
        },
        {
          icon: "file-text",
          title: "Review the quote",
          description:
            "Vela drafts the line items in dollars, where each price came from, sales tax, and what is not included.",
        },
        {
          icon: "send",
          title: "Send the PDF",
          description: "When it looks right, send it. Nothing goes out before you review it.",
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Sample quote — illustration, not a customer story
    // -----------------------------------------------------------------------
    quoteExample: {
      enabled: true,
      headline: "A sample quote",
      subheadline:
        "A kitchen job, written the way the draft should read. The prices and the tax rate are examples.",
      sampleLabel: "Sample",
      customer: "Mike Johnson",
      jobTitle: "Kitchen",
      jobDetail:
        "12 ft × 10 ft kitchen. Six recessed lights, and two GFCI outlets by the sink.",
      lines: [
        {
          description: "Recessed lights",
          detail: "6 × $85",
          amount: 510,
          source: "Your price list",
        },
        {
          description: "GFCI outlets",
          detail: "2 × $60",
          amount: 120,
          source: "Your price list",
        },
        {
          description: "Labor",
          detail: "3 hrs × $95/hr",
          amount: 285,
          source: "Your hourly rate",
        },
        {
          description: "Materials",
          detail: "40 ft of 14/2, boxes, and connectors",
          amount: 150,
          source: "From the voice note",
        },
      ],
      taxRate: 0.0825,
      taxLabel: "Sales tax (8.25%)",
      taxNote:
        "Example rate for this sample. You set the rate for the job’s state before you send.",
      notIncludedTitle: "Not included",
      notIncluded: [
        "Permit and inspection",
        "Drywall patch and paint",
        "Panel upgrade",
        "Trim rings, if the homeowner is supplying the cans",
      ],
      steps: [
        { label: "Talk", status: "done" },
        { label: "Review", status: "current" },
        { label: "Send", status: "upcoming" },
      ],
      reviewNote: "You review this quote before it can be sent.",
    },

    // -----------------------------------------------------------------------
    // Demo — hidden until videoUrl is a public https URL
    // -----------------------------------------------------------------------
    demo: {
      enabled: true,
      videoUrl: "",
      title: "One minute",
      caption: "A 60-second look: voice note, then the quote.",
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
      headline: "Questions",
      subheadline: "Plain answers.",
      items: [
        {
          question: "What is Vela?",
          answer:
            "You talk through a job. Vela drafts a quote. You review it, then send a PDF.",
        },
        {
          question: "Who is it for?",
          answer:
            "Owner-operators in the US: electricians, plumbers, and handymen who quote their own work.",
        },
        {
          question: "Can I try it?",
          answer:
            "The Android beta is open for sign-up on this page. If you use an iPhone, use the same form to join the waitlist.",
        },
        {
          question: "Does it send the quote by itself?",
          answer: "No. You review the draft first. Nothing is sent until you say so.",
        },
        {
          question: "What does it cost?",
          answer: "Not decided yet. People on the beta list hear first.",
        },
      ],
    },

    // -----------------------------------------------------------------------
    // Android beta / waitlist
    // -----------------------------------------------------------------------
    waitlist: {
      enabled: true,
      headline: "Get the Android beta",
      subheadline:
        "US owner-operators. Electricians, plumbers, and handymen. iPhone users can join the waitlist here too.",
      inputPlaceholder: "you@email.com",
      submitLabel: "Get the Android beta",
      iphoneSubmitLabel: "Join the waitlist",
      successMessage: "You’re on the list. We’ll email when there’s a build to try.",
      privacyNote: "Email, trade, and state. We’ll write about the beta — nothing else.",
      tradeLabel: "Trade",
      stateLabel: "State",
      platformLabel: "Phone",
      androidOption: "Android — get the beta",
      iphoneOption: "iPhone — join the waitlist",
      trades: [
        { value: "electrician", label: "Electrician" },
        { value: "plumber", label: "Plumber" },
        { value: "handyman", label: "Handyman" },
      ],
      supabaseTable: "waitlist",
    },

    // -----------------------------------------------------------------------
    // Footer
    // -----------------------------------------------------------------------
    footer: {
      enabled: true,
      brand: {
        name: "Vela",
        tagline:
          "Talk through the job. Get a clean quote before you leave the driveway.",
        founderLine: "Built by Ofer, the founder.",
      },
      linkGroups: [
        {
          heading: "On this page",
          items: [
            { label: "How it works", href: "/#how-it-works" },
            { label: "Example quote", href: "/#example" },
            { label: "FAQ", href: "/#faq" },
            { label: "Android beta", href: "/#waitlist" },
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
