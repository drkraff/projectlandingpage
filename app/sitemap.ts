import type { MetadataRoute } from "next"
import { electriciansPage } from "@/lib/electricians-page"
import { sitemapEntries } from "@/lib/indexed-pages"
import { siteOrigin } from "@/lib/seo"

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries({ origin: siteOrigin, tradePath: electriciansPage.path })
}
