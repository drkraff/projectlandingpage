import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/indexed-pages"
import siteConfig from "@/lib/site.config"

export const siteOrigin = siteConfig.seo.canonicalUrl ?? "https://www.velaquote.com"

const configuredOgImage = siteConfig.seo.ogImage ?? "/og-image.png"

export const ogImage = {
  url: new URL(configuredOgImage, `${siteOrigin}/`).href,
  width: 1200,
  height: 630,
  alt: "Vela: turn a voice note into a professional quote",
  type: "image/png",
}

export function pageSocialMetadata(
  pathname: string,
  social: { title?: string; description: string },
): Pick<Metadata, "description" | "alternates" | "openGraph" | "twitter"> {
  return buildPageMetadata({
    pathname,
    origin: siteOrigin,
    siteName: siteConfig.seo.siteName,
    image: ogImage,
    title: social.title,
    description: social.description,
  })
}
