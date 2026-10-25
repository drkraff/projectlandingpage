import { timingSafeEqual } from "node:crypto"

type KeepaliveResult =
  | { readonly status: 200; readonly body: { readonly ok: true } }
  | { readonly status: 401 }
  | { readonly status: 503 }

type KeepaliveInput = {
  readonly authorization: string | null
  readonly cronSecret: string | undefined
  readonly client: WaitlistProbe | null
}

type CronGate = { readonly kind: "open" } | { readonly kind: "shut" }

type DatabaseReach = { readonly kind: "reached" } | { readonly kind: "unreached" }

type HandledSqlState = string & { readonly brand: "HandledSqlState" }

type WaitlistProbe = {
  from(table: "waitlist"): {
    select(columns: "created_at"): {
      limit(count: 1): PromiseLike<{
        readonly error: { readonly code: string } | null
      }>
    }
  }
}

export async function runKeepalive(input: KeepaliveInput): Promise<Response> {
  const gate = cronGate(input.authorization, input.cronSecret)
  if (gate.kind === "shut") return encodeKeepalive({ status: 401 })
  if (input.client === null) return encodeKeepalive({ status: 503 })
  const reach = await probeWaitlist(input.client)
  if (reach.kind === "reached") return encodeKeepalive({ status: 200, body: { ok: true } })
  return encodeKeepalive({ status: 503 })
}

function cronGate(authorization: string | null, cronSecret: string | undefined): CronGate {
  if (cronSecret === undefined || cronSecret === "") return { kind: "shut" }
  if (authorization === null) return { kind: "shut" }
  const bearer = "bearer "
  if (authorization.slice(0, bearer.length).toLowerCase() !== bearer) return { kind: "shut" }
  const encode = new TextEncoder()
  const tokenBytes = encode.encode(authorization.slice(bearer.length))
  const secretBytes = encode.encode(cronSecret)
  if (tokenBytes.length !== secretBytes.length) return { kind: "shut" }
  if (!timingSafeEqual(tokenBytes, secretBytes)) return { kind: "shut" }
  return { kind: "open" }
}

function handledSqlState(code: string | undefined): HandledSqlState | null {
  if (code === undefined || !/^[0-9A-Z]{5}$/.test(code) || code.startsWith("08")) return null
  return code as HandledSqlState
}

async function probeWaitlist(client: WaitlistProbe): Promise<DatabaseReach> {
  try {
    const { error } = await client.from("waitlist").select("created_at").limit(1)
    const code = error === null ? undefined : error.code
    if (error === null || handledSqlState(code) !== null) return { kind: "reached" }
    return { kind: "unreached" }
  } catch {
    return { kind: "unreached" }
  }
}

function encodeKeepalive(result: KeepaliveResult): Response {
  if (result.status === 200) return Response.json(result.body)
  return new Response(null, { status: result.status })
}
