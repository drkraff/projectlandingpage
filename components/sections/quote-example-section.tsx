import { Check } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { cn } from "@/lib/utils"
import siteConfig from "@/lib/site.config"
import type { QuoteStepStatus } from "@/types/site-config"

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

function money(amount: number) {
  return usd.format(Math.round(amount * 100) / 100)
}

function stepClass(status: QuoteStepStatus) {
  if (status === "current") {
    return "border-primary bg-primary/15 text-foreground"
  }
  if (status === "done") {
    return "border-border bg-secondary text-secondary-foreground"
  }
  return "border-border bg-transparent text-muted-foreground"
}

export function QuoteExampleSection() {
  const quote = siteConfig.sections.quoteExample
  if (!quote.enabled) return null

  const subtotal = quote.lines.reduce((sum, line) => sum + line.amount, 0)
  const tax = Math.round(subtotal * quote.taxRate * 100) / 100
  const total = Math.round((subtotal + tax) * 100) / 100

  return (
    <section id="example" className="scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <Reveal className="mb-8 max-w-2xl">
          <h2 className="font-sans text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {quote.headline}
          </h2>
          {quote.subheadline && (
            <p className="mt-3 font-sans text-base leading-relaxed text-muted-foreground">
              {quote.subheadline}
            </p>
          )}
        </Reveal>

        <Reveal delay={80}>
          <article className="rounded-2xl border border-border bg-card p-5 shadow-sm shadow-black/10 md:p-8">
            <header className="flex flex-col gap-3 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-sans text-xs font-medium text-primary">{quote.sampleLabel}</p>
                <h3 className="mt-1 font-sans text-xl font-medium text-foreground">
                  {quote.jobTitle} job
                </h3>
                <p className="mt-1 font-sans text-sm text-muted-foreground">{quote.customer}</p>
              </div>
              <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
                {quote.jobDetail}
              </p>
            </header>

            <ul className="mt-2">
              {quote.lines.map((line) => (
                <li
                  key={line.description}
                  className="flex flex-col gap-2 border-b border-border py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6"
                >
                  <div className="min-w-0">
                    <p className="font-sans text-base font-medium text-foreground">
                      {line.description}
                    </p>
                    <p className="mt-0.5 font-sans text-sm leading-relaxed text-muted-foreground">
                      {line.detail}
                    </p>
                    <p className="mt-2">
                      <span className="inline-flex rounded-lg bg-secondary px-2 py-1 font-sans text-xs text-secondary-foreground">
                        {line.source}
                      </span>
                    </p>
                  </div>
                  <p className="font-sans text-base font-medium tabular-nums text-foreground sm:pt-0.5">
                    {money(line.amount)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-4 space-y-2 font-sans text-sm">
              <div className="flex items-baseline justify-between gap-4 text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{money(subtotal)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 text-muted-foreground">
                <dt>{quote.taxLabel}</dt>
                <dd className="tabular-nums">{money(tax)}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 pt-2 text-base font-medium text-foreground">
                <dt>Total</dt>
                <dd className="tabular-nums">{money(total)}</dd>
              </div>
            </dl>
            <p className="mt-3 font-sans text-xs leading-relaxed text-muted-foreground">
              {quote.taxNote}
            </p>

            <div className="mt-6 rounded-xl bg-background/70 p-4">
              <h4 className="font-sans text-sm font-medium text-foreground">
                {quote.notIncludedTitle}
              </h4>
              <ul className="mt-2 space-y-1.5">
                {quote.notIncluded.map((item) => (
                  <li key={item} className="font-sans text-sm leading-relaxed text-muted-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 border-t border-border pt-5">
              <ol className="flex flex-col gap-2 sm:flex-row" aria-label="Before the quote is sent">
                {quote.steps.map((step) => (
                  <li
                    key={step.label}
                    aria-current={step.status === "current" ? "step" : undefined}
                    className={cn(
                      "inline-flex min-h-11 items-center gap-2 rounded-xl border px-3 font-sans text-sm",
                      stepClass(step.status),
                    )}
                  >
                    {step.status === "done" && <Check className="size-4 shrink-0" aria-hidden />}
                    <span>{step.label}</span>
                    {step.status === "current" && <span className="sr-only">Current step</span>}
                  </li>
                ))}
              </ol>
              <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">
                {quote.reviewNote}
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
