import type { MetadataRoute } from "next"
import siteConfig from "@/lib/site.config"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.seo.canonicalUrl ?? "https://www.velaquote.com"

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/voice-to-quote-electricians`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ]
}
