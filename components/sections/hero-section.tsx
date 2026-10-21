"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/button"
import siteConfig from "@/lib/site.config"

function Headline({ text }: { text: string }) {
  const words = text.trim().split(/\s+/)
  const last = words.pop() ?? ""
  const rest = words.join(" ")
  return (
    <h1 className="max-w-3xl font-sans text-[2rem] font-semibold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
      {rest && <>{rest} </>}
      <span className="text-primary">{last}</span>
    </h1>
  )
}

export function HeroSection() {
  const hero = siteConfig.sections.hero
  if (!hero.enabled) return null

  return (
    <section className="relative px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
      <div className="relative mx-auto max-w-5xl">
        {hero.badge && (
          <div className="animate-fade-up mb-10" style={{ animationDelay: "0ms" }}>
            <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
              {hero.badge}
            </span>
          </div>
        )}

        <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
          <Headline text={hero.headline} />
        </div>

        {hero.secondaryCta && (
          <p
            className="animate-fade-up mt-6 max-w-xl font-sans text-base leading-relaxed text-muted-foreground md:text-lg"
            style={{ animationDelay: "140ms" }}
          >
            {hero.secondaryCta.label}
          </p>
        )}

        <div className="mt-8 flex max-w-3xl flex-col items-start gap-6">
          <p
            className="animate-fade-up font-sans text-base leading-relaxed text-pretty text-muted-foreground"
            style={{ animationDelay: "280ms" }}
          >
            {hero.subheadline}
          </p>

          <div
            className="animate-fade-up flex flex-wrap items-center gap-5"
            style={{ animationDelay: "360ms" }}
          >
            <Button
              asChild
              size="lg"
              className="h-12 cursor-pointer rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Link href={hero.primaryCta.href} onClick={() => track("cta_click", { location: "hero" })}>
                {hero.primaryCta.label}
                <ArrowRight className="ms-2 size-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>

        {hero.socialProofLine && (
          <p
            className="animate-fade-in mt-10 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground md:mt-16"
            style={{ animationDelay: "520ms" }}
          >
            {hero.socialProofLine}
          </p>
        )}

        {/* Hero media — pushed below the fold on larger screens */}
        {hero.media && (
          <div
            className="animate-fade-up mt-20"
            style={{ animationDelay: "600ms" }}
          >
            <div className="relative overflow-hidden border border-border/50 bg-card shadow-2xl shadow-black/40">
              {/* Left-edge orange accent bar */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 w-0.5 bg-primary"
              />
              {hero.media.type === "image" ? (
                <Image
                  src={hero.media.image.src}
                  alt={hero.media.image.alt}
                  width={hero.media.image.width}
                  height={hero.media.image.height}
                  className="w-full object-cover"
                  priority
                />
              ) : (
                <video
                  src={hero.media.src}
                  poster={hero.media.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
