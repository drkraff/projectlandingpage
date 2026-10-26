import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { describe, it, mock } from "node:test"
import { fileURLToPath } from "node:url"
import { runKeepalive } from "./keepalive.ts"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const SECRET = "cron-secret-value"
const EMAIL = "person@example.com"

type ProbeCall = [string, string | number]

function throwing(calls: ProbeCall[], name: string) {
  return () => {
    calls.push([name, name])
    throw new Error(name)
  }
}

function fakeClient(onLimit: () => unknown) {
  const calls: ProbeCall[] = []
  const client = {
    from(table: string) {
      calls.push(["from", table])
      return {
        select(columns: string) {
          calls.push(["select", columns])
          return {
            limit(count: number) {
              calls.push(["limit", count])
              return onLimit()
            },
            insert: throwing(calls, "insert"),
            update: throwing(calls, "update"),
            delete: throwing(calls, "delete"),
            upsert: throwing(calls, "upsert"),
            rpc: throwing(calls, "rpc"),
          }
        },
        insert: throwing(calls, "insert"),
        update: throwing(calls, "update"),
        delete: throwing(calls, "delete"),
        upsert: throwing(calls, "upsert"),
        rpc: throwing(calls, "rpc"),
      }
    },
    insert: throwing(calls, "insert"),
    update: throwing(calls, "update"),
    delete: throwing(calls, "delete"),
    upsert: throwing(calls, "upsert"),
    rpc: throwing(calls, "rpc"),
  }
  return { client, calls }
}

function openGate(client: ReturnType<typeof fakeClient>["client"] | null) {
  return {
    authorization: `Bearer ${SECRET}`,
    cronSecret: SECRET,
    client,
  }
}

