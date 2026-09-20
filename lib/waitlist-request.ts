export const MAX_WAITLIST_BODY_BYTES = 2048

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim()
    if (first) return first
  }

  return (
    req.headers.get("x-real-ip")?.trim() ||
    req.headers.get("cf-connecting-ip")?.trim() ||
    "unknown"
  )
}

function originFromUrl(value: string): string | null {
  try {
    const parsed = new URL(value)
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return null
    return `${parsed.protocol}//${parsed.host}`
  } catch {
    return null
  }
}

function withWwwVariant(origin: string): string[] {
  try {
    const parsed = new URL(origin)
    const host = parsed.hostname.startsWith("www.")
      ? parsed.hostname.slice(4)
      : `www.${parsed.hostname}`
    return [`${parsed.protocol}//${host}${parsed.port ? `:${parsed.port}` : ""}`]
  } catch {
    return []
  }
}

function allowedOrigins(req: Request, canonicalUrl?: string): Set<string> {
  const allowed = new Set<string>()
  const host =
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    req.headers.get("host")

  if (host) {
    allowed.add(`https://${host}`)
    allowed.add(`http://${host}`)
  }

  if (canonicalUrl) {
    const origin = originFromUrl(canonicalUrl)
    if (origin) {
      allowed.add(origin)
      for (const variant of withWwwVariant(origin)) allowed.add(variant)
    }
  }

  return allowed
}

/**
 * Same-site check for browser POSTs. Origin is preferred; Referer is the fallback.
 * Missing both is treated as cross-site (typical of non-browser clients).
 */
export function isSameSiteRequest(req: Request, canonicalUrl?: string): boolean {
  const allowed = allowedOrigins(req, canonicalUrl)
  if (allowed.size === 0) return false

  const originHeader = req.headers.get("origin")
  if (originHeader) {
    if (originHeader === "null") return false
    const origin = originFromUrl(originHeader)
    return origin !== null && allowed.has(origin)
  }

  const referer = req.headers.get("referer")
  if (referer) {
    const origin = originFromUrl(referer)
    return origin !== null && allowed.has(origin)
  }

  return false
}

export async function readLimitedJson(
  req: Request,
  maxBytes: number,
): Promise<
  | { ok: true; value: unknown }
  | { ok: false; status: 413 | 400 | 415 }
> {
  const contentType = req.headers.get("content-type") ?? ""
  if (!contentType.toLowerCase().includes("application/json")) {
    return { ok: false, status: 415 }
  }

  const declared = req.headers.get("content-length")
  if (declared) {
    const size = Number(declared)
    if (!Number.isFinite(size) || size < 0 || size > maxBytes) {
      return { ok: false, status: 413 }
    }
  }

  let text: string
  try {
    text = await req.text()
  } catch {
    return { ok: false, status: 400 }
  }

  if (text.length > maxBytes) {
    return { ok: false, status: 413 }
  }

  try {
    return { ok: true, value: JSON.parse(text) as unknown }
  } catch {
    return { ok: false, status: 400 }
  }
}
