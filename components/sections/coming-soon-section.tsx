"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import siteConfig from "@/lib/site.config"

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(target: string): TimeLeft {
  const diff = Math.max(0, new Date(target).getTime() - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000) / 60_000),
    seconds: Math.floor((diff % 60_000) / 1_000),
  }
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-heading text-[clamp(2.5rem,8vw,6rem)] font-normal leading-none tabular-nums text-foreground">
        {String(value).padStart(2, "0")}
      </span>
      <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  )
}

export function ComingSoonSection() {
  const cs = siteConfig.comingSoon
  if (!cs.enabled) return null

  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  useEffect(() => {
    if (!cs.launchDate) return
    setTimeLeft(getTimeLeft(cs.launchDate))
    const id = setInterval(
      () => setTimeLeft(getTimeLeft(cs.launchDate!)),
      1000,
    )
    return () => clearInterval(id)
  }, [cs.launchDate])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    try {
      await new Promise<void>((r) => setTimeout(r, 600))
      setStatus("success")
      setEmail("")
    } catch {
      setStatus("error")
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col justify-end overflow-hidden px-6 pb-14 pt-24 md:pb-20 md:px-12 lg:px-20">
      {/* Warm radial glow — bottom left */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[65%] w-[55%] bg-[radial-gradient(ellipse_at_bottom_left,color-mix(in_oklch,var(--color-primary)_12%,transparent),transparent_65%)]"
      />
      {/* Cool dark mesh — top right */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 -z-10 h-[45%] w-[40%] bg-[radial-gradient(ellipse_at_top_right,oklch(0.14_0.012_70),transparent_70%)]"
      />

      <div className="relative">
        {/* Brand + issue label */}
        <div className="mb-10 animate-fade-up" style={{ animationDelay: "0ms" }}>
          <span className="label-editorial">
            {siteConfig.sections.footer.brand.name} — Coming Soon
          </span>
        </div>

        {/* Headline — editorial oversized */}
        <h1
          className="animate-fade-up font-heading text-[clamp(2.1rem,7.5vw,7rem)] font-normal leading-[0.9] tracking-[-0.01em] text-foreground"
          style={{ animationDelay: "80ms" }}
        >
          {cs.headline.split(" ").map((word, i, arr) =>
            i === arr.length - 1 ? (
              <em key={i} className="text-primary">{word}</em>
            ) : (
              <span key={i}>{word} </span>
            ),
          )}
        </h1>

        {/* Horizontal rule */}
        <div
          aria-hidden
          className="animate-line-expand rule-editorial mt-10 mb-9"
          style={{ animationDelay: "200ms" }}
        />

        {/* Sub-row: copy left, countdown right */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          {/* Left — subheadline + email form */}
          <div
            className="animate-fade-up flex max-w-sm flex-col gap-6"
            style={{ animationDelay: "280ms" }}
          >
            {cs.subheadline && (
              <p className="font-sans text-base leading-relaxed text-muted-foreground">
                {cs.subheadline}
              </p>
            )}

            {/* Email form */}
            {cs.collectEmails && (
              <>
                {status === "success" ? (
                  <div className="flex items-center gap-3 border border-border p-4">
                    <span className="font-sans text-sm font-medium text-foreground">
                      {siteConfig.sections.waitlist.successMessage}
                    </span>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                    noValidate
                  >
                    <Label htmlFor="cs-email" className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Email address
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        id="cs-email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder={siteConfig.sections.waitlist.inputPlaceholder}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-border bg-transparent font-sans text-foreground placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                      <Button
                        type="submit"
                        disabled={status === "loading"}
                        className="shrink-0 cursor-pointer bg-primary font-sans text-xs font-semibold uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/85 disabled:opacity-70"
                      >
                        {status === "loading" ? (
                          <Loader2 className="size-4 animate-spin" aria-hidden />
                        ) : (
                          <>
                            Notify me
                            <ArrowRight className="ms-2 size-4" aria-hidden />
                          </>
                        )}
                      </Button>
                    </div>
                    {status === "error" && (
                      <p role="alert" className="font-sans text-xs text-destructive">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                )}
              </>
            )}
          </div>

          {/* Right — countdown */}
          {cs.launchDate && timeLeft && (
            <div
              className="animate-fade-up flex items-end gap-8 md:gap-10"
              style={{ animationDelay: "360ms" }}
            >
              <CountdownUnit value={timeLeft.days} label="Days" />
              <span className="mb-3 font-heading text-3xl leading-none text-border" aria-hidden>·</span>
              <CountdownUnit value={timeLeft.hours} label="Hours" />
              <span className="mb-3 font-heading text-3xl leading-none text-border" aria-hidden>·</span>
              <CountdownUnit value={timeLeft.minutes} label="Min" />
              <span className="mb-3 font-heading text-3xl leading-none text-border" aria-hidden>·</span>
              <CountdownUnit value={timeLeft.seconds} label="Sec" />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
