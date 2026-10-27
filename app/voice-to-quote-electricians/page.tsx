import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"
import { Header } from "@/components/layout/header"
import { FaqTradeMarks, HowItWorksPanels, QuoteBeforeAfter, TradeMarks } from "@/components/marketing-art"
import { FooterSection } from "@/components/sections/footer-section"
import { JsonLd } from "@/components/seo/json-ld"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { electriciansPage } from "@/lib/electricians-page"
import { electriciansBreadcrumb } from "@/lib/indexed-pages"
import { faqPageJsonLd } from "@/lib/structured-data"
import { pageSocialMetadata, siteOrigin } from "@/lib/seo"

const page = electriciansPage

export const metadata: Metadata = {
  title: { absolute: page.title },
  ...pageSocialMetadata(page.path, {
    title: page.title,
    description: page.description,
  }),
}

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

export default function ElectriciansPage() {
  return (
    <>
      <JsonLd data={faqPageJsonLd(page.faq)} />
      <JsonLd data={electriciansBreadcrumb(siteOrigin, page.path)} />
      <Header />
      <main id="main-content">
        <section className="relative px-4 pb-16 pt-28 md:px-6 md:pb-24 md:pt-32">
          <div className="mx-auto flex max-w-5xl flex-col">
            <div className="animate-fade-up mb-6">
              <span className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-sm font-medium text-muted-foreground">
                Pre-MVP waitlist
              </span>
            </div>
            <div className="animate-fade-up mb-10" style={{ animationDelay: "40ms" }}>
              <TradeMarks ids={["electrician"]} eager />
            </div>
            <div className="animate-fade-up" style={{ animationDelay: "80ms" }}>
              <Headline text={page.h1} />
            </div>
            <div className="animate-fade-up mt-6 max-w-2xl">
              <p className="font-sans text-base leading-relaxed text-pretty text-foreground md:text-lg">
                {page.lead}
              </p>
            </div>
            <div className="animate-fade-up mt-10 max-w-2xl" style={{ animationDelay: "160ms" }}>
              <h2 className="font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                {page.problem.heading}
              </h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
                {page.problem.body}
              </p>
            </div>
            <div className="animate-fade-up mt-8" style={{ animationDelay: "240ms" }}>
              <WaitlistLink />
            </div>
          </div>
        </section>

        <section className="relative px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8 flex max-w-3xl flex-col gap-3 md:mb-12">
              <h2 className="font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                How it works
              </h2>
            </Reveal>
            <Reveal delay={80} className="mb-8 md:mb-12">
              <QuoteBeforeAfter />
            </Reveal>
            <Reveal delay={150}>
              <HowItWorksPanels descriptions={page.steps.map((step) => step.description)} />
            </Reveal>
          </div>
        </section>

        <section className="relative px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="mb-8 flex max-w-3xl flex-col gap-3 md:mb-12">
              <h2 className="font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                {page.jobs.heading}
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <ul className="grid gap-3 sm:grid-cols-2">
                {page.jobs.items.map((job) => (
                  <li
                    key={job}
                    className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 font-sans text-base leading-relaxed text-foreground"
                  >
                    <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                    <span>{job}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <section className="relative px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="flex max-w-2xl flex-col gap-4">
              <h2 className="font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                {page.why.heading}
              </h2>
              <p className="font-sans text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
                {page.why.body}
              </p>
            </Reveal>
          </div>
        </section>

        <section id="faq" className="relative px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="grid gap-8 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.4fr)] lg:items-start lg:gap-16">
              <div className="flex min-w-0 max-w-md flex-col gap-3">
                <h2 className="font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                  FAQ
                </h2>
              </div>
              <Accordion
                type="single"
                collapsible
                className="min-w-0 w-full rounded-2xl border border-border bg-card px-4 sm:px-5"
              >
                {page.faq.map((item, index) => (
                  <AccordionItem
                    key={item.question}
                    value={`item-${index}`}
                    className="border-b border-border last:border-b-0"
                  >
                    <AccordionTrigger className="py-4 text-left font-sans text-base font-semibold text-foreground hover:no-underline [&>svg]:text-primary [&>svg]:shrink-0">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 font-sans text-sm leading-relaxed text-muted-foreground">
                      {item.answer}
                      <FaqTradeMarks question={item.question} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          </div>
        </section>

        <section className="relative px-4 py-16 md:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <Reveal className="flex max-w-2xl flex-col items-start gap-6">
              <h2 className="font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
                {page.cta.heading}
              </h2>
              <p className="font-sans text-base leading-relaxed text-pretty text-muted-foreground">
                {page.cta.body}
              </p>
              <WaitlistLink />
            </Reveal>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  )
}

function WaitlistLink() {
  return (
    <Button
      asChild
      size="lg"
      className="h-12 cursor-pointer rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
    >
      <Link href={page.cta.href}>
        {page.cta.label}
        <ArrowRight className="ms-2 size-4" aria-hidden />
      </Link>
    </Button>
  )
}
