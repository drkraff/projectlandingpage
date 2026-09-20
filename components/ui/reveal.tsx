"use client"

import { useRef, useEffect, useState, useSyncExternalStore } from "react"
import { cn } from "@/lib/utils"

interface RevealProps {
  children: React.ReactNode
  className?: string
  /** Delay in ms before the transition starts once in view */
  delay?: number
  /** IntersectionObserver threshold — fraction of element visible to trigger */
  threshold?: number
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Fades + translates children into view when the element enters the viewport.
 * Automatically no-ops when prefers-reduced-motion is set.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  threshold = 0.07,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false,
  )

  useEffect(() => {
    if (reducedMotion) return
    const el = ref.current
    if (!el) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold, reducedMotion])

  const shown = reducedMotion || visible

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-transform",
        shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
