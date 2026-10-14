import { Header } from "@/components/layout/header"
import { ComingSoonSection } from "@/components/sections/coming-soon-section"
import { HeroSection } from "@/components/sections/hero-section"
import { SocialProofSection } from "@/components/sections/social-proof-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { QuoteExampleSection } from "@/components/sections/quote-example-section"
import { DemoSection } from "@/components/sections/demo-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FaqSection } from "@/components/sections/faq-section"
import { WaitlistSection } from "@/components/sections/waitlist-section"
import { FooterSection } from "@/components/sections/footer-section"
import siteConfig from "@/lib/site.config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  alternates: {
    canonical: siteConfig.seo.canonicalUrl,
  },
  openGraph: {
    url: siteConfig.seo.canonicalUrl,
  },
}

export default function Home() {
  // Coming-soon mode replaces the full landing page
  if (siteConfig.comingSoon.enabled) {
    return <ComingSoonSection />
  }

  return (
    <>
      <Header />
      <main id="main-content">
        <HeroSection />
        <SocialProofSection />
        <FeaturesSection />
        <QuoteExampleSection />
        <DemoSection />
        <PricingSection />
        <FaqSection />
        <WaitlistSection />
      </main>
      <FooterSection />
    </>
  )
}
