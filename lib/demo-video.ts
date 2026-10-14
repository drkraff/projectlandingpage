export type DemoEmbed =
  | { kind: "file"; src: string }
  | { kind: "iframe"; src: string; title: string }

function youtubeId(value: string): string | null {
  if (!/^[\w-]{6,}$/.test(value)) return null
  return value
}

/**
 * Turn a configured demo URL into a player. Empty, non-https, and unknown
 * hosts return null so the section stays hidden.
 */
export function resolveDemoEmbed(videoUrl: string, title: string): DemoEmbed | null {
  const trimmed = videoUrl.trim()
  if (!trimmed) return null

  let parsed: URL
  try {
    parsed = new URL(trimmed)
  } catch {
    return null
  }

  if (parsed.protocol !== "https:") return null

  const host = parsed.hostname.replace(/^www\./, "")

  if (host === "youtu.be") {
    const id = youtubeId(parsed.pathname.split("/").filter(Boolean)[0] ?? "")
    if (!id) return null
    return {
      kind: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`,
      title,
    }
  }

  if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
    const fromQuery = parsed.searchParams.get("v")
    const fromPath = parsed.pathname.startsWith("/embed/")
      ? parsed.pathname.split("/")[2]
      : parsed.pathname.startsWith("/shorts/")
        ? parsed.pathname.split("/")[2]
        : ""
    const id = youtubeId(fromQuery || fromPath || "")
    if (!id) return null
    return {
      kind: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}`,
      title,
    }
  }

  if (host === "vimeo.com") {
    const id = parsed.pathname.split("/").filter(Boolean)[0] ?? ""
    if (!/^\d+$/.test(id)) return null
    return {
      kind: "iframe",
      src: `https://player.vimeo.com/video/${id}`,
      title,
    }
  }

  if (host === "player.vimeo.com") {
    return { kind: "iframe", src: trimmed, title }
  }

  if (/\.(mp4|webm|ogg)$/i.test(parsed.pathname)) {
    return { kind: "file", src: trimmed }
  }

  return null
}
