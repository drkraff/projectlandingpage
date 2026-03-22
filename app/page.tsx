import { Header } from "@/components/layout/header"
import { ComingSoonSection } from "@/components/sections/coming-soon-section"
import { HeroSection } from "@/components/sections/hero-section"
import { SocialProofSection } from "@/components/sections/social-proof-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { FaqSection } from "@/components/sections/faq-section"
import { WaitlistSection } from "@/components/sections/waitlist-section"
import { FooterSection } from "@/components/sections/footer-section"
import siteConfig from "@/lib/site.config"

export default function Home() {
  // Coming-soon mode replaces the full landing page
  if (siteConfig.comingSoon.enabled) {
    return <ComingSoonSection />
  }

  return (
    <>
      <Header />
      <main>
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
