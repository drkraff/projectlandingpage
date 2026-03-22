import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Linkedin, Youtube, Instagram, type LucideProps } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import siteConfig from "@/lib/site.config"
import type { SocialPlatform } from "@/types/site-config"

const SOCIAL_ICONS: Record<SocialPlatform, React.ComponentType<LucideProps>> = {
  twitter: Twitter,
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  instagram: Instagram,
  discord: ({ ...props }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.043.036.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .036-.055c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  tiktok: ({ ...props }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.11 8.11 0 0 0 4.74 1.5V6.75a4.85 4.85 0 0 1-.97-.06z" />
    </svg>
  ),
  facebook: ({ ...props }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
}

export function FooterSection() {
  const footer = siteConfig.sections.footer
  if (!footer.enabled) return null

  return (
    <footer className="relative px-6 pb-8 pt-14 md:pt-20 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Top rule */}
        <div aria-hidden className="rule-editorial mb-12 md:mb-16" />

        {/* Top row: brand + link groups */}
        <Reveal className="grid gap-12 md:grid-cols-[2fr_repeat(3,1fr)]">
          {/* Brand — editorial wordmark column */}
          <div className="flex flex-col gap-5">
            {footer.brand.logo ? (
              <Image
                src={footer.brand.logo.src}
                alt={footer.brand.logo.alt}
                width={footer.brand.logo.width}
                height={footer.brand.logo.height}
                className="h-7 w-auto"
              />
            ) : (
              <span className="font-heading text-2xl font-normal tracking-tight text-foreground">
                {footer.brand.name}
              </span>
            )}
            {footer.brand.tagline && (
              <p className="max-w-[220px] font-sans text-xs leading-relaxed text-muted-foreground">
                {footer.brand.tagline}
              </p>
            )}
            {/* Social icons */}
            {footer.socials && footer.socials.length > 0 && (
              <div className="flex items-center gap-4 pt-1">
                {footer.socials.map((social) => {
                  const Icon = SOCIAL_ICONS[social.platform]
                  return (
                    <a
                      key={social.platform}
                      href={social.href}
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer text-muted-foreground/40 transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <Icon className="size-4" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Link groups — 2-col on mobile, flat on md+ */}
          <div className="col-span-1 grid grid-cols-2 gap-8 md:col-span-3 md:grid-cols-3">
            {footer.linkGroups.map((group) => (
              <div key={group.heading} className="flex flex-col gap-5">
                <h3 className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-foreground/40">
                  {group.heading}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="font-sans text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground focus-visible:outline-none focus-visible:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
        {/* Bottom rule + copyright */}
        <div aria-hidden className="rule-editorial mt-12 mb-8 md:mt-16" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-muted-foreground/40">
            {footer.copyright}
          </p>

          {footer.legal && (
            <nav aria-label="Legal links" className="flex gap-6">
              {footer.legal.privacyHref && (
                <Link
                  href={footer.legal.privacyHref}
                  className="font-sans text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                >
                  Privacy
                </Link>
              )}
              {footer.legal.termsHref && (
                <Link
                  href={footer.legal.termsHref}
                  className="font-sans text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                >
                  Terms
                </Link>
              )}
              {footer.legal.cookiesHref && (
                <Link
                  href={footer.legal.cookiesHref}
                  className="font-sans text-xs text-muted-foreground/40 transition-colors hover:text-muted-foreground"
                >
                  Cookies
                </Link>
              )}
            </nav>
          )}
        </div>
      </div>
    </footer>
  )
}
