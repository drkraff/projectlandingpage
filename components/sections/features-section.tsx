import Image from "next/image"
import { Reveal } from "@/components/ui/reveal"
import {
  Zap, Shield, Sliders, BarChart2, Plug, Headphones,
  Star, Check, ArrowRight, type LucideProps,
} from "lucide-react"
import { cn } from "@/lib/utils"
import siteConfig from "@/lib/site.config"
import type { FeaturesLayout } from "@/types/site-config"

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  zap: Zap,
  shield: Shield,
  sliders: Sliders,
  "bar-chart-2": BarChart2,
  plug: Plug,
  headphones: Headphones,
  star: Star,
  check: Check,
  arrow: ArrowRight,
}

export function FeaturesSection() {
  const features = siteConfig.sections.features
  if (!features.enabled) return null

  return (
    <section id="features" className="relative px-6 py-16 md:py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Editorial section header — label + headline side by side */}
        <Reveal className="mb-14 grid gap-8 md:mb-20 md:grid-cols-[auto_1fr] md:items-end md:gap-16">
          <div className="flex flex-col gap-4">
            <span className="label-editorial">02 — Capabilities</span>
            <h2 className="font-heading text-[clamp(1.75rem,4.5vw,3.75rem)] font-normal leading-[0.95] tracking-tight text-foreground">
              {features.headline}
            </h2>
          </div>
          {features.subheadline && (
            <p className="max-w-sm font-sans text-base leading-relaxed text-muted-foreground md:pb-2">
              {features.subheadline}
            </p>
          )}
        </Reveal>

        {/* Feature items */}
        <Reveal delay={150}>
        <FeatureItems layout={features.layout} />
        </Reveal>
      </div>
    </section>
  )
}

function FeatureItems({ layout }: { layout: FeaturesLayout }) {
  const { items } = siteConfig.sections.features

  if (layout === "alternating") {
    return (
      <div className="flex flex-col divide-y divide-border">
        {items.map((item, i) => {
          const Icon = item.icon ? (ICON_MAP[item.icon] ?? Star) : Star
          return (
            <div
              key={item.title}
              className={cn(
                "flex flex-col gap-10 py-14 md:flex-row md:items-center",
                i % 2 === 1 && "md:flex-row-reverse",
              )}
            >
              <div className="flex flex-1 flex-col gap-5">
                <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
                  0{i + 1}
                </span>
                <h3 className="font-heading text-[clamp(1.5rem,3vw,2.25rem)] font-normal leading-tight text-foreground">
                  {item.title}
                </h3>
                <p className="max-w-md font-sans text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
              {item.image ? (
                <div className="flex-1 overflow-hidden border border-border shadow-xl shadow-black/30">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    className="w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-1 items-center justify-center border border-border bg-card p-12">
                  <Icon className="size-10 text-primary/40" aria-hidden />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  if (layout === "list") {
    return (
      <div className="flex flex-col divide-y divide-border border-y border-border">
        {items.map((item, i) => {
          const Icon = item.icon ? (ICON_MAP[item.icon] ?? Star) : Star
          return (
            <div
              key={item.title}
              className="group flex items-start gap-8 py-7 transition-colors duration-200 hover:bg-card/30"
            >
              <span className="w-8 shrink-0 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-1 items-start gap-5">
                <Icon className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden />
                <div>
                  <h3 className="mb-1.5 font-sans text-sm font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
              {item.badge && (
                <span className="shrink-0 border border-border px-2 py-0.5 font-sans text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground">
                  {item.badge}
                </span>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  // Default: editorial grid — numbered cells, no cards
  // Container owns top+left borders; each cell owns bottom+right — no conditionals needed.
  return (
    <div className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => {
        const Icon = item.icon ? (ICON_MAP[item.icon] ?? Star) : Star
        return (
          <div
            key={item.title}
            className="group relative flex flex-col gap-6 border-b border-r border-border p-8 transition-colors duration-200 hover:bg-card/50"
          >
            {/* Number callout */}
            <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <Icon
              className="size-5 text-muted-foreground/60 transition-colors duration-200 group-hover:text-primary/60"
              aria-hidden
            />
            <div className="flex flex-col gap-2.5">
              <h3 className="font-heading text-xl font-normal text-foreground">
                {item.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </div>
            {item.badge && (
              <span className="w-fit border border-border px-2 py-0.5 font-sans text-[0.6rem] font-semibold uppercase tracking-wider text-muted-foreground">
                {item.badge}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
