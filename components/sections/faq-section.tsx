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
    <section id="faq" className="scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="flex flex-col gap-4 lg:pt-2">
            <h2 className="font-sans text-2xl font-medium tracking-tight text-foreground md:text-3xl">
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
                  Email us
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
