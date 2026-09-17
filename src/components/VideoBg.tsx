import { useEffect, useRef, useState } from 'react'

const HERO_VIDEO_BASE = '/videos/apex-hero'
import {
  HERO_POSTER_ALT,
  HERO_POSTER_HEIGHT,
  HERO_POSTER_JPG,
  HERO_POSTER_SIZES,
  HERO_POSTER_WEBP_SRCSET,
  HERO_POSTER_WIDTH,
} from '../data/hero-poster'
const START_AT = 0
/** Hero WebM is larger than MP4 in our encode — prefer MP4 when both are present. */
const HERO_WEBM_FIRST = false

type VideoBgProps = {
  /** Static full-bleed hero image — skips video when set (homepage only). */
  image?: string
  imageAlt?: string
  /** Stronger dark + violet overlay for headline contrast (homepage). */
  readable?: boolean
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function VideoBg({ image, imageAlt = '', readable = false }: VideoBgProps) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLVideoElement>(null)
  const [visible, setVisible] = useState(Boolean(image))
  const [failed, setFailed] = useState(false)
  const [loadVideo, setLoadVideo] = useState(false)

  useEffect(() => {
    if (image) return

    if (prefersReducedMotion()) {
      setVisible(true)
      return
    }

    let cancelled = false
    const arm = () => {
      if (!cancelled) setLoadVideo(true)
    }

    const idleId =
      typeof window.requestIdleCallback === 'function'
        ? window.requestIdleCallback(arm, { timeout: 2800 })
        : undefined
    const fallbackTimer = idleId === undefined ? window.setTimeout(arm, 400) : undefined

    const root = wrapRef.current
    const observer =
      typeof IntersectionObserver !== 'undefined' && root
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) {
                arm()
                observer.disconnect()
              }
            },
            { rootMargin: '80px' },
          )
        : null
    observer?.observe(root!)

    return () => {
      cancelled = true
      if (idleId !== undefined && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (fallbackTimer !== undefined) window.clearTimeout(fallbackTimer)
      observer?.disconnect()
    }
  }, [image])

  useEffect(() => {
    if (image || !loadVideo || prefersReducedMotion()) return

    const video = ref.current
    if (!video) return

    let cancelled = false
    let showTimer: ReturnType<typeof setTimeout> | undefined

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true
    video.loop = true
    video.controls = false

    const show = () => {
      if (!cancelled) setVisible(true)
    }

    const jumpStart = () => {
      if (!video.duration || video.duration <= START_AT) return
      try {
        if (video.currentTime < START_AT - 0.2) {
          video.currentTime = START_AT
        }
      } catch {
        /* seek may fail until buffered — ignore */
      }
    }

    const play = () => {
      jumpStart()
      void video.play().then(show).catch(() => {
        if (video.readyState >= 2) show()
      })
    }

    const onLoadedData = () => {
      jumpStart()
      play()
    }

    const onCanPlay = () => play()
    const onPlaying = () => show()
    const onSeeked = () => {
      void video.play().then(show).catch(() => show())
    }

    const onEnded = () => {
      try {
        video.currentTime = video.duration > START_AT ? START_AT : 0
      } catch {
        /* ignore */
      }
      void video.play().catch(() => {})
    }

    const onError = () => {
      setFailed(true)
      setVisible(true)
    }

    video.addEventListener('loadeddata', onLoadedData)
    video.addEventListener('canplay', onCanPlay)
    video.addEventListener('playing', onPlaying)
    video.addEventListener('seeked', onSeeked)
    video.addEventListener('ended', onEnded)
    video.addEventListener('error', onError)

    showTimer = setTimeout(show, 2200)
    video.load()

    return () => {
      cancelled = true
      if (showTimer) clearTimeout(showTimer)
      video.removeEventListener('loadeddata', onLoadedData)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('playing', onPlaying)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('error', onError)
    }
  }, [image, loadVideo])

  const videoShowing = loadVideo && visible && !failed && !image

  return (
    <div
      ref={wrapRef}
      className={`hero-video-wrap absolute inset-0 z-0 overflow-hidden pointer-events-none select-none${readable ? ' hero-video--readable' : ''}`}
    >
      <div className="absolute inset-0 z-0 bg-z-bg" aria-hidden />
      {image ? (
        <img
          src={image}
          alt={imageAlt}
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
          className={`hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-[78%_42%] sm:object-[72%_40%] transition-opacity duration-700 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <>
          <picture>
            <source type="image/webp" srcSet={HERO_POSTER_WEBP_SRCSET} sizes={HERO_POSTER_SIZES} />
            <img
              src={HERO_POSTER_JPG}
              alt={HERO_POSTER_ALT}
              width={HERO_POSTER_WIDTH}
              height={HERO_POSTER_HEIGHT}
              sizes={HERO_POSTER_SIZES}
              decoding="sync"
              fetchPriority="high"
              className={`hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-center transition-opacity duration-700 ${
                videoShowing ? 'opacity-0' : 'opacity-100'
              }`}
            />
          </picture>
          {loadVideo && !failed ? (
            <video
              ref={ref}
              className={`hero-video-bg absolute inset-0 z-[1] h-full w-full object-cover object-[center_center] transition-opacity duration-700 ${
                videoShowing ? 'opacity-100' : 'opacity-0'
              }`}
              poster={HERO_POSTER_JPG}
              muted
              playsInline
              loop
              preload="none"
              controls={false}
              disablePictureInPicture
              disableRemotePlayback
              aria-hidden
              tabIndex={-1}
            >
              {HERO_WEBM_FIRST ? (
                <>
                  <source src={`${HERO_VIDEO_BASE}.webm`} type="video/webm" />
                  <source src={`${HERO_VIDEO_BASE}.mp4`} type="video/mp4" />
                </>
              ) : (
                <>
                  <source src={`${HERO_VIDEO_BASE}.mp4`} type="video/mp4" />
                  <source src={`${HERO_VIDEO_BASE}.webm`} type="video/webm" />
                </>
              )}
            </video>
          ) : null}
        </>
      )}
      <div className="hero-video-tint pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="hero-video-tint-glow pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div
        className="hero-video-edge-bottom absolute inset-x-0 bottom-0 z-[3] h-40 bg-gradient-to-t from-z-bg via-z-bg/80 to-transparent"
        aria-hidden
      />
      <div
        className="hero-video-edge-top absolute inset-x-0 top-0 z-[3] h-24 bg-gradient-to-b from-z-bg/70 to-transparent"
        aria-hidden
      />
    </div>
  )
}
