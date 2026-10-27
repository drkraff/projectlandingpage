import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { electriciansPage } from "./electricians-page.ts"
import {
  buildPageMetadata,
  electriciansBreadcrumb,
  legalDocument,
  sitemapEntries,
} from "./indexed-pages.ts"
import siteConfig from "./site.config.ts"

const lead =
  "Vela is a voice-to-quote app for electricians, plumbers and handymen: you describe the job in a voice note on site, and Vela turns it into a professional quote you can send by WhatsApp or email before you leave."

const homeDescription =
  "Talk the job on site and Vela turns your voice note into a clean quote you can share by WhatsApp or email before you leave. Join the early-access waitlist."

const privacyDescription =
  "How Vela collects, uses and protects your data. The only personal data this waitlist site collects is the email address you submit."

const termsDescription =
  "The terms for using the Vela website and joining the Vela waitlist. The site is a pre-MVP waitlist, and joining is email-only."

const cookiesDescription =
  "Which cookies Vela uses, why, and how to change your choice. Strictly necessary cookies and optional analytics. Clear local storage to change your choice."

const stubImage = {
  url: "https://www.velaquote.com/og-image.png",
  width: 1200,
  height: 630,
  alt: "stub",
  type: "image/png",
}

describe("indexed page copy", () => {
  it("keeps the electricians lead, the live FAQ answer, and the home sentence", () => {
    assert.equal(electriciansPage.lead, lead)
    assert.notEqual(electriciansPage.lead, electriciansPage.description)
    const answer = electriciansPage.faq.find((item) => item.question === "Is Vela live?")?.answer
    assert.equal(
      answer,
      "Vela is pre-launch. Join the waitlist and we’ll email you when it’s ready to try.",
    )
    assert.equal(siteConfig.seo.description, homeDescription)
  })

  it("describes the legal pages without the home sentence", () => {
    assert.equal(legalDocument("privacy").description, privacyDescription)
    assert.equal(legalDocument("terms").description, termsDescription)
    assert.equal(legalDocument("cookies").description, cookiesDescription)
    assert.equal(/voice note/i.test(legalDocument("privacy").description), false)

    const metadata = buildPageMetadata({
      pathname: "/privacy",
      origin: "https://www.velaquote.com",
      siteName: "Vela",
      image: stubImage,
      description: privacyDescription,
    })
    assert.equal(metadata.description, privacyDescription)
    assert.equal(metadata.openGraph?.description, privacyDescription)
    assert.equal(metadata.twitter?.description, privacyDescription)
    assert.notEqual(metadata.description, homeDescription)
    assert.equal(metadata.alternates?.canonical, "https://www.velaquote.com/privacy")
    const images = metadata.openGraph?.images
    assert.deepEqual(Array.isArray(images) ? images[0] : undefined, stubImage)
  })
})

describe("sitemapEntries", () => {
  it("lists home, the trade page, then the three legal paths", () => {
    const entries = sitemapEntries({
      origin: "https://www.velaquote.com",
      tradePath: electriciansPage.path,
    })
    assert.deepEqual(entries, [
      {
        url: "https://www.velaquote.com",
        lastModified: "2026-10-24",
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: "https://www.velaquote.com/voice-to-quote-electricians",
        lastModified: "2026-10-24",
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: "https://www.velaquote.com/privacy",
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: "https://www.velaquote.com/terms",
        changeFrequency: "yearly",
        priority: 0.3,
      },
      {
        url: "https://www.velaquote.com/cookies",
        changeFrequency: "yearly",
        priority: 0.3,
      },
    ])
    assert.equal(typeof entries[0].lastModified, "string")
    assert.equal(entries[0].lastModified, "2026-10-24")
    assert.equal(entries[1].lastModified, "2026-10-24")
    assert.equal(entries[0].lastModified instanceof Date, false)
    assert.equal(entries[2].lastModified, undefined)
    assert.equal(entries[3].lastModified, undefined)
    assert.equal(entries[4].lastModified, undefined)
  })
})

describe("electriciansBreadcrumb", () => {
  it("names Home then Electricians on the given path", () => {
    assert.deepEqual(electriciansBreadcrumb("https://www.velaquote.com", electriciansPage.path), {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.velaquote.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Electricians",
          item: "https://www.velaquote.com/voice-to-quote-electricians",
        },
      ],
    })
  })
})
