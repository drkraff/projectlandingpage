/**
 * Best-effort IP rate limit for Vercel serverless.
 *
 * Tradeoffs:
 * - The Map lives in the isolate. Fluid Compute reuses warm instances, so this
 *   catches bursts on a single instance. Cold starts, other regions, and
 *   parallel isolates each have their own counters — it is not globally durable.
 * - Production complement (no extra env): a Vercel Firewall rate-limit rule on
 *   POST /api/waitlist. Upstash Redis would be globally durable if you add it later.
 * - Fails closed if the in-memory map grows past MAX_KEYS (abuse / leak guard).
 */

type Bucket = { timestamps: number[] }

const buckets = new Map<string, Bucket>()

const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 8
const MAX_KEYS = 10_000

export function rateLimit(
  key: string,
): { ok: true } | { ok: false; retryAfterSec: number } {
  const now = Date.now()
  const cutoff = now - WINDOW_MS

  pruneIfNeeded(cutoff)

  let bucket = buckets.get(key)
  if (!bucket) {
    if (buckets.size >= MAX_KEYS) {
      return { ok: false, retryAfterSec: Math.ceil(WINDOW_MS / 1000) }
    }
    bucket = { timestamps: [] }
    buckets.set(key, bucket)
  }

  bucket.timestamps = bucket.timestamps.filter((t) => t > cutoff)
  if (bucket.timestamps.length >= MAX_HITS) {
    const oldest = bucket.timestamps[0] ?? now
    const retryAfterSec = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000))
    return { ok: false, retryAfterSec }
  }

  bucket.timestamps.push(now)
  return { ok: true }
}

function pruneIfNeeded(cutoff: number) {
  if (buckets.size < MAX_KEYS * 0.9) return
  for (const [k, b] of buckets) {
    b.timestamps = b.timestamps.filter((t) => t > cutoff)
    if (b.timestamps.length === 0) buckets.delete(k)
  }
}
