import type { Metadata } from "next"
import { Instrument_Sans } from "next/font/google"
import { Providers } from "@/components/providers"
import { CookieConsent } from "@/components/ui/cookie-consent"
import { AnalyticsProvider } from "@/components/ui/analytics-provider"
import { WaitlistSourceCapture } from "@/components/waitlist-source-capture"
import { ogImage } from "@/lib/seo"
import siteConfig from "@/lib/site.config"
import "./globals.css"

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
    url: siteConfig.seo.canonicalUrl,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    ...(siteConfig.seo.twitterHandle
      ? { creator: siteConfig.seo.twitterHandle }
      : {}),
    images: [ogImage],
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
      className={fontSans.variable}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <div aria-hidden className="fixed inset-x-0 top-0 z-[60] h-1 bg-primary" />
        <Providers>
          <WaitlistSourceCapture />
          <a
            href="#main-content"
            className="fixed left-4 top-3 z-[9999] -translate-y-24 rounded-full border border-border bg-card px-4 py-2 font-sans text-sm font-medium text-foreground transition-transform focus:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
