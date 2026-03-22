"use client"

import { useEffect, useState } from "react"
import { inject } from "@vercel/analytics"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "cookie-consent"

type ConsentValue = "accepted" | "declined"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue | null
    if (stored === "accepted") {
      inject()
    } else if (!stored) {
      setVisible(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted")
    inject()
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between md:px-12 lg:px-20">
        <p className="font-sans text-xs leading-relaxed text-muted-foreground">
          We use cookies to understand how you use our site and to improve your experience.{" "}
          <a
            href="/cookies"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Cookie policy
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={decline}
            className="cursor-pointer rounded-none border-border font-sans text-xs font-medium uppercase tracking-[0.12em]"
          >
            Decline
          </Button>
          <Button
            size="sm"
            onClick={accept}
            className="cursor-pointer rounded-none bg-primary font-sans text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground hover:bg-primary/85"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
