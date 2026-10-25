"use client"

import { useEffect } from "react"
import { captureWaitlistSourceFromWindow } from "@/lib/waitlist-source"

/**
 * Records the first page view in this tab: pathname, external referrer host,
 * and utm_source / utm_medium / utm_campaign. sessionStorage only.
 */
export function WaitlistSourceCapture() {
  useEffect(() => {
    captureWaitlistSourceFromWindow()
  }, [])
  return null
}
