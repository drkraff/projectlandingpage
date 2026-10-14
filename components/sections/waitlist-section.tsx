"use client"

import { useState } from "react"
import { track } from "@vercel/analytics"
import { ArrowRight, CheckCircle2, Loader2, Lock } from "lucide-react"
import { Reveal } from "@/components/ui/reveal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { US_STATES } from "@/lib/us-states"
import siteConfig from "@/lib/site.config"

type FormStatus = "idle" | "loading" | "success" | "error"
type Platform = "android" | "iphone"

const fieldClass =
  "h-12 w-full rounded-xl border border-border bg-card px-3 text-base text-foreground shadow-none transition-colors duration-200 placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/50 md:text-base"

export function WaitlistSection() {
  const waitlist = siteConfig.sections.waitlist
  const [email, setEmail] = useState("")
  const [trade, setTrade] = useState("")
  const [usState, setUsState] = useState("")
  const [platform, setPlatform] = useState<Platform>("android")
  const [website, setWebsite] = useState("")
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMsg, setErrorMsg] = useState("")

  if (!waitlist.enabled) return null

  const submitLabel =
    platform === "iphone" ? waitlist.iphoneSubmitLabel : waitlist.submitLabel

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, trade, usState, platform, website }),
      })
      const data = (await res.json()) as { error?: string }
      if (!res.ok) {
        setStatus("error")
        setErrorMsg(data.error ?? "Something went wrong. Please try again.")
        return
      }
      track("waitlist_signup", { platform })
      setStatus("success")
      setEmail("")
      setTrade("")
      setUsState("")
      setPlatform("android")
      setWebsite("")
    } catch {
      setStatus("error")
      setErrorMsg("Something went wrong. Please try again.")
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-24 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] md:items-start md:gap-16">
        <Reveal>
          <h2 className="font-sans text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {waitlist.headline}
          </h2>
          {waitlist.subheadline && (
            <p className="mt-3 max-w-md font-sans text-base leading-relaxed text-muted-foreground">
              {waitlist.subheadline}
            </p>
          )}
        </Reveal>

        <Reveal delay={80}>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm shadow-black/10 md:p-6">
            {status === "success" ? (
              <div className="flex items-start gap-3" role="status">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <p className="font-sans text-base leading-relaxed text-foreground">
                  {waitlist.successMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="waitlist-email">Email</Label>
                  <Input
                    id="waitlist-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={waitlist.inputPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={fieldClass}
                    aria-invalid={status === "error"}
                    aria-describedby={status === "error" ? "waitlist-error" : undefined}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="waitlist-trade">{waitlist.tradeLabel}</Label>
                  <select
                    id="waitlist-trade"
                    required
                    value={trade}
                    onChange={(e) => setTrade(e.target.value)}
                    className={`${fieldClass} cursor-pointer`}
                  >
                    <option value="">Select your trade</option>
                    {waitlist.trades.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="waitlist-state">{waitlist.stateLabel}</Label>
                  <select
                    id="waitlist-state"
                    required
                    autoComplete="address-level1"
                    value={usState}
                    onChange={(e) => setUsState(e.target.value)}
                    className={`${fieldClass} cursor-pointer`}
                  >
                    <option value="">Select your state</option>
                    {US_STATES.map((state) => (
                      <option key={state.code} value={state.code}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset className="flex flex-col gap-2">
                  <legend className="font-sans text-sm font-medium text-foreground">
                    {waitlist.platformLabel}
                  </legend>
                  <div className="grid gap-2">
                    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border bg-background/50 px-3 has-[:checked]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
                      <input
                        type="radio"
                        name="platform"
                        value="android"
                        checked={platform === "android"}
                        onChange={() => setPlatform("android")}
                        className="size-4 accent-primary"
                        required
                      />
                      <span className="font-sans text-base text-foreground">
                        {waitlist.androidOption}
                      </span>
                    </label>
                    <label className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border bg-background/50 px-3 has-[:checked]:border-primary has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring">
                      <input
                        type="radio"
                        name="platform"
                        value="iphone"
                        checked={platform === "iphone"}
                        onChange={() => setPlatform("iphone")}
                        className="size-4 accent-primary"
                      />
                      <span className="font-sans text-base text-foreground">
                        {waitlist.iphoneOption}
                      </span>
                    </label>
                  </div>
                </fieldset>

                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
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
                  className="h-12 w-full cursor-pointer rounded-xl bg-primary text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="me-2 size-4 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    <>
                      {submitLabel}
                      <ArrowRight className="ms-2 size-4" aria-hidden />
                    </>
                  )}
                </Button>

                {status === "error" && (
                  <p id="waitlist-error" role="alert" className="font-sans text-sm text-destructive">
                    {errorMsg}
                  </p>
                )}

                {waitlist.privacyNote && (
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                    <span className="font-sans text-xs leading-relaxed">{waitlist.privacyNote}</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
