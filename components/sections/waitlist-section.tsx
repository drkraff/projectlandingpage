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
      className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24"
    >
      {/* Warm radial glow — centred */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,color-mix(in_oklch,var(--color-primary)_8%,transparent),transparent_70%)]"
      />

      <div className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <Reveal className="flex flex-col gap-6">
            <span className="label-editorial">Waitlist</span>
            <h2 className="font-sans text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
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
          <Reveal delay={150} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 sm:p-6">
            {status === "success" ? (
              <div className="flex items-center gap-4 rounded-xl border border-border bg-background p-5" role="status">
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
                    className="font-sans text-sm font-medium text-foreground"
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
                    className="h-12 rounded-xl border-border bg-background px-4 font-sans text-base text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/50"
                    aria-invalid={status === "error"}
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
                  className="h-12 w-full cursor-pointer rounded-full bg-primary font-sans text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
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
                className="font-sans text-sm text-destructive"
              >
                {errorMsg}
              </p>
            )}

            {waitlist.privacyNote && status !== "success" && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Lock className="size-4 shrink-0" aria-hidden />
                <span className="font-sans text-sm">{waitlist.privacyNote}</span>
              </div>
            )}
          </Reveal>
        </div>

      </div>
    </section>
  )
}
