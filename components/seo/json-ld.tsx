"use client"

import { useRef } from "react"
import { useServerInsertedHTML } from "next/navigation"

/**
 * One JSON-LD script in the document head. The insert hook flushes more
 * than once during a render; the ref keeps a single copy.
 */
export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c")
  const emitted = useRef(false)

  useServerInsertedHTML(() => {
    if (emitted.current) return null
    emitted.current = true
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: json }}
      />
    )
  })

  return null
}
