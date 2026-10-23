import type { Metadata } from "next"
import siteConfig from "@/lib/site.config"

const origin = siteConfig.seo.canonicalUrl ?? "https://www.velaquote.com"

export const ogImage = {
  url: siteConfig.seo.ogImage ?? `${origin}/og-image.png`,
  width: 1200,
  height: 630,
  alt: siteConfig.seo.title,
}

type SocialCopy = {
  title?: string
  description?: string
}

/** Page-level openGraph replaces the layout object, so every page must repeat the image. */
export function pageSocialMetadata(
  pathname: string,
  social?: SocialCopy,
): Pick<Metadata, "alternates" | "openGraph" | "twitter"> {
  const canonical =
    pathname === "/" ? origin : new URL(pathname, origin).href.replace(/\/$/, "")

  return {
    alternates: { canonical },
    openGraph: {
      url: canonical,
      siteName: siteConfig.seo.siteName,
      type: "website",
      images: [ogImage],
      ...(social?.title ? { title: social.title } : {}),
      ...(social?.description ? { description: social.description } : {}),
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImage.url],
      ...(social?.title ? { title: social.title } : {}),
      ...(social?.description ? { description: social.description } : {}),
    },
  }
}
