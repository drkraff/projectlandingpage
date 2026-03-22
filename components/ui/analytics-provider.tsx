"use client"

import { Analytics } from "@vercel/analytics/react"
import type { BeforeSendEvent } from "@vercel/analytics"

const STORAGE_KEY = "cookie-consent"

function beforeSend(event: BeforeSendEvent) {
  // Block all events if user hasn't accepted cookies
  if (typeof window === "undefined") return null
  if (localStorage.getItem(STORAGE_KEY) !== "accepted") return null
  return event
}

export function AnalyticsProvider() {
  // Always render — script must load unconditionally for Vercel detection.
  // beforeSend gates actual data collection behind cookie consent.
  return <Analytics beforeSend={beforeSend} />
}
