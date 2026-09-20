"use client"

import { useState } from "react"
import { track } from "@vercel/analytics"
import { ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import siteConfig from "@/lib/site.config"

type FormStatus = "idle" | "loading" | "success" | "error"

export function WaitlistSection() {
  const waitlist = siteConfig.sections.waitlist
  const [email, setEmail] = useState("")
  const [website, setWebsite] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  if (!waitlist.enabled) return null

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, website }),
      })
      const data = await res.json() as { error?: string }
      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        return
      }
      track("waitlist_signup")
      setStatus("success")
      setEmail("")
      setWebsite("")
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden px-6 py-20 md:py-32 md:px-12 lg:px-20"
    >
      {/* Warm radial glow — centred */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,color-mix(in_oklch,var(--color-primary)_8%,transparent),transparent_70%)]"
      />

      <div className="mx-auto max-w-[1400px]">
        {/* Top rule */}
        <div aria-hidden className="rule-editorial mb-16" />

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-24">
          {/* Left — editorial CTA headline */}
          <Reveal className="flex flex-col gap-6">
            <span className="label-editorial">04 — Join</span>
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] font-normal leading-[0.9] tracking-[-0.01em] text-foreground">
              {waitlist.headline.split(".").map((part, i, arr) =>
                part.trim() ? (
                  <span key={i}>
                    {part.trim()}
                    {i < arr.length - 1 ? "." : ""}
                    {i < arr.length - 2 ? <br /> : ""}
                  </span>
                ) : null,
              )}
            </h2>
            {waitlist.subheadline && (
              <p className="max-w-sm font-sans text-base leading-relaxed text-muted-foreground">
                {waitlist.subheadline}
              </p>
            )}
          </Reveal>
          {/* Right — form */}
          <Reveal delay={150} className="flex flex-col gap-6">
            {status === "success" ? (
              <div className="flex items-center gap-4 border border-border p-6">
                <CheckCircle2 className="size-5 shrink-0 text-primary" aria-hidden />
                <p className="font-sans text-sm font-medium text-foreground">
                  {waitlist.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex flex-col gap-4" noValidate>
                <div className="flex flex-col gap-2">
                  <Label
                    htmlFor="waitlist-email"
                    className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground"
                  >
                    Email address
                  </Label>
                  <Input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={waitlist.inputPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border bg-transparent font-sans text-foreground placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-describedby={status === "error" ? "waitlist-error" : undefined}
                  />
                </div>

                <div
                  className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="waitlist-website">Company website</label>
                  <input
                    id="waitlist-website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full cursor-pointer bg-primary font-sans text-xs font-semibold uppercase tracking-[0.14em] text-primary-foreground hover:bg-primary/85 disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="me-2 size-4 animate-spin" aria-hidden />
                      Joining…
                    </>
                  ) : (
                    <>
                      {waitlist.submitLabel}
                      <ArrowRight className="ms-2 size-4" aria-hidden />
                    </>
                  )}
                </Button>
              </form>
            )}

            {status === "error" && (
              <p
                id="waitlist-error"
                role="alert"
                className="font-sans text-xs text-destructive"
              >
                {errorMsg}
              </p>
            )}

            {waitlist.privacyNote && status !== "success" && (
              <div className="flex items-center gap-2 text-muted-foreground/50">
                <Lock className="size-3" aria-hidden />
                <span className="font-sans text-xs">{waitlist.privacyNote}</span>
              </div>
            )}
          </Reveal>
        </div>

        {/* Bottom rule */}
        <div aria-hidden className="rule-editorial mt-16" />
      </div>
    </section>
  )
}
