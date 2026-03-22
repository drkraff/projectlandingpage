import Image from "next/image"
import { Reveal } from "@/components/ui/reveal"
import { ThreeDCarousel, type CarouselTestimonial } from "@/components/ui/three-d-carousel"
import siteConfig from "@/lib/site.config"

export function SocialProofSection() {
  const sp = siteConfig.sections.socialProof
  if (!sp.enabled) return null

  return (
    <section className="relative px-6 py-16 md:py-24 md:px-12 lg:px-20">
      {/* Top rule */}
      <div aria-hidden className="rule-editorial" />

      <div className="mx-auto max-w-[1400px]">
        {/* Editorial label row */}
        {sp.heading && (
          <Reveal className="mt-10 mb-12 flex items-baseline justify-between md:mb-14">
            <span className="label-editorial">{sp.heading}</span>
            {sp.metrics && sp.metrics.length > 0 && (
              <span className="label-editorial opacity-40">
                {new Date().getFullYear()}
              </span>
            )}
          </Reveal>
        )}

        {/* Logos — grayscale strip, hover reveals */}
        {sp.logos && sp.logos.length > 0 && (
          <Reveal delay={100} className="mb-14 flex flex-wrap items-center gap-8 md:mb-20 md:gap-14">
            {sp.logos.map((logo) => (
              <div
                key={logo.name}
                className="opacity-75 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              >
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={logo.name}
                    className="cursor-pointer"
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={logo.width}
                      height={logo.height}
                      className="h-6 w-auto object-contain"
                    />
                  </a>
                ) : (
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="h-6 w-auto object-contain"
                  />
                )}
              </div>
            ))}
          </Reveal>
        )}

        {/* Metrics — editorial raw numbers, no cards */}
        {sp.metrics && sp.metrics.length > 0 && (
          <Reveal delay={200}>
          <div className="grid gap-0 border border-border sm:grid-cols-3">
            {sp.metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`px-8 py-10 ${i < sp.metrics!.length - 1 ? "border-b border-border sm:border-b-0 sm:border-r" : ""}`}
              >
                <p className="font-heading text-[clamp(2.5rem,5vw,4rem)] leading-none text-primary">
                  {metric.value}
                </p>
                <p className="mt-3 font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
          </Reveal>
        )}

        {/* Testimonials — 3D carousel */}
        {sp.testimonials && sp.testimonials.length > 0 && (
          <Reveal delay={300} className="mt-16 pb-10">
            <ThreeDCarousel
              items={sp.testimonials.map((t): CarouselTestimonial => ({
                src: t.avatar?.src ?? "",
                name: t.author,
                role: t.role ?? "",
                company: t.company ?? "",
                quote: t.quote,
              }))}
            />
          </Reveal>
        )}
      </div>

      {/* Bottom rule */}
      <div aria-hidden className="rule-editorial mt-16 md:mt-24" />
    </section>
  )
}
