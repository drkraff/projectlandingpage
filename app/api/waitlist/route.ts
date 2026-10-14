import { NextRequest, NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"
import { rateLimit } from "@/lib/rate-limit"
import {
  MAX_WAITLIST_BODY_BYTES,
  getClientIp,
  isSameSiteRequest,
  readLimitedJson,
} from "@/lib/waitlist-request"
import siteConfig from "@/lib/site.config"
import { isUsStateCode } from "@/lib/us-states"

export const runtime = "nodejs"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_EMAIL_LENGTH = 254
const GENERIC_ERROR = "Something went wrong. Please try again."
const GENERIC_REJECT = "Unable to process request."

function optionalString(value: unknown): string | null {
  if (value == null) return null
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  return trimmed === "" ? null : trimmed
}

function isMissingColumn(error: { code?: string; message?: string }): boolean {
  if (error.code === "42703" || error.code === "PGRST204") return true
  const message = (error.message ?? "").toLowerCase()
  return message.includes("schema cache") && message.includes("column")
}

function jsonError(message: string, status: number, extraHeaders?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers: extraHeaders })
}

function jsonOk() {
  return NextResponse.json({ ok: true }, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    const limited = rateLimit(`waitlist:${ip}`)
    if (!limited.ok) {
      return jsonError("Too many requests. Please try again later.", 429, {
        "Retry-After": String(limited.retryAfterSec),
      })
    }

    if (!isSameSiteRequest(req, siteConfig.seo.canonicalUrl)) {
      return jsonError(GENERIC_REJECT, 403)
    }

    const body = await readLimitedJson(req, MAX_WAITLIST_BODY_BYTES)
    if (!body.ok) {
      if (body.status === 413) return jsonError("Request too large.", 413)
      if (body.status === 415) return jsonError(GENERIC_REJECT, 415)
      return jsonError("Invalid email address.", 400)
    }

    if (body.value === null || typeof body.value !== "object") {
      return jsonError("Invalid email address.", 400)
    }

    const payload = body.value as Record<string, unknown>
    // Honeypot: bots fill this; real users never see it. Pretend success.
    if (typeof payload.website === "string" && payload.website.trim() !== "") {
      return jsonOk()
    }

    const email = payload.email
    if (
      typeof email !== "string" ||
      email.length > MAX_EMAIL_LENGTH ||
      !EMAIL_RE.test(email)
    ) {
      return jsonError("Invalid email address.", 400)
    }

    const trades = new Set(siteConfig.sections.waitlist.trades.map((item) => item.value))
    const trade = optionalString(payload.trade)
    if (payload.trade != null && payload.trade !== "" && (trade === null || !trades.has(trade))) {
      return jsonError("Choose a trade.", 400)
    }

    const usStateRaw = optionalString(payload.usState)
    const usState = usStateRaw ? usStateRaw.toUpperCase() : null
    if (payload.usState != null && payload.usState !== "" && (usState === null || !isUsStateCode(usState))) {
      return jsonError("Choose a US state.", 400)
    }

    const platform = optionalString(payload.platform)
    if (platform !== null && platform !== "android" && platform !== "iphone") {
      return jsonError("Choose Android or iPhone.", 400)
    }

    const supabase = getSupabaseClient()
    if (!supabase) {
      console.error("Waitlist storage unavailable")
      return jsonError(GENERIC_ERROR, 503)
    }

    const table = siteConfig.sections.waitlist.supabaseTable ?? "waitlist"
    const normalizedEmail = email.toLowerCase().trim()
    const row: Record<string, string> = { email: normalizedEmail }
    if (trade) row.trade = trade
    if (usState) row.us_state = usState
    if (platform) row.platform = platform

    let { error } = await supabase.from(table).insert(row)

    // Existing tables may only have email until the owner runs the column migration.
    if (error && isMissingColumn(error) && Object.keys(row).length > 1) {
      console.error("Waitlist extra columns missing; stored email only")
      const retry = await supabase.from(table).insert({ email: normalizedEmail })
      error = retry.error
    }

    if (error) {
      // Unique violation — already signed up. Do not reveal that.
      if (error.code === "23505") {
        return jsonOk()
      }
      console.error("Waitlist insert failed")
      return jsonError(GENERIC_ERROR, 500)
    }

    return jsonOk()
  } catch {
    return jsonError(GENERIC_ERROR, 500)
  }
}
