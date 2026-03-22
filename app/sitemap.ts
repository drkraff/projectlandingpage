import type { MetadataRoute } from "next"
import siteConfig from "@/lib/site.config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.canonicalUrl ?? "https://acme.com"

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]
}
