import type { MetadataRoute } from "next"
import siteConfig from "@/lib/site.config"

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.seo.canonicalUrl ?? "https://projectlandingpage.vercel.app"

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${base}/sitemap.xml`,
  }
}