describe("runKeepalive", () => {
  it("returns 401 and an empty body without calling from when the gate is shut", async () => {
    const cases = [
      { authorization: null, cronSecret: SECRET },
      { authorization: `Bearer ${SECRET}`, cronSecret: undefined },
      { authorization: "Bearer ", cronSecret: "" },
      { authorization: `Basic ${SECRET}`, cronSecret: SECRET },
      { authorization: `Bearer ${"x".repeat(SECRET.length)}`, cronSecret: SECRET },
      { authorization: "Bearer short", cronSecret: SECRET },
      { authorization: "Bearer undefined", cronSecret: undefined },
    ]
    for (const input of cases) {
      const { client, calls } = fakeClient(() => {
        throw new Error("probed")
      })
      const response = await runKeepalive({ ...input, client })
      assert.equal(response.status, 401)
      assert.equal(response.statusText, "")
      assert.deepEqual([...response.headers], [])
      assert.equal(await response.text(), "")
      assert.deepEqual(calls, [])
    }
  })

  it("accepts bearer and BEARER when Postgres returns 42501", async () => {
    for (const scheme of ["bearer", "BEARER"]) {
      const { client } = fakeClient(() =>
        Promise.resolve({ data: null, error: { code: "42501" } }),
      )
      const response = await runKeepalive({
        authorization: `${scheme} ${SECRET}`,
        cronSecret: SECRET,
        client,
      })
      assert.equal(response.status, 200)
      assert.equal(await response.text(), '{"ok":true}')
    }
  })

  it("rejects a secret that still has its trailing newline", async () => {
    const { client, calls } = fakeClient(() => {
      throw new Error("probed")
    })
    const response = await runKeepalive({
      authorization: `Bearer ${SECRET}`,
      cronSecret: `${SECRET}\n`,
      client,
    })
    assert.equal(response.status, 401)
    assert.equal(await response.text(), "")
    assert.deepEqual(calls, [])
  })

  it("returns 503 without calling from when the client is null", async () => {
    const response = await runKeepalive(openGate(null))
    assert.equal(response.status, 503)
    assert.equal(response.statusText, "")
    assert.deepEqual([...response.headers], [])
    assert.equal(await response.text(), "")
  })

  it("returns {\"ok\":true} for 42501 and a null error and drops the row", async () => {
    const results = [
      {
        data: [{ email: EMAIL }],
        error: { code: "42501", message: EMAIL, details: EMAIL, hint: EMAIL },
        count: 1,
        status: 401,
        statusText: "Unauthorized",
      },
      {
        data: [{ email: EMAIL }],
        error: null,
        count: 1,
      },
    ]
    for (const result of results) {
      const { client } = fakeClient(() => Promise.resolve(result))
      const response = await runKeepalive(openGate(client))
      const text = await response.text()
      assert.equal(response.status, 200)
      assert.equal(text, '{"ok":true}')
      assert.equal(text.includes(EMAIL), false)
    }
  })

  it("returns 503 for an unreached database and hides the code", async () => {
    for (const code of ["PGRST205", "PGRST204", "08006", ""]) {
      const { client } = fakeClient(() =>
        Promise.resolve({
          data: [{ email: code, created_at: code }],
          error: { code, message: code, details: code, hint: code },
          count: 1,
        }),
      )
      const response = await runKeepalive(openGate(client))
      const text = await response.text()
      assert.equal(response.status, 503)
      assert.equal(text, "")
      if (code !== "") assert.equal(text.includes(code), false)
    }
  })

  it("returns 200 when Postgres reports 42P01", async () => {
    const { client } = fakeClient(() =>
      Promise.resolve({ data: null, error: { code: "42P01" } }),
    )
    const response = await runKeepalive(openGate(client))
    assert.equal(response.status, 200)
    assert.equal(await response.text(), '{"ok":true}')
  })

  it("returns 503 when the select throws and omits the error email", async () => {
    const { client } = fakeClient(() => {
      throw new Error(`delivery failed for ${EMAIL}`)
    })
    const response = await runKeepalive(openGate(client))
    const text = await response.text()
    assert.equal(response.status, 503)
    assert.equal(text, "")
    assert.equal(text.includes(EMAIL), false)
  })

  it("does not call console.log or console.error", async () => {
    const log = mock.method(console, "log", () => {})
    const error = mock.method(console, "error", () => {})
    try {
      const reached = fakeClient(() =>
        Promise.resolve({ data: [{ email: EMAIL }], error: null }),
      )
      const ok = await runKeepalive(openGate(reached.client))
      assert.equal(ok.status, 200)

      const thrown = fakeClient(() => {
        throw new Error(`delivery failed for ${EMAIL}`)
      })
      const failure = await runKeepalive(openGate(thrown.client))
      assert.equal(failure.status, 503)
      assert.equal(await failure.text(), "")
      assert.equal(log.mock.calls.length, 0)
      assert.equal(error.mock.calls.length, 0)
    } finally {
      log.mock.restore()
      error.mock.restore()
    }
  })

  it("repeats the same select and does not write", async () => {
    const { client, calls } = fakeClient(() =>
      Promise.resolve({
        data: [{ email: EMAIL }],
        error: { code: "42501" },
      }),
    )
    const input = openGate(client)
    const first = await runKeepalive(input)
    const second = await runKeepalive(input)
    const firstText = await first.text()
    const secondText = await second.text()
    assert.equal(first.status, 200)
    assert.equal(firstText, '{"ok":true}')
    assert.equal(firstText.includes(EMAIL), false)
    assert.equal(second.status, 200)
    assert.equal(secondText, '{"ok":true}')
    assert.equal(secondText.includes(EMAIL), false)
    assert.deepEqual(calls, [
      ["from", "waitlist"],
      ["select", "created_at"],
      ["limit", 1],
      ["from", "waitlist"],
      ["select", "created_at"],
      ["limit", 1],
    ])
  })

  it("schedules one daily keepalive and keeps the host redirect", () => {
    const vercel = JSON.parse(readFileSync(join(root, "vercel.json"), "utf8")) as {
      redirects: Array<{
        source: string
        has: Array<{ type: string; value: string }>
        destination: string
        permanent: boolean
      }>
      crons: Array<{ path: string; schedule: string }>
    }
    assert.deepEqual(vercel.crons, [{ path: "/api/cron/keepalive", schedule: "0 6 * * *" }])
    assert.deepEqual(vercel.redirects, [
      {
        source: "/:path*",
        has: [{ type: "host", value: "projectlandingpage.vercel.app" }],
        destination: "https://www.velaquote.com/:path*",
        permanent: true,
      },
    ])
    const route = readFileSync(join(root, "app/api/cron/keepalive/route.ts"), "utf8")
    assert.equal(route.includes("next/server"), false)
    assert.equal(route.includes("runKeepalive"), true)
  })

  it("documents the cron secret in the readme", () => {
    const readme = readFileSync(join(root, "README.md"), "utf8")
    assert.equal(readme.includes("CRON_SECRET"), true)
    assert.equal(readme.includes("/api/cron/keepalive"), true)
    assert.equal(readme.includes("0 6 * * *"), true)
    assert.equal(
      readme.includes(
        "Copy `.env.example` to `.env.local` and set the public Supabase keys if you want waitlist signups to persist.\nSet `CRON_SECRET` on the Vercel project to a long random value.\nVercel Cron sends it as `Authorization: Bearer <CRON_SECRET>` to `GET /api/cron/keepalive` on `0 6 * * *` UTC.\nUntil that variable is set, the route returns 401 and does not query Supabase.\n",
      ),
      true,
    )
  })
})
