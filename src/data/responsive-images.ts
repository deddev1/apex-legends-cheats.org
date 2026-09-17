export type ResponsiveImageSpec = {
  fallback: string
  webpSrcSet: string
  width: number
  height: number
  sizes: string
}

/** Responsive WebP + JPEG fallbacks for in-page gameplay stills. */
export const RESPONSIVE_BY_FALLBACK: Record<string, ResponsiveImageSpec> = {
  '/media/apex-legends-soldier-hero.jpg': {
    fallback: '/media/apex-legends-soldier-hero.jpg',
    webpSrcSet:
      '/media/apex-legends-soldier-hero-480w.webp 480w, /media/apex-legends-soldier-hero-800w.webp 800w',
    width: 800,
    height: 450,
    sizes: '(max-width: 1024px) 100vw, 800px',
  },
  '/media/apex-legends-battle-royale.jpg': {
    fallback: '/media/apex-legends-battle-royale.jpg',
    webpSrcSet:
      '/media/apex-legends-battle-royale-480w.webp 480w, /media/apex-legends-battle-royale-800w.webp 800w',
    width: 800,
    height: 450,
    sizes: '(max-width: 1024px) 100vw, 800px',
  },
  '/media/apex-legends-ranked-squad.jpg': {
    fallback: '/media/apex-legends-ranked-squad.jpg',
    webpSrcSet:
      '/media/apex-legends-ranked-squad-480w.webp 480w, /media/apex-legends-ranked-squad-800w.webp 800w',
    width: 800,
    height: 450,
    sizes: '(max-width: 1024px) 100vw, 800px',
  },
  '/media/apex-legends-product-hero.webp': {
    fallback: '/media/apex-legends-product-hero.webp',
    webpSrcSet:
      '/media/apex-legends-product-hero-480w.webp 480w, /media/apex-legends-product-hero-800w.webp 800w, /media/apex-legends-product-hero.webp 1280w',
    width: 1280,
    height: 720,
    sizes: '(max-width: 1024px) 100vw, 640px',
  },
}

export function getResponsiveSpec(fallback: string): ResponsiveImageSpec | undefined {
  return RESPONSIVE_BY_FALLBACK[fallback]
}
