/**
 * First-touch waitlist attribution.
 *
 * Captured once per tab in sessionStorage (not cookies, not localStorage).
 * The browser stores a pathname, a referrer host, and three UTM params.
 * The API drops anything else and never writes a full referrer URL.
 */

export const WAITLIST_SOURCE_STORAGE_KEY = "vela-waitlist-source"

export const WAITLIST_SOURCE_FIELDS = [
  "referrer_host",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "landing_path",
] as const

export type WaitlistSourceField = (typeof WAITLIST_SOURCE_FIELDS)[number]

export type WaitlistSource = Record<WaitlistSourceField, string>

const LIMITS: Record<WaitlistSourceField, number> = {
  referrer_host: 255,
  utm_source: 100,
  utm_medium: 100,
  utm_campaign: 100,
  landing_path: 200,
}

export type WaitlistPageView = {
  pathname: string
  search: string
  referrer: string
  host: string
}

type KeyValueStorage = {
  getItem(key: string): string | null
  setItem(key: string, value: string): void
}

/** Host from `new URL(referrer).host`, or "" when missing, invalid, or same-site. */
export function externalReferrerHost(referrer: string, currentHost: string): string {
  if (!referrer.trim()) return ""
  let host = ""
  try {
    host = new URL(referrer).host
  } catch {
    return ""
  }
  if (!host || isSameSiteHost(host, currentHost)) return ""
  return host
}

/**
 * Same registrable host: exact host, a leading www, or a subdomain.
 * Port is ignored. A one-label host is never treated as a public suffix.
 */
export function isSameSiteHost(referrerHost: string, currentHost: string): boolean {
  const left = comparableHost(referrerHost)
  const right = comparableHost(currentHost)
  if (!left || !right) return false
  if (left === right) return true
  if (labelCount(right) >= 2 && left.endsWith(`.${right}`)) return true
  if (labelCount(left) >= 2 && right.endsWith(`.${left}`)) return true
  return false
}

export function attributionFromPage(page: WaitlistPageView): WaitlistSource {
  const params = new URLSearchParams(stripLeadingQuestion(page.search))
  return {
    landing_path: pathnameOnly(page.pathname) ?? "/",
    referrer_host: externalReferrerHost(page.referrer, page.host),
    utm_source: utmParam(params, "utm_source"),
    utm_medium: utmParam(params, "utm_medium"),
    utm_campaign: utmParam(params, "utm_campaign"),
  }
}

/** Write once. A later navigation in the same tab must not replace the landing hit. */
export function captureWaitlistSource(page: WaitlistPageView, storage: KeyValueStorage): void {
  try {
    if (storage.getItem(WAITLIST_SOURCE_STORAGE_KEY) !== null) return
    storage.setItem(WAITLIST_SOURCE_STORAGE_KEY, JSON.stringify(attributionFromPage(page)))
  } catch {
    // Private mode and blocked storage still allow an email-only signup.
  }
}

/** Non-empty source fields only. Blank values are omitted so the insert can skip them. */
export function readWaitlistSource(storage: KeyValueStorage): Partial<WaitlistSource> {
  try {
    const raw = storage.getItem(WAITLIST_SOURCE_STORAGE_KEY)
    if (!raw) return {}
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {}
    const record = parsed as Record<string, unknown>
    const out: Partial<WaitlistSource> = {}
    for (const key of WAITLIST_SOURCE_FIELDS) {
      const value = record[key]
      if (typeof value !== "string") continue
      const trimmed = value.trim()
      if (!trimmed) continue
      out[key] = trimmed
    }
    return out
  } catch {
    return {}
  }
}

export function captureWaitlistSourceFromWindow(): void {
  if (typeof window === "undefined") return
  captureWaitlistSource(pageFromWindow(window), window.sessionStorage)
}

export function readWaitlistSourceFromWindow(): Partial<WaitlistSource> {
  if (typeof window === "undefined") return {}
  try {
    return readWaitlistSource(window.sessionStorage)
  } catch {
    return {}
  }
}

/**
 * Keep string fields the route is allowed to store. Non-strings, blanks, and
 * unknown keys are dropped. Lengths are capped. A referrer is reduced to its
 * host so a full URL is never written.
 */
export function sanitizeWaitlistSource(input: Record<string, unknown>): Partial<WaitlistSource> {
  const out: Partial<WaitlistSource> = {}
  for (const key of WAITLIST_SOURCE_FIELDS) {
    const value = sanitizeField(key, input[key])
    if (value) out[key] = value
  }
  return out
}

