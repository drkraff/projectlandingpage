"use client"

import { useState } from "react"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"
import siteConfig from "@/lib/site.config"
import type { PricingInterval, PricingPrice, PricingTier } from "@/types/site-config"

export function PricingSection() {
  const pricing = siteConfig.sections.pricing
  const [interval, setInterval] = useState<PricingInterval>(pricing.defaultInterval)

  if (!pricing.enabled) return null

  const savingsPct = (() => {
    const paidTier = pricing.tiers.find(
      (t) => t.price !== "custom" && (t.price as PricingPrice).monthly > 0,
    )
    if (!paidTier) return null
    const price = paidTier.price as PricingPrice
    return Math.round(((price.monthly - price.annual) / price.monthly) * 100)
  })()

  return (
    <section id="pricing" className="relative px-6 py-16 md:py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <Reveal className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-4">
            <span className="label-editorial">Pricing</span>
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3.75rem)] font-normal leading-[0.95] tracking-tight text-foreground">
              {pricing.headline}
            </h2>
          </div>
          <div className="flex flex-col gap-5 md:pb-2">
            {pricing.subheadline && (
              <p className="max-w-sm font-sans text-base leading-relaxed text-muted-foreground">
                {pricing.subheadline}
              </p>
            )}
            {/* Billing toggle — editorial style */}
            {pricing.showBillingToggle && (
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setInterval("monthly")}
                  className={cn(
                    "font-sans text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-150",
                    interval === "monthly" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70",
                  )}
                >
                  Monthly
                </button>
                <button
                  role="switch"
                  aria-checked={interval === "annual"}
                  aria-label="Toggle billing interval"
                  onClick={() => setInterval(interval === "monthly" ? "annual" : "monthly")}
                  className={cn(
                    "relative inline-flex h-5 w-9 cursor-pointer items-center border transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    interval === "annual"
                      ? "border-primary bg-primary"
                      : "border-border bg-transparent",
                  )}
                >
                  <span
                    className={cn(
                      "inline-block size-3 bg-foreground transition-transform duration-200",
                      interval === "annual" ? "translate-x-[18px] bg-primary-foreground" : "translate-x-[3px]",
                    )}
                  />
                </button>
                <button
                  onClick={() => setInterval("annual")}
                  className={cn(
                    "flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-150",
                    interval === "annual" ? "text-foreground" : "text-muted-foreground hover:text-foreground/70",
                  )}
                >
                  Annual
                  {savingsPct !== null && (
                    <span className="border border-primary/40 bg-primary/10 px-1.5 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-wider text-primary">
                      −{savingsPct}%
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </Reveal>

        {/* Tiers — editorial grid */}
        <Reveal delay={150}>
        <div className="grid border border-border lg:grid-cols-3">
          {pricing.tiers.map((tier, i) => (
            <PricingCard
              key={tier.name}
              tier={tier}
              interval={interval}
              index={i}
              total={pricing.tiers.length}
            />
          ))}
        </div>
        </Reveal>
      </div>
    </section>
  )
}

function PricingCard({
  tier,
  interval,
  index,
  total,
}: {
  tier: PricingTier
  interval: PricingInterval
  index: number
  total: number
}) {
  const price = tier.price
  const priceNum =
    price === "custom"
      ? null
      : interval === "annual"
      ? price.annual
      : price.monthly
  const currencySymbol = price === "custom" ? "" : price.currencySymbol

  return (
    <div
      className={cn(
        "relative flex flex-col p-8 transition-colors duration-200",
        tier.highlighted
          ? "bg-primary text-primary-foreground"
          : "bg-background hover:bg-card/60",
        index < total - 1 ? "border-b border-border lg:border-b-0 lg:border-r" : "",
      )}
    >
      {/* Tier name + badge */}
      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className={cn(
            "mb-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em]",
            tier.highlighted ? "text-primary-foreground/60" : "text-muted-foreground",
          )}>
            {tier.badge ?? `Plan 0${index + 1}`}
          </p>
          <h3 className={cn(
            "font-heading text-2xl font-normal",
            tier.highlighted ? "text-primary-foreground" : "text-foreground",
          )}>
            {tier.name}
          </h3>
        </div>
        {tier.highlighted && (
          <span className="border border-primary-foreground/30 px-2 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-wider text-primary-foreground/80">
            Popular
          </span>
        )}
      </div>

      {/* Price — oversized editorial display */}
      <div className="mb-8">
        {priceNum !== null ? (
          <>
            <div className="flex items-end gap-1 leading-none">
              <span className={cn(
                "font-heading text-[clamp(3rem,6vw,5rem)] font-normal leading-none",
                tier.highlighted ? "text-primary-foreground" : "text-foreground",
              )}>
                {currencySymbol}{priceNum}
              </span>
            </div>
            <p className={cn(
              "mt-2 font-sans text-xs",
              tier.highlighted ? "text-primary-foreground/60" : "text-muted-foreground",
            )}>
              per month{interval === "annual" ? ", billed annually" : ""}
            </p>
          </>
        ) : (
          <p className={cn(
            "font-heading text-[clamp(2rem,4vw,3rem)] font-normal leading-none",
            tier.highlighted ? "text-primary-foreground" : "text-foreground",
          )}>
            Custom
          </p>
        )}
      </div>

      {/* Separator */}
      <div className={cn(
        "mb-8 h-px",
        tier.highlighted ? "bg-primary-foreground/20" : "bg-border",
      )} />

      {/* Description */}
      <p className={cn(
        "mb-6 font-sans text-sm leading-relaxed",
        tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground",
      )}>
        {tier.description}
      </p>

      {/* Features */}
      <ul className="mb-10 flex flex-1 flex-col gap-3.5">
        {tier.features.map((feat) => (
          <li key={feat} className="flex items-start gap-3">
            <Check
              className={cn(
                "mt-0.5 size-3.5 shrink-0",
                tier.highlighted ? "text-primary-foreground" : "text-primary",
              )}
              aria-hidden
            />
            <span className={cn(
              "font-sans text-sm",
              tier.highlighted ? "text-primary-foreground/85" : "text-foreground",
            )}>
              {feat}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        asChild
        className={cn(
          "w-full cursor-pointer font-sans text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-200",
          tier.highlighted
            ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
            : "border border-border bg-transparent text-foreground hover:bg-card hover:border-primary/40",
        )}
        variant="ghost"
      >
        <a
          href={tier.cta.href}
          {...(tier.cta.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {tier.cta.label}
        </a>
      </Button>
    </div>
  )
}
