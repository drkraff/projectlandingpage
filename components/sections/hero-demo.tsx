"use client"

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"

// Served encode is 720×1280 H.264 with faststart. The 1080p source is /demo/vela-demo.mp4.
const SRC = "/demo/vela-demo-web.mp4"
const POSTER = "/demo/vela-demo-poster.jpg"
const DEFAULT_VOLUME = 0.7

export function HeroDemo() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const startedRef = useRef(false)
  const audioTouchedRef = useRef(false)

  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(DEFAULT_VOLUME)

  useLayoutEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.pause()
    video.autoplay = false
    video.muted = false
    video.volume = DEFAULT_VOLUME
  }, [])

  function applyDefaultSound(video: HTMLVideoElement) {
    if (startedRef.current || audioTouchedRef.current) return
    video.muted = false
    video.volume = DEFAULT_VOLUME
    setMuted(false)
    setVolume(DEFAULT_VOLUME)
  }

  function play() {
    const video = videoRef.current
    if (!video) return
    applyDefaultSound(video)
    startedRef.current = true
    const pending = video.play()
    if (!pending) return
    pending.then(
      () => setPlaying(true),
      () => setPlaying(false),
    )
  }

  function pause() {
    const video = videoRef.current
    if (!video) return
    video.pause()
    setPlaying(false)
  }

  function togglePlayback() {
    const video = videoRef.current
    if (!video || video.paused) play()
    else pause()
  }

  function toggleMuted() {
    const video = videoRef.current
    if (!video) return
    audioTouchedRef.current = true
    const nextMuted = !video.muted
    if (!nextMuted && video.volume === 0) {
      video.volume = DEFAULT_VOLUME
      setVolume(DEFAULT_VOLUME)
    }
    video.muted = nextMuted
    setMuted(nextMuted)
  }

  function onVolumeInput(value: number) {
    const video = videoRef.current
    if (!video) return
    audioTouchedRef.current = true
    const next = Math.min(1, Math.max(0, value / 100))
    if (next === 0) {
      video.muted = true
      setMuted(true)
      setVolume(0)
      video.volume = 0
      return
    }
    video.volume = next
    video.muted = false
    setVolume(next)
    setMuted(false)
  }

  const displayed = muted ? 0 : Math.round(volume * 100)
  const playbackLabel = playing ? "Pause the Vela demo" : "Play the Vela demo"
  const muteLabel = muted ? "Unmute the Vela demo" : "Mute the Vela demo"

  return (
    <div className="w-full rounded-[2rem] border-2 border-primary bg-[#0e0e0e] px-2 pb-2 pt-3 shadow-[0_28px_70px_-30px_rgba(232,69,10,0.55)]">
      <div aria-hidden className="mx-auto mb-2.5 h-1 w-12 rounded-full bg-white/20" />
      <div
        className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.4rem] bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${POSTER})` }}
      >
        <video
          id="vela-demo-video"
          ref={videoRef}
          className="absolute inset-0 size-full object-cover"
          width={720}
          height={1280}
          src={SRC}
          poster={POSTER}
          muted={muted}
          loop
          playsInline
          preload="metadata"
          aria-label="Demo of Vela turning a voice note into a contractor quote"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        >
          Demo of Vela turning a voice note into a contractor quote.
        </video>
        <button
          type="button"
          className="absolute inset-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          aria-label={playbackLabel}
          aria-controls="vela-demo-video"
          aria-pressed={playing}
          onClick={togglePlayback}
        >
          {!playing && (
            <span className="pointer-events-none absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[#111111] shadow-[0_12px_30px_-8px_rgba(232,69,10,0.8)]">
              <Play className="size-7 translate-x-px" aria-hidden />
            </span>
          )}
        </button>
      </div>
      <div
        className="flex items-center gap-1 px-0.5 pt-2.5"
        role="group"
        aria-label="Demo playback controls"
      >
        <button
          type="button"
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary/70 bg-[#1c1c1c] text-white transition-colors duration-200 hover:bg-primary hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
          aria-label={playbackLabel}
          aria-controls="vela-demo-video"
          aria-pressed={playing}
          onClick={togglePlayback}
        >
          {playing ? (
            <Pause className="size-5" aria-hidden />
          ) : (
            <Play className="size-5 translate-x-px" aria-hidden />
          )}
        </button>
        <button
          type="button"
          className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border border-primary/70 bg-[#1c1c1c] text-white transition-colors duration-200 hover:bg-primary hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
          aria-label={muteLabel}
          aria-controls="vela-demo-video"
          aria-pressed={muted}
          onClick={toggleMuted}
        >
          {muted || volume === 0 ? (
            <VolumeX className="size-5" aria-hidden />
          ) : (
            <Volume2 className="size-5" aria-hidden />
          )}
        </button>
        <label htmlFor="vela-demo-volume" className="sr-only">
          Demo volume
        </label>
        <input
          id="vela-demo-volume"
          type="range"
          min={0}
          max={100}
          step={1}
          value={displayed}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={displayed}
          aria-valuetext={muted ? "Muted" : `${displayed} percent`}
          onChange={(event) => onVolumeInput(Number(event.target.value))}
          style={{ "--demo-pct": `${displayed}%` } as CSSProperties}
          className="hero-demo-volume min-w-0 flex-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
        />
      </div>
    </div>
  )
}
