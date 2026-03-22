"use client"

import { memo, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion"

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)
  useIsomorphicLayoutEffect(() => {
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    const handler = () => setMatches(mq.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [query])
  return matches
}

export type CarouselTestimonial = {
  src: string
  name: string
  role: string
  company: string
  quote: string
}

const AUTO_SPEED = 0.06
const DRAG_FACTOR = 0.3
const VELOCITY_FACTOR = 0.1
const MOMENTUM_DECAY = 0.92

const cardTransition = { duration: 0.5, ease: [0.32, 0.72, 0, 1] as const }
const overlayTransition = { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const }

/** Reusable decorative quote mark matching the editorial design system */
function QuoteMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`select-none font-heading leading-none text-primary/30 ${className}`}
      aria-hidden
    >
      &ldquo;
    </span>
  )
}

function ClosingQuoteMark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`select-none font-heading leading-none text-primary/30 ${className}`}
      aria-hidden
    >
      &rdquo;
    </span>
  )
}

const Carousel = memo(function Carousel({
  handleClick,
  rotation,
  items,
  isCarouselActive,
}: {
  handleClick: (item: CarouselTestimonial) => void
  rotation: ReturnType<typeof useMotionValue<number>>
  items: CarouselTestimonial[]
  isCarouselActive: boolean
}) {
  const isSmall = useMediaQuery("(max-width: 640px)")
  const cylinderWidth = isSmall ? 1100 : 1800
  const faceCount = items.length
  const faceWidth = cylinderWidth / faceCount
  const radius = cylinderWidth / (2 * Math.PI)
  const transform = useTransform(rotation, (v) => `rotate3d(0, 1, 0, ${v}deg)`)

  const dragStartX = useRef(0)
  const dragStartRotation = useRef(0)
  const momentumRef = useRef(0)

  return (
    <div
      className="flex h-full items-center justify-center"
      style={{ perspective: "1800px" }}
    >
      <motion.div
        className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing"
        style={{
          transform,
          width: cylinderWidth,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        drag={isCarouselActive ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragStart={(_, info) => {
          dragStartX.current = info.point.x
          dragStartRotation.current = rotation.get()
          momentumRef.current = 0
        }}
        onDrag={(_, info) => {
          const delta = info.point.x - dragStartX.current
          rotation.set(dragStartRotation.current + delta * DRAG_FACTOR)
        }}
        onDragEnd={(_, info) => {
          momentumRef.current = info.velocity.x * VELOCITY_FACTOR
        }}
      >
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="absolute flex h-full origin-center items-center justify-center p-2"
            style={{
              width: `${faceWidth}px`,
              transform: `rotateY(${i * (360 / faceCount)}deg) translateZ(${radius}px)`,
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              willChange: "transform",
            }}
            onClick={() => isCarouselActive && handleClick(item)}
          >
            {/* border + accent bar both as box-shadow: single composited GPU layer, no flicker in preserve-3d */}
            <div
              className="relative flex w-full cursor-pointer flex-col bg-card"
              style={{
                height: "420px",
                transform: "translateZ(0.1px)",
                boxShadow: "0 0 0 1px #27272A, inset 2px 0 0 hsl(var(--primary))",
              }}
            >

              <div className="flex flex-1 flex-col px-7 py-7 pl-10" style={{ minHeight: 0 }}>
                {/* Opening quote mark */}
                <QuoteMark className="text-5xl" />

                {/* Quote text — grows, clamps if too long */}
                <p className="font-heading mt-1 flex-1 overflow-hidden text-sm leading-relaxed text-foreground/90" style={{ display: "-webkit-box", WebkitLineClamp: 6, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {item.quote}
                </p>

                {/* Closing quote mark — bottom right */}
                <div className="flex justify-end">
                  <ClosingQuoteMark className="text-5xl" />
                </div>

                {/* Author attribution */}
                <div className="flex shrink-0 items-center gap-3 border-t border-[#27272A] pt-4">
                  {item.src && (
                    <div className="size-9 shrink-0 overflow-hidden border border-[#27272A]">
                      <img
                        src={item.src}
                        alt={item.name}
                        width={36}
                        height={36}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-foreground">
                      {item.name}
                    </p>
                    {(item.role || item.company) && (
                      <p className="font-sans text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground">
                        {[item.role, item.company].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
})

export function ThreeDCarousel({ items }: { items: CarouselTestimonial[] }) {
  const [activeItem, setActiveItem] = useState<CarouselTestimonial | null>(null)
  const [isCarouselActive, setIsCarouselActive] = useState(true)
  const rotation = useMotionValue(0)
  const rafRef = useRef<number | null>(null)
  const momentumRef = useRef(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const tick = () => {
      if (isCarouselActive) {
        momentumRef.current *= MOMENTUM_DECAY
        const speed = Math.abs(momentumRef.current) > 0.01
          ? momentumRef.current
          : -AUTO_SPEED
        rotation.set(rotation.get() + speed)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isCarouselActive, rotation, prefersReducedMotion])

  const handleClick = (item: CarouselTestimonial) => {
    setActiveItem(item)
    setIsCarouselActive(false)
    momentumRef.current = 0
  }

  const handleClose = () => {
    setActiveItem(null)
    setIsCarouselActive(true)
  }

  return (
    // Plain div — no motion.div layout, which was triggering layout recalculations and flickering
    <div className="relative">
      <AnimatePresence mode="sync">
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6 backdrop-blur-sm md:p-20"
            transition={overlayTransition}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-5 top-5 flex size-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors duration-200 hover:bg-white/20 hover:text-white"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            {/* Editorial expanded card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={cardTransition}
              className="relative w-full max-w-2xl border border-[#27272A] bg-card px-10 py-12 md:px-16 md:py-14"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Left accent bar */}
              <div className="absolute inset-y-0 left-0 w-0.5 bg-primary" aria-hidden />

              {/* Opening quote mark */}
              <QuoteMark className="text-7xl" />

              {/* Quote text */}
              <p className="font-heading -mt-4 text-2xl font-normal leading-snug text-foreground md:text-3xl">
                {activeItem.quote}
              </p>

              {/* Closing quote mark */}
              <div className="flex justify-end">
                <ClosingQuoteMark className="text-7xl" />
              </div>

              {/* Author row */}
              <div className="mt-4 flex items-center gap-4 border-t border-[#27272A] pt-8">
                {activeItem.src && (
                  <div className="size-11 shrink-0 overflow-hidden border border-[#27272A]">
                    <img
                      src={activeItem.src}
                      alt={activeItem.name}
                      width={44}
                      height={44}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-foreground">
                    {activeItem.name}
                  </p>
                  {(activeItem.role || activeItem.company) && (
                    <p className="font-sans text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
                      {[activeItem.role, activeItem.company].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* overflow:clip clips visually without creating a stacking context, so preserve-3d is unaffected */}
      <div className="relative w-full" style={{ height: "500px", overflow: "clip" }}>
        <Carousel
          handleClick={handleClick}
          rotation={rotation}
          items={items}
          isCarouselActive={isCarouselActive}
        />
      </div>
    </div>
  )
}
