"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/button"
import siteConfig from "@/lib/site.config"

export function HeroSection() {
  const hero = siteConfig.sections.hero
  if (!hero.enabled) return null

  return (
    <section className="px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          {hero.badge && (
            <p className="animate-fade-up mb-5">
              <span className="inline-flex items-center rounded-xl bg-secondary px-3 py-1.5 font-sans text-xs font-medium text-secondary-foreground">
                {hero.badge}
              </span>
            </p>
          )}

          <h1
            className="animate-fade-up font-heading text-[1.85rem] font-normal leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl"
            style={{ animationDelay: "60ms" }}
          >
            {hero.headline}
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {hero.subheadline}
          </p>

          <div
            className="animate-fade-up mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "180ms" }}
          >
            <Button
              asChild
              className="h-12 cursor-pointer rounded-xl bg-primary px-5 text-base font-medium text-primary-foreground shadow-none hover:bg-primary/90"
            >
              <Link
                href={hero.primaryCta.href}
                onClick={() => track("cta_click", { location: "hero" })}
              >
                {hero.primaryCta.label}
                <ArrowRight className="ms-2 size-4" aria-hidden />
              </Link>
            </Button>

            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-xl px-3 font-sans text-base text-muted-foreground transition-colors duration-200 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => track("cta_click", { location: "hero_iphone" })}
              >
                {hero.secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
