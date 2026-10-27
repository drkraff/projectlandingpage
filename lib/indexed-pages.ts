import type { Metadata } from "next"

const legalDocuments = {
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How Vela collects, uses and protects your data. The only personal data this waitlist site collects is the email address you submit.",
  },
  terms: {
    path: "/terms",
    title: "Terms of Service",
    description:
      "The terms for using the Vela website and joining the Vela waitlist. The site is a pre-MVP waitlist, and joining is email-only.",
  },
  cookies: {
    path: "/cookies",
    title: "Cookie Policy",
    description:
      "Which cookies Vela uses, why, and how to change your choice. Strictly necessary cookies and optional analytics. Clear local storage to change your choice.",
  },
} as const

const contentRevisedOn = "2026-10-24"

export function legalDocument(id: "privacy" | "terms" | "cookies") {
  return legalDocuments[id]
}

/** Page-level openGraph replaces the layout object, so every page repeats the image. */
export function buildPageMetadata(input: {
  pathname: string
  origin: string
  siteName: string
  image: { url: string; width: number; height: number; alt: string; type: string }
  title?: string
  description: string
}): Pick<Metadata, "description" | "alternates" | "openGraph" | "twitter"> {
  const canonical =
    input.pathname === "/" ? input.origin : new URL(input.pathname, input.origin).href.replace(/\/$/, "")

  return {
    description: input.description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      siteName: input.siteName,
      type: "website",
      images: [input.image],
      ...(input.title ? { title: input.title } : {}),
      description: input.description,
    },
    twitter: {
      card: "summary_large_image",
      images: [input.image],
      ...(input.title ? { title: input.title } : {}),
      description: input.description,
    },
  }
}

export function sitemapEntries({ origin, tradePath }: { origin: string; tradePath: string }) {
  return [
    {
      url: origin,
      lastModified: contentRevisedOn,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: origin + tradePath,
      lastModified: contentRevisedOn,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    ...Object.values(legalDocuments).map((document) => ({
      url: origin + document.path,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ]
}

export function electriciansBreadcrumb(origin: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: origin,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Electricians",
        item: origin + path,
      },
    ],
  }
}
