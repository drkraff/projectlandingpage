import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { rateLimit } from "./rate-limit.ts"
import {
  MAX_WAITLIST_BODY_BYTES,
  getClientIp,
  isSameSiteRequest,
  normalizeWaitlistEmail,
  readLimitedJson,
} from "./waitlist-request.ts"

const CANONICAL = "https://www.velaquote.com"

function request(headers: Record<string, string>, body?: string): Request {
  return new Request("https://www.velaquote.com/api/waitlist", {
    method: "POST",
    headers,
    body,
  })
}

describe("getClientIp", () => {
  it("uses the platform forwarding header ahead of a spoofed X-Forwarded-For", () => {
    const req = request({
      "x-forwarded-for": "203.0.113.10, 198.51.100.9",
      "x-vercel-forwarded-for": "192.0.2.20",
    })
    assert.equal(getClientIp(req), "192.0.2.20")
  })

  it("uses x-real-ip ahead of the client-supplied forwarding prefix", () => {
    const req = request({
      "x-forwarded-for": "203.0.113.10, 198.51.100.9",
      "x-real-ip": "192.0.2.30",
    })
    assert.equal(getClientIp(req), "192.0.2.30")
  })

  it("uses the right-most X-Forwarded-For hop when that is all it has", () => {
    const req = request({
      "x-forwarded-for": "203.0.113.10, 198.51.100.9",
    })
    assert.equal(getClientIp(req), "198.51.100.9")
  })

  it("ignores a junk address and falls through", () => {
    const req = request({
      "x-vercel-forwarded-for": "not an ip",
      "x-real-ip": "2001:db8::1",
    })
    assert.equal(getClientIp(req), "2001:db8::1")
  })
})

describe("normalizeWaitlistEmail", () => {
  it("normalizes a normal address", () => {
    assert.equal(normalizeWaitlistEmail("  You@Example.com "), "you@example.com")
  })

  it("rejects header injection and control characters", () => {
    assert.equal(normalizeWaitlistEmail("you@example.com\nBcc: evil@example.com"), null)
    assert.equal(normalizeWaitlistEmail("you@example.com\r\nBcc: evil@example.com"), null)
    assert.equal(normalizeWaitlistEmail("you@example.com\u0000"), null)
    assert.equal(normalizeWaitlistEmail("you@example.com\u007f"), null)
  })

  it("rejects addresses that are not a single mailbox", () => {
    assert.equal(normalizeWaitlistEmail("you@example.com, other@example.com"), null)
    assert.equal(normalizeWaitlistEmail("<you@example.com>"), null)
    assert.equal(normalizeWaitlistEmail("you@example.com"), "you@example.com")
    assert.equal(normalizeWaitlistEmail("not-an-email"), null)
    assert.equal(normalizeWaitlistEmail("a@b"), null)
    assert.equal(normalizeWaitlistEmail("a@b.c"), null)
    assert.equal(normalizeWaitlistEmail(".you@example.com"), null)
    assert.equal(normalizeWaitlistEmail("you..name@example.com"), null)
    assert.equal(normalizeWaitlistEmail(`you@${"a".repeat(64)}.com`), null)
  })
})

describe("isSameSiteRequest", () => {
  it("allows the www site, the apex, and the request host", () => {
    assert.equal(
      isSameSiteRequest(
        request({ origin: "https://www.velaquote.com", "x-forwarded-host": "www.velaquote.com" }),
        CANONICAL,
      ),
      true,
    )
    assert.equal(
      isSameSiteRequest(
        request({ origin: "https://velaquote.com", "x-forwarded-host": "www.velaquote.com" }),
        CANONICAL,
      ),
      true,
    )
    assert.equal(
      isSameSiteRequest(
        request({
          origin: "https://preview.example.vercel.app",
          "x-forwarded-host": "preview.example.vercel.app",
        }),
        CANONICAL,
      ),
      true,
    )
  })

  it("rejects a foreign origin and a missing origin", () => {
    assert.equal(
      isSameSiteRequest(
        request({ origin: "https://evil.example", "x-forwarded-host": "www.velaquote.com" }),
        CANONICAL,
      ),
      false,
    )
    assert.equal(
      isSameSiteRequest(request({ "x-forwarded-host": "www.velaquote.com" }), CANONICAL),
      false,
    )
  })
})

describe("readLimitedJson", () => {
  it("parses a small JSON body", async () => {
    const result = await readLimitedJson(
      request({ "content-type": "application/json; charset=utf-8" }, '{"email":"a@b.co"}'),
      MAX_WAITLIST_BODY_BYTES,
    )
    assert.deepEqual(result, { ok: true, value: { email: "a@b.co" } })
  })

  it("rejects a non-JSON content type and an oversized body", async () => {
    const wrongType = await readLimitedJson(
      request({ "content-type": "text/plain" }, "{}"),
      MAX_WAITLIST_BODY_BYTES,
    )
    assert.deepEqual(wrongType, { ok: false, status: 415 })

    const oversized = await readLimitedJson(
      request(
        { "content-type": "application/json" },
        `{"email":"${"a".repeat(MAX_WAITLIST_BODY_BYTES)}"}`,
      ),
      MAX_WAITLIST_BODY_BYTES,
    )
    assert.deepEqual(oversized, { ok: false, status: 413 })
  })
})

describe("rateLimit", () => {
  it("stops a burst on one key and leaves another key alone", () => {
    const key = `test:${Date.now()}`
    for (let i = 0; i < 8; i++) {
      assert.equal(rateLimit(key).ok, true)
    }
    const blocked = rateLimit(key)
    assert.equal(blocked.ok, false)
    if (!blocked.ok) assert.ok(blocked.retryAfterSec >= 1)
    assert.equal(rateLimit(`${key}:other`).ok, true)
  })
})
