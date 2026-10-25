import { getSupabaseClient } from "@/lib/supabase"
import { runKeepalive } from "@/lib/keepalive"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request): Promise<Response> {
  return runKeepalive({
    authorization: request.headers.get("authorization"),
    cronSecret: process.env.CRON_SECRET,
    client: getSupabaseClient(),
  })
}
