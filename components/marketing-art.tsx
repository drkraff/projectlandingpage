import Image from "next/image"
import { cn } from "@/lib/utils"
import {
  answerShowsTrades,
  howItWorksPanels,
  quoteBeforeAfter,
  tradeById,
  waitlistJoined,
  type TradeId,
} from "@/lib/illustrations"

const panelSizes = "(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"

export function QuoteBeforeAfter({ className }: { className?: string }) {
  return (
    <figure className={cn("overflow-hidden rounded-2xl border border-border bg-white", className)}>
      <Image
        src={quoteBeforeAfter.src}
        alt={quoteBeforeAfter.alt}
        width={quoteBeforeAfter.width}
        height={quoteBeforeAfter.height}
        sizes="(min-width: 1024px) 64rem, 100vw"
        loading="lazy"
        className="h-auto w-full"
        style={{ width: "100%", height: "auto" }}
      />
    </figure>
  )
}

export function HowItWorksPanels({
  descriptions,
}: {
  descriptions?: readonly string[]
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
      {howItWorksPanels.map((panel, index) => (
        <article key={panel.src} className="flex flex-col gap-4">
          <figure className="flex flex-col gap-3">
            <Image
              src={panel.src}
              alt={panel.alt}
              width={panel.width}
              height={panel.height}
              sizes={panelSizes}
              loading="lazy"
              unoptimized
              className="h-auto w-full"
              style={{ width: "100%", height: "auto" }}
            />
            <figcaption>
              <h3 className="font-sans text-base font-semibold leading-snug text-foreground">
                {panel.caption}
              </h3>
            </figcaption>
          </figure>
          {descriptions?.[index] ? (
            <p className="font-sans text-sm leading-relaxed text-muted-foreground">
              {descriptions[index]}
            </p>
          ) : null}
          <span className="sr-only">Step {index + 1}</span>
        </article>
      ))}
    </div>
  )
}

export function TradeMarks({
  ids = ["electrician", "plumber", "handyman"],
  besideLabel = true,
  eager = false,
  className,
}: {
  ids?: readonly TradeId[]
  /** Empty alt when a text label sits next to the icon. Otherwise the trade name. */
  besideLabel?: boolean
  eager?: boolean
  className?: string
}) {
  const items = ids.map((id) => tradeById(id))
  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {items.map((trade) => (
        <li
          key={trade.id}
          className={cn(
            "inline-flex items-center gap-2.5 rounded-full border border-border",
            besideLabel ? "py-1 pe-3 ps-1.5" : "p-1",
          )}
        >
          <Image
            src={trade.src}
            alt={besideLabel ? "" : trade.name}
            width={40}
            height={40}
            sizes="40px"
            loading={eager ? "eager" : "lazy"}
            className="size-10 shrink-0"
            style={{ width: "2.5rem", height: "2.5rem" }}
          />
          {besideLabel ? (
            <span className="font-sans text-sm font-medium text-foreground">{trade.label}</span>
          ) : null}
        </li>
      ))}
    </ul>
  )
}

export function TradeIcon({
  id,
  besideLabel,
  eager = false,
  className,
}: {
  id: TradeId
  besideLabel: boolean
  eager?: boolean
  className?: string
}) {
  const trade = tradeById(id)
  return (
    <Image
      src={trade.src}
      alt={besideLabel ? "" : trade.name}
      width={40}
      height={40}
      sizes="40px"
      loading={eager ? "eager" : "lazy"}
      className={className ?? "size-10 shrink-0"}
      style={{ width: "2.5rem", height: "2.5rem" }}
    />
  )
}

export function WaitlistJoinedArt() {
  return (
    <Image
      src={waitlistJoined.src}
      alt=""
      width={waitlistJoined.width}
      height={waitlistJoined.height}
      sizes="208px"
      loading="lazy"
      unoptimized
      className="mx-auto h-auto w-52 shrink-0 sm:mx-0"
      style={{ width: "13rem", height: "auto" }}
    />
  )
}

export function FaqTradeMarks({ question }: { question: string }) {
  if (!answerShowsTrades(question)) return null
  return <TradeMarks besideLabel className="mt-4" />
}
