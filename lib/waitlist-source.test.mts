import assert from "node:assert/strict"
import { describe, it } from "node:test"
import { electriciansPage } from "./electricians-page.ts"
import {
  WAITLIST_SOURCE_STORAGE_KEY,
  attributionFromPage,
  captureWaitlistSource,
  externalReferrerHost,
  isUndefinedColumnError,
  readWaitlistSource,
  sanitizeWaitlistSource,
} from "./waitlist-source.ts"

function memoryStorage() {
  const map = new Map<string, string>()
  return {
    map,
    getItem(key: string) {
      return map.has(key) ? map.get(key)! : null
    },
    setItem(key: string, value: string) {
      map.set(key, value)
    },
  }
}

describe("attributionFromPage", () => {
  it("stores pathname, external referrer host, and the three utm params", () => {
    const source = attributionFromPage({
      pathname: "/voice-to-quote-electricians",
      search: "?utm_source=ig&utm_medium=social&utm_campaign=spring&utm_term=ignored",
      referrer: "https://news.example/story?id=1",
      host: "www.velaquote.com",
    })
    assert.deepEqual(source, {
      landing_path: "/voice-to-quote-electricians",
      referrer_host: "news.example",
      utm_source: "ig",
      utm_medium: "social",
      utm_campaign: "spring",
    })
    assert.equal(JSON.stringify(source).includes("utm_term"), false)
    assert.equal(JSON.stringify(source).includes("/story"), false)
  })

  it("drops a same-site or missing referrer and keeps the host only", () => {
    assert.equal(
      externalReferrerHost("https://velaquote.com/voice-to-quote-electricians", "www.velaquote.com"),
      "",
    )
    assert.equal(
      externalReferrerHost("https://www.velaquote.com/pricing", "velaquote.com"),
      "",
    )
    assert.equal(
      externalReferrerHost("https://blog.velaquote.com/post", "www.velaquote.com"),
      "",
    )
    assert.equal(externalReferrerHost("https://google.com/search?q=vela", "www.velaquote.com"), "google.com")
    assert.equal(externalReferrerHost("", "www.velaquote.com"), "")
    assert.equal(externalReferrerHost("not a url", "www.velaquote.com"), "")
    assert.equal(
      externalReferrerHost("https://user:secret@news.example/private?q=1", "www.velaquote.com"),
      "news.example",
    )
  })

  it("keeps the first page view in the session", () => {
    const storage = memoryStorage()
    const first = {
      pathname: "/voice-to-quote-electricians",
      search: "?utm_source=first&utm_medium=cpc&utm_campaign=spring",
      referrer: "https://news.example/a",
      host: "www.velaquote.com",
    }
    captureWaitlistSource(first, storage)
    captureWaitlistSource(
      {
        pathname: "/",
        search: "?utm_source=second",
        referrer: "https://other.example/",
        host: "www.velaquote.com",
      },
      storage,
    )
    assert.deepEqual(readWaitlistSource(storage), {
      landing_path: "/voice-to-quote-electricians",
      referrer_host: "news.example",
      utm_source: "first",
      utm_medium: "cpc",
      utm_campaign: "spring",
    })
    assert.deepEqual([...storage.map.keys()], [WAITLIST_SOURCE_STORAGE_KEY])
    const stored = storage.map.get(WAITLIST_SOURCE_STORAGE_KEY) ?? ""
    assert.equal(stored.includes("?"), false)
    assert.equal(stored.includes("secret"), false)
  })
})

describe("sanitizeWaitlistSource", () => {
  it("trims, caps, and drops non-strings, blanks, and unknown keys", () => {
    const source = sanitizeWaitlistSource({
      email: "you@example.com",
      website: "https://spam.example",
      referrer: "https://evil.example/full-url",
      utm_source: `  ${"a".repeat(150)}  `,
      utm_medium: 12,
      utm_campaign: "  ",
      landing_path: `/${"b".repeat(250)}`,
      referrer_host: "https://user:secret@news.example/private/path?q=1#x",
    })
    assert.equal(source.utm_source?.length, 100)
    assert.equal(source.utm_source, "a".repeat(100))
    assert.equal(source.utm_medium, undefined)
    assert.equal(source.utm_campaign, undefined)
    assert.equal(source.landing_path?.length, 200)
    assert.equal(source.landing_path, `/${"b".repeat(199)}`)
    assert.equal(source.referrer_host, "news.example")
    assert.equal("email" in source, false)
    assert.equal("website" in source, false)
    assert.equal("referrer" in source, false)
    assert.equal(JSON.stringify(source).includes("secret"), false)
    assert.equal(JSON.stringify(source).includes("private"), false)
    assert.equal(JSON.stringify(source).includes("https://"), false)
  })

  it("omits blank fields and still accepts a payload with none of them", () => {
    assert.deepEqual(sanitizeWaitlistSource({}), {})
    assert.deepEqual(
      sanitizeWaitlistSource({
        referrer_host: "",
        utm_source: "   ",
        utm_medium: null,
        landing_path: "\n",
      }),
      {},
    )
  })

  it("stores a referrer host and a pathname, never the full URL", () => {
    assert.deepEqual(
      sanitizeWaitlistSource({
        referrer_host: "News.Example:8443",
        landing_path: "https://evil.example/voice-to-quote-electricians?utm_source=x#faq",
        utm_campaign: " spring ",
      }),
      {
        referrer_host: "news.example:8443",
        landing_path: "/voice-to-quote-electricians",
        utm_campaign: "spring",
      },
    )
    assert.equal(sanitizeWaitlistSource({ referrer_host: "javascript:alert(1)" }).referrer_host, undefined)
    assert.equal(sanitizeWaitlistSource({ landing_path: "not-a-path" }).landing_path, undefined)
    assert.equal(sanitizeWaitlistSource({ utm_source: "ok\nBcc: x" }).utm_source, undefined)
  })
})

describe("isUndefinedColumnError", () => {
  it("matches Postgres 42703 and PostgREST schema-cache PGRST204 only", () => {
    assert.equal(isUndefinedColumnError({ code: "42703" }), true)
    assert.equal(isUndefinedColumnError({ code: "PGRST204", message: "Could not find the column" }), true)
    assert.equal(
      isUndefinedColumnError({ code: "XX000", message: "column missing", details: "SQLSTATE 42703" }),
      true,
    )
    assert.equal(isUndefinedColumnError({ code: "23505" }), false)
    assert.equal(isUndefinedColumnError({ code: "PGRST205" }), false)
  })
})

describe("electricians FAQ", () => {
  it("says Vela is pre-launch in the shared FAQ answer", () => {
    const answer = electriciansPage.faq.find((item) => item.question === "Is Vela live?")?.answer
    assert.equal(
      answer,
      "Vela is pre-launch. Join the waitlist and we’ll email you when it’s ready to try.",
    )
    assert.equal(answer?.includes("early beta"), false)
  })
})
