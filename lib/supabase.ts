import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let cached: SupabaseClient | null | undefined

function isUsableUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === "https:" || parsed.protocol === "http:"
  } catch {
    return false
  }
}

/**
 * Fail closed: missing or invalid public env returns null.
 * Callers must handle null — never assume a client exists.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (cached !== undefined) return cached

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

  if (!url || !key || !isUsableUrl(url)) {
    cached = null
    return cached
  }

  try {
    cached = createClient(url, key)
  } catch {
    cached = null
  }

  return cached
}
