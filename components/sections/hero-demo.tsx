"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { Play, Volume2, VolumeX } from "lucide-react"

const SRC = "/demo/vela-demo-web.mp4"
const POSTER = "/demo/vela-demo-poster.jpg"

export function HeroDemo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const reduceRef = useRef(false)
  const engagedRef = useRef(false)
  const mutedRef = useRef(true)

  const [reducedMotion, setReducedMotion] = useState(false)
  const [engaged, setEngaged] = useState(false)
  const [autoplayBlocked, setAutoplayBlocked] = useState(false)
  const [muted, setMuted] = useState(true)

  const showPlay = !engaged && (reducedMotion || autoplayBlocked)

  useLayoutEffect(() => {
    const video = videoRef.current
    const frame = frameRef.current
    if (!video || !frame) return

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const hold = () => {
      video.autoplay = false
      video.pause()
      try {
        video.currentTime = 0
      } catch {
        // Poster stays visible until metadata is ready.
      }
    }

    const start = () => {
      if (reduceRef.current && !engagedRef.current) return
      video.muted = mutedRef.current
      const pending = video.play()
      if (!pending) return
      pending.then(
        () => setAutoplayBlocked(false),
        () => setAutoplayBlocked(true),
      )
    }

    const applyMotion = () => {
      const reduce = motion.matches
      reduceRef.current = reduce
      setReducedMotion(reduce)
      if (reduce) {
        engagedRef.current = false
        setEngaged(false)
        hold()
        return
      }
      start()
    }

    applyMotion()
    motion.addEventListener("change", applyMotion)

    // Pause the loop once the phone leaves the hero so it does not keep
    // downloading off-screen. Playback resumes on the way back in.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.intersectionRatio >= 0.35) start()
        else video.pause()
      },
      { threshold: 0.35 },
    )
    observer.observe(frame)

    return () => {
      motion.removeEventListener("change", applyMotion)
      observer.disconnect()
    }
  }, [])

  function onControlClick() {
    const video = videoRef.current
    if (!video) return

    if (showPlay) {
      mutedRef.current = true
      video.muted = true
      setMuted(true)
      const pending = video.play()
      if (!pending) return
      pending.then(
        () => {
          engagedRef.current = true
          setEngaged(true)
          setAutoplayBlocked(false)
        },
        () => setAutoplayBlocked(true),
      )
      return
    }

    const nextMuted = !video.muted
    video.muted = nextMuted
    mutedRef.current = nextMuted
    setMuted(nextMuted)
    if (video.paused) {
      const pending = video.play()
      if (pending) pending.catch(() => setAutoplayBlocked(true))
    }
  }

  const label = showPlay
    ? "Play the Vela demo"
    : muted
      ? "Unmute the Vela demo"
      : "Mute the Vela demo"

  return (
    <div
      ref={frameRef}
      className="w-full rounded-[2rem] border-2 border-primary bg-[#0e0e0e] px-2 pb-2 pt-3 shadow-[0_28px_70px_-30px_rgba(232,69,10,0.55)]"
    >
      <div aria-hidden className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-white/20" />
      <div
        className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.4rem] bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      >
        <video
          ref={videoRef}
          className={`absolute inset-0 size-full object-cover ${showPlay ? "opacity-0" : "opacity-100"}`}
          width={720}
          height={1280}
          src={SRC}
          poster={POSTER}
          autoPlay={!showPlay}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          aria-label="Demo of Vela turning a voice note into a contractor quote"
        >
          Demo of Vela turning a voice note into a contractor quote.
        </video>
      </div>
      <div className="flex justify-center pt-2.5">
        <button
          type="button"
          className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-primary/70 bg-[#1c1c1c] text-white transition-colors duration-200 hover:bg-primary hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
          aria-label={label}
          {...(showPlay ? {} : { "aria-pressed": !muted })}
          onClick={onControlClick}
        >
          {showPlay ? (
            <Play className="size-5 translate-x-px" aria-hidden />
          ) : muted ? (
            <VolumeX className="size-5" aria-hidden />
          ) : (
            <Volume2 className="size-5" aria-hidden />
          )}
        </button>
      </div>
    </div>
  )
}
