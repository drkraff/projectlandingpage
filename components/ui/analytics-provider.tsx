"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/react"

const STORAGE_KEY = "cookie-consent"

export function AnalyticsProvider() {
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    // Check initial state
    if (localStorage.getItem(STORAGE_KEY) === "accepted") {
      setConsented(true)
    }

    // Listen for consent granted in the same tab
    const onConsent = () => setConsented(true)
    window.addEventListener("cookie-consent-accepted", onConsent)
    return () => window.removeEventListener("cookie-consent-accepted", onConsent)
  }, [])

  if (!consented) return null
  return <Analytics />
}
