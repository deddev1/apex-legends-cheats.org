import type { ResponsiveImageSpec } from '../data/responsive-images'

type ResponsiveImageProps = {
  alt: string
  title?: string
  spec?: ResponsiveImageSpec
  /** Used when no responsive spec (plain img). */
  src?: string
  width?: number
  height?: number
  sizes?: string
  priority?: boolean
  className?: string
  onError?: () => void
}

export function ResponsiveImage({
  alt,
  title,
  spec,
  src,
  width,
  height,
  sizes,
  priority = false,
  className = '',
  onError,
}: ResponsiveImageProps) {
  const fallback = spec?.fallback ?? src
  if (!fallback) return null

  const w = spec?.width ?? width ?? 800
  const h = spec?.height ?? height ?? 450
  const imgSizes = sizes ?? spec?.sizes ?? '100vw'
  const loading = priority ? 'eager' : 'lazy'
  const decoding = priority ? 'sync' : 'async'
  const fetchPriority = priority ? 'high' : 'auto'

  if (!spec?.webpSrcSet) {
    return (
      <img
        src={fallback}
        alt={alt}
        title={title}
        width={w}
        height={h}
        sizes={imgSizes}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        onError={onError}
      />
    )
  }

  return (
    <picture className="block h-full w-full">
      <source type="image/webp" srcSet={spec.webpSrcSet} sizes={imgSizes} />
      <img
        src={fallback}
        alt={alt}
        title={title}
        width={w}
        height={h}
        sizes={imgSizes}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className}
        onError={onError}
      />
    </picture>
  )
}
