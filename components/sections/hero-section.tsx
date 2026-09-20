"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { track } from "@vercel/analytics"
import { Button } from "@/components/ui/button"
import siteConfig from "@/lib/site.config"

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    duration: 20 + (i % 5) * 2,
  }))

  return (
    <div className="absolute inset-0 -z-10 pointer-events-none">
      <svg className="w-full h-full" viewBox="0 0 696 316" fill="none">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="#E84B2B"
            strokeWidth={path.width}
            strokeOpacity={0.04 + path.id * 0.007}
            style={{ willChange: "auto" }}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: path.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  )
}

/** Renders headline with the last word in blood-orange italic */
function EditorialHeadline({ text }: { text: string }) {
  const words = text.trim().split(/\s+/)
  const last = words.pop() ?? ""
  const rest = words.join(" ")
  return (
    <h1 className="font-heading text-[clamp(2.1rem,7.5vw,7rem)] font-normal leading-[0.9] tracking-[-0.01em] text-foreground">
      {rest && <>{rest} </>}
      <em className="text-primary">{last}</em>
    </h1>
  )
}

export function HeroSection() {
  const hero = siteConfig.sections.hero
  if (!hero.enabled) return null

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 pb-14 pt-24 md:pb-20 md:pt-28 md:px-12 lg:px-20">
      <FloatingPaths position={1} />
      <FloatingPaths position={-1} />

      <div className="relative">
        {/* Editorial issue label */}
        {hero.badge && (
          <div className="animate-fade-up mb-10" style={{ animationDelay: "0ms" }}>
            <span className="label-editorial">No. 01 — {hero.badge}</span>
          </div>
        )}

        {/* Oversized headline */}
        <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
          <EditorialHeadline text={hero.headline} />
        </div>

        {/* Horizontal rule */}
        <div
          aria-hidden
          className="animate-line-expand rule-editorial mt-10 mb-9"
          style={{ animationDelay: "200ms" }}
        />

        {/* Sub-row: copy left / CTAs right */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <p
            className="animate-fade-up max-w-lg font-sans text-base leading-relaxed text-muted-foreground"
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
              className="cursor-pointer bg-primary px-7 text-primary-foreground shadow-none hover:bg-primary/85"
            >
              <Link href={hero.primaryCta.href} onClick={() => track("cta_click", { location: "hero" })}>
                {hero.primaryCta.label}
                <ArrowRight className="ms-2 size-4" aria-hidden />
              </Link>
            </Button>

            {hero.secondaryCta && (
              <Link
                href={hero.secondaryCta.href}
                {...(hero.secondaryCta.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-sans text-sm font-medium text-muted-foreground underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
              >
                {hero.secondaryCta.label} →
              </Link>
            )}
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
