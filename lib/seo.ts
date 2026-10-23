import type { Metadata } from "next"
import siteConfig from "@/lib/site.config"

const origin = siteConfig.seo.canonicalUrl ?? "https://www.velaquote.com"

const configuredOgImage = siteConfig.seo.ogImage ?? "/og-image.png"

export const ogImage = {
  url: new URL(configuredOgImage, `${origin}/`).href,
  width: 1200,
  height: 630,
  alt: "Vela: turn a voice note into a professional quote",
  type: "image/png",
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
      images: [ogImage],
      ...(social?.title ? { title: social.title } : {}),
      ...(social?.description ? { description: social.description } : {}),
    },
  }
}
