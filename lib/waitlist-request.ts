export const MAX_WAITLIST_BODY_BYTES = 2048
const MAX_EMAIL_LENGTH = 254

/**
 * Platform client IP.
 *
 * On Vercel, `x-vercel-forwarded-for` is overwritten by the platform, so a
 * caller cannot spoof it. `x-forwarded-for` keeps any client-supplied prefix
 * and the real address is appended, so the left-most value is not the visitor.
 */
export function getClientIp(req: Request): string {
  const vercel = headerIps(req.headers.get("x-vercel-forwarded-for"))
  if (vercel[0]) return vercel[0]

  const real = cleanIp(req.headers.get("x-real-ip"))
  if (real) return real

  const forwarded = headerIps(req.headers.get("x-forwarded-for"))
  if (forwarded.length > 0) return forwarded[forwarded.length - 1]

  return "unknown"
}

function headerIps(value: string | null): string[] {
  if (!value) return []
  return value
    .split(",")
    .map((part) => cleanIp(part))
    .filter((part): part is string => part !== null)
}

function cleanIp(value: string | null | undefined): string | null {
  if (!value) return null
  const ip = value.trim()
  if (ip.length < 2 || ip.length > 64) return null
  if (!/^[0-9a-fA-F:.]+$/.test(ip)) return null
  return ip
}

/**
 * Trim, lowercase, and reject anything that is not a single mailbox.
 * Control characters and header metacharacters are rejected so the value
 * cannot be turned into extra mail headers if it is later copied into one.
 */
export function normalizeWaitlistEmail(input: unknown): string | null {
  if (typeof input !== "string") return null
  const email = input.trim().toLowerCase()
  if (email.length === 0 || email.length > MAX_EMAIL_LENGTH) return null
  if (/[\u0000-\u001f\u007f]/.test(email)) return null
  if (/[<>"'\\,\s]/.test(email)) return null

  const at = email.indexOf("@")
  if (at <= 0 || at !== email.lastIndexOf("@")) return null
  const local = email.slice(0, at)
  const domain = email.slice(at + 1)
  if (local.length > 64 || domain.length > 253) return null
  if (local.startsWith(".") || local.endsWith(".") || local.includes("..")) return null
  if (!/^[a-z0-9.!#$%&*+/=?^_`{|}~-]+$/.test(local)) return null

  const labels = domain.split(".")
  if (labels.length < 2) return null
  for (const label of labels) {
    if (
      label.length === 0 ||
      label.length > 63 ||
      label.startsWith("-") ||
      label.endsWith("-") ||
      !/^[a-z0-9-]+$/.test(label)
    ) {
      return null
    }
  }
  const tld = labels[labels.length - 1]
  if (!tld || tld.length < 2 || !/^[a-z]+$/.test(tld)) return null
  return email
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
  const mediaType = (req.headers.get("content-type") ?? "")
    .split(";")[0]
    ?.trim()
    .toLowerCase()
  if (mediaType !== "application/json") {
    return { ok: false, status: 415 }
  }

  const declared = req.headers.get("content-length")
  if (declared) {
    const size = Number(declared)
    if (!Number.isFinite(size) || size < 0 || size > maxBytes) {
      return { ok: false, status: 413 }
    }
  }

  if (!req.body) return { ok: false, status: 400 }

  const reader = req.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      if (!value) continue
      total += value.byteLength
      if (total > maxBytes) {
        await reader.cancel()
        return { ok: false, status: 413 }
      }
      chunks.push(value)
    }
  } catch {
    return { ok: false, status: 400 }
  }

  let text: string
  try {
    text = new TextDecoder("utf-8", { fatal: true }).decode(concatBytes(chunks))
  } catch {
    return { ok: false, status: 400 }
  }

  try {
    return { ok: true, value: JSON.parse(text) as unknown }
  } catch {
    return { ok: false, status: 400 }
  }
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const out = new Uint8Array(chunks.reduce((sum, chunk) => sum + chunk.byteLength, 0))
  let offset = 0
  for (const chunk of chunks) {
    out.set(chunk, offset)
    offset += chunk.byteLength
  }
  return out
}
