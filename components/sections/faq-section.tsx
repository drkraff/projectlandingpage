import Link from "next/link"
import { Reveal } from "@/components/ui/reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import siteConfig from "@/lib/site.config"

export function FaqSection() {
  const faq = siteConfig.sections.faq
  if (!faq.enabled) return null

  return (
    <section id="faq" className="relative px-6 py-16 md:py-28 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        {/* Editorial layout: label + title left, accordion right */}
        <Reveal className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-24">
          {/* Left — sticky label column */}
          <div className="flex flex-col gap-5 lg:pt-2">
            <span className="label-editorial">03 — Questions</span>
            <h2 className="font-heading text-[clamp(2rem,4vw,3.25rem)] font-normal leading-[0.95] tracking-tight text-foreground">
              {faq.headline}
            </h2>
            {faq.subheadline && (
              <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                {faq.subheadline}
              </p>
            )}
            {siteConfig.seo.contactEmail && (
              <p className="mt-auto font-sans text-xs text-muted-foreground">
                Still have questions?{" "}
                <Link
                  href={`mailto:${siteConfig.seo.contactEmail}`}
                  className="text-primary underline-offset-4 transition-colors hover:underline focus-visible:outline-none focus-visible:underline"
                >
                  Email us →
                </Link>
              </p>
            )}
          </div>

          {/* Right — accordion */}
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((item, i) => (
              <AccordionItem
                key={item.question}
                value={`item-${i}`}
                className="border-b border-border last:border-b-0"
              >
                <AccordionTrigger className="py-6 text-left font-sans text-sm font-semibold text-foreground hover:no-underline [&>svg]:text-primary [&>svg]:shrink-0">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-6 font-sans text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
