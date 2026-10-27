import { Header } from "@/components/layout/header"
import { ComingSoonSection } from "@/components/sections/coming-soon-section"
import { HeroSection } from "@/components/sections/hero-section"
import { SocialProofSection } from "@/components/sections/social-proof-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FaqSection } from "@/components/sections/faq-section"
import { WaitlistSection } from "@/components/sections/waitlist-section"
import { FooterSection } from "@/components/sections/footer-section"
import { JsonLd } from "@/components/seo/json-ld"
import { pageSocialMetadata } from "@/lib/seo"
import { homeJsonLd } from "@/lib/structured-data"
import siteConfig from "@/lib/site.config"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: siteConfig.seo.title },
  ...pageSocialMetadata("/", {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
  }),
}

export default function Home() {
  if (siteConfig.comingSoon.enabled) {
    return <ComingSoonSection />
  }

  return (
    <>
      <JsonLd data={homeJsonLd()} />
      <Header />
      <main id="main-content">
        <HeroSection />
        <SocialProofSection />
        <FeaturesSection />
        <PricingSection />
        <FaqSection />
        <WaitlistSection />
      </main>
      <FooterSection />
    </>
  )
}
