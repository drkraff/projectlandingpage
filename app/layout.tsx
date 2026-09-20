import type { Metadata } from "next"
import { DM_Serif_Display, Instrument_Sans } from "next/font/google"
import { Providers } from "@/components/providers"
import { CookieConsent } from "@/components/ui/cookie-consent"
import { AnalyticsProvider } from "@/components/ui/analytics-provider"
import siteConfig from "@/lib/site.config"
import "./globals.css"

const fontDisplay = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
})

const fontSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.seo.title,
    template: siteConfig.seo.titleTemplate ?? "%s",
  },
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  metadataBase: siteConfig.seo.canonicalUrl
    ? new URL(siteConfig.seo.canonicalUrl)
    : undefined,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    siteName: siteConfig.seo.siteName,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    type: "website",
    images: siteConfig.seo.ogImage
      ? [{ url: siteConfig.seo.ogImage, width: 1200, height: 630, alt: siteConfig.seo.title }]
      : undefined,
  },
  twitter: {
    card: "summary_large_image",
    ...(siteConfig.seo.twitterHandle
      ? { creator: siteConfig.seo.twitterHandle }
      : {}),
    images: siteConfig.seo.ogImage ? [siteConfig.seo.ogImage] : undefined,
  },
  robots: siteConfig.seo.noIndex
    ? { index: false, follow: false }
    : { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang={siteConfig.locale.defaultLocale}
      dir={siteConfig.locale.direction}
      className={`${fontSans.variable} ${fontDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <a
            href="#main-content"
            className="fixed left-4 top-4 z-[9999] -translate-y-20 rounded-none border border-border bg-background px-4 py-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Skip to content
          </a>
          {children}
          <CookieConsent />
          <AnalyticsProvider />
        </Providers>
      </body>
    </html>
  )
}