/** Postgres undefined_column, including PostgREST's schema-cache wrapper. */
export function isUndefinedColumnError(error: {
  code?: string | null
  message?: string | null
  details?: string | null
}): boolean {
  const code = error.code ?? ""
  if (code === "42703" || code === "PGRST204") return true
  const text = `${error.message ?? ""}\n${error.details ?? ""}`
  return /\b42703\b/.test(text)
}

function sanitizeField(key: WaitlistSourceField, input: unknown): string | null {
  if (typeof input !== "string") return null
  const trimmed = input.trim()
  if (!trimmed || /[\u0000-\u001f\u007f]/.test(trimmed)) return null
  if (key === "referrer_host") return capHost(trimmed)
  if (key === "landing_path") return capPath(trimmed)
  return trimmed.slice(0, LIMITS[key])
}

function capHost(value: string): string | null {
  const host = hostOnly(value)
  if (!host) return null
  const capped = host.slice(0, LIMITS.referrer_host).toLowerCase()
  if (!isPlausibleHost(capped)) return null
  return capped
}

function capPath(value: string): string | null {
  const path = pathnameOnly(value)
  if (!path) return null
  return path.slice(0, LIMITS.landing_path) || null
}

function hostOnly(value: string): string | null {
  const candidate = toHttpUrl(value)
  if (!candidate) return null
  try {
    const parsed = new URL(candidate)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null
    return parsed.host || null
  } catch {
    return null
  }
}

function toHttpUrl(value: string): string | null {
  if (value.startsWith("//")) return `https:${value}`
  // Require "://" so a host:port is not parsed as a scheme.
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(value)) return value
  return `https://${value}`
}

function pathnameOnly(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  if (looksLikeAbsoluteUrl(trimmed) || trimmed.startsWith("//")) {
    try {
      const parsed = new URL(trimmed.startsWith("//") ? `https:${trimmed}` : trimmed)
      if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null
      return parsed.pathname || "/"
    } catch {
      return null
    }
  }
  const cut = trimmed.search(/[?#]/)
  const path = cut === -1 ? trimmed : trimmed.slice(0, cut)
  return path.startsWith("/") ? path : null
}

function looksLikeAbsoluteUrl(value: string): boolean {
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(value)
}

function isPlausibleHost(host: string): boolean {
  if (!host || /[/?#@\\\s]/.test(host) || host.includes("://")) return false
  const { hostname, port } = splitHost(host)
  if (port && (!/^[0-9]+$/.test(port) || Number(port) > 65535)) return false
  if (hostname.startsWith("[") && hostname.endsWith("]")) return hostname.length > 2
  if (!/^[a-z0-9.-]+$/.test(hostname)) return false
  if (hostname.startsWith(".") || hostname.endsWith(".") || hostname.includes("..")) return false
  return true
}

function utmParam(params: URLSearchParams, name: string): string {
  const value = params.get(name)
  return typeof value === "string" ? value.trim() : ""
}

function stripLeadingQuestion(search: string): string {
  return search.startsWith("?") ? search.slice(1) : search
}

function comparableHost(host: string): string {
  const { hostname } = splitHost(host.trim().toLowerCase())
  if (!hostname) return ""
  const bare = hostname.startsWith("www.") ? hostname.slice(4) : hostname
  return bare.endsWith(".") ? bare.slice(0, -1) : bare
}

function labelCount(hostname: string): number {
  return hostname.split(".").filter(Boolean).length
}

function splitHost(host: string): { hostname: string; port: string } {
  if (host.startsWith("[")) {
    const end = host.indexOf("]")
    if (end === -1) return { hostname: host, port: "" }
    const rest = host.slice(end + 1)
    if (rest.startsWith(":")) return { hostname: host.slice(0, end + 1), port: rest.slice(1) }
    return { hostname: host.slice(0, end + 1), port: "" }
  }
  const colon = host.lastIndexOf(":")
  if (colon > -1 && host.indexOf(":") === colon) {
    return { hostname: host.slice(0, colon), port: host.slice(colon + 1) }
  }
  return { hostname: host, port: "" }
}

function pageFromWindow(win: Window): WaitlistPageView {
  return {
    pathname: win.location.pathname,
    search: win.location.search,
    referrer: win.document.referrer,
    host: win.location.host,
  }
}
