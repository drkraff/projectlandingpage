import siteConfig from "@/lib/site.config"

const origin = siteConfig.seo.canonicalUrl ?? "https://www.velaquote.com"

type FaqItem = { readonly question: string; readonly answer: string }

function faqEntities(items: readonly FaqItem[]) {
  return items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  }))
}

/** Home graph. FAQ text is the same strings the FAQ section renders. */
export function homeJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${origin}/#org`,
        name: "Vela",
        url: origin,
        logo: `${origin}/apple-touch-icon.png`,
        email: siteConfig.seo.contactEmail,
      },
      {
        "@type": "SoftwareApplication",
        name: "Vela",
        applicationCategory: "BusinessApplication",
        operatingSystem: "iOS, Android",
        description:
          "Turn a voice note from the job site into a clean contractor quote and share it by WhatsApp or email. Pre-MVP waitlist.",
        publisher: { "@id": `${origin}/#org` },
        url: origin,
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntities(siteConfig.sections.faq.items),
      },
    ],
  }
}

export function faqPageJsonLd(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntities(items),
  }
}
