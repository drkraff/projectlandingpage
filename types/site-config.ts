// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

export type Direction = "ltr" | "rtl";
export type ThemeMode = "light" | "dark" | "system";
export type PricingInterval = "monthly" | "annual";

export interface CtaButton {
  label: string;
  href: string;
  external?: boolean;
}

export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// ---------------------------------------------------------------------------
// SEO
// ---------------------------------------------------------------------------

export interface SeoConfig {
  siteName: string;
  title: string;
  titleTemplate?: string; // e.g. "%s | Vela"
  description: string;
  keywords?: string[];
  ogImage?: string;
  twitterHandle?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  /** Public contact address shown on FAQ / general inquiries */
  contactEmail?: string;
  /** Privacy / cookies contact; falls back to contactEmail */
  privacyEmail?: string;
}

// ---------------------------------------------------------------------------
// Theme
// ---------------------------------------------------------------------------

export interface ThemeConfig {
  defaultMode: ThemeMode;
  /** Tailwind/CSS custom property color token, e.g. "violet" */
  primaryColor: string;
  accentColor?: string;
  fontSans?: string;
  borderRadius?: "none" | "sm" | "md" | "lg" | "full";
}

// ---------------------------------------------------------------------------
// Locale
// ---------------------------------------------------------------------------

export interface LocaleConfig {
  defaultLocale: string;
  locales: string[];
  direction: Direction;
}

// ---------------------------------------------------------------------------
// Coming-soon mode
// ---------------------------------------------------------------------------

export interface ComingSoonConfig {
  enabled: boolean;
  headline: string;
  subheadline?: string;
  /** ISO date string — show a countdown if set */
  launchDate?: string;
  collectEmails?: boolean;
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export interface HeroConfig {
  enabled: boolean;
  badge?: string;
  headline: string;
  subheadline: string;
  primaryCta: CtaButton;
  secondaryCta?: CtaButton;
  /** Key social-proof line shown below CTA, e.g. "Trusted by 500+ teams" */
  socialProofLine?: string;
  media?: HeroMedia;
}

export type HeroMedia =
  | { type: "image"; image: ImageAsset }
  | { type: "video"; src: string; poster?: string };

// ---------------------------------------------------------------------------
// Social Proof
// ---------------------------------------------------------------------------

export interface LogoItem {
  name: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  href?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: ImageAsset;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface SocialProofConfig {
  enabled: boolean;
  heading?: string;
  logos?: LogoItem[];
  testimonials?: Testimonial[];
  metrics?: MetricItem[];
}

// ---------------------------------------------------------------------------
// Features
// ---------------------------------------------------------------------------

export type FeaturesLayout = "grid" | "list" | "alternating";

export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
  image?: ImageAsset;
  badge?: string;
}

export interface FeaturesConfig {
  enabled: boolean;
  headline: string;
  subheadline?: string;
  layout: FeaturesLayout;
  items: FeatureItem[];
}

// ---------------------------------------------------------------------------
// Pricing
// ---------------------------------------------------------------------------

export interface PricingPrice {
  monthly: number;
  annual: number;
  currency: string;
  currencySymbol: string;
}

export interface PricingTier {
  name: string;
  description: string;
  price: PricingPrice | "custom";
  badge?: string;
  highlighted?: boolean;
  features: string[];
  cta: CtaButton;
}

export interface PricingConfig {
  enabled: boolean;
  headline: string;
  subheadline?: string;
  showBillingToggle: boolean;
  defaultInterval: PricingInterval;
  tiers: PricingTier[];
}

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqConfig {
  enabled: boolean;
  headline: string;
  subheadline?: string;
  items: FaqItem[];
}

// ---------------------------------------------------------------------------
// Waitlist / CTA
// ---------------------------------------------------------------------------

export interface WaitlistConfig {
  enabled: boolean;
  headline: string;
  subheadline?: string;
  inputPlaceholder: string;
  submitLabel: string;
  successMessage: string;
  privacyNote?: string;
  /** Supabase table name to insert emails into */
  supabaseTable?: string;
}

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterLinkGroup {
  heading: string;
  items: FooterLink[];
}

export type SocialPlatform =
  | "twitter"
  | "github"
  | "linkedin"
  | "instagram"
  | "youtube"
  | "discord"
  | "tiktok"
  | "facebook";

export interface SocialLink {
  platform: SocialPlatform;
  href: string;
  label: string;
}

export interface LegalLinks {
  privacyHref?: string;
  termsHref?: string;
  cookiesHref?: string;
}

export interface FooterConfig {
  enabled: boolean;
  brand: {
    name: string;
    logo?: ImageAsset;
    tagline?: string;
  };
  linkGroups: FooterLinkGroup[];
  socials?: SocialLink[];
  legal?: LegalLinks;
  copyright: string;
}

// ---------------------------------------------------------------------------
// Root config
// ---------------------------------------------------------------------------

export interface SiteSections {
  hero: HeroConfig;
  socialProof: SocialProofConfig;
  features: FeaturesConfig;
  pricing: PricingConfig;
  faq: FaqConfig;
  waitlist: WaitlistConfig;
  footer: FooterConfig;
}

export interface SiteConfig {
  seo: SeoConfig;
  theme: ThemeConfig;
  locale: LocaleConfig;
  comingSoon: ComingSoonConfig;
  sections: SiteSections;
}
