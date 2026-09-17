import { APEX_OG, PAGE_IMAGES } from './images'

export const SITE_URL = 'https://apexlegendscheats.org'
export const SITE_NAME = 'Apex Legends Cheats'
export const SITE_HOST = 'apexlegendscheats.org'

/**
 * Sole purpose — used in schema + about copy.
 * Single-product site for Apex Legends on Windows PC.
 */
export const SITE_PURPOSE =
  'Apex Legends Cheats covers player ESP, loot ESP, radar, aim assistance and loader status for Respawn Entertainment’s free-to-play battle royale.'

export const SITE_ABOUT = [
  'Apex Legends Cheats',
  'apex legends cheats',
  'Apex Legends ESP',
  'Apex Legends aimbot',
  'Apex Legends radar',
  'Apex Legends Steam',
  'Apex Legends PC',
  'Apex Legends battle royale',
  'Respawn Apex Legends',
  'EA Apex Legends',
] as const

/** Offer price shown on product schema + purchase UI. */
export const PRODUCT_PRICE_USD = '29.99'

export const SEO_REGIONS = [
  { hreflang: 'en', label: 'English' },
  { hreflang: 'x-default', label: 'Default' },
] as const

/** First-party branded social image. */
export const OG_IMAGE = APEX_OG

export type PageSeo = {
  title: string
  description: string
  path: string
  ogType?: 'website' | 'article' | 'product'
  image?: string
  robots?: string
}

/** Unique SEO per route — commercial / transactional intent. */
export const SEO = {
  home: {
    title: 'Apex Legends Cheats | ESP, Aimbot & Radar for PC',
    description:
      'Apex Legends cheats for Windows PC with player ESP, loot ESP, soft aim, 2D radar and live loader status for the current Steam and EA app builds.',
    path: '/',
    ogType: 'website',
    image: PAGE_IMAGES.home.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  },
  forums: {
    title: 'Apex Legends Cheats Guides | Setup, Hotkeys & Status',
    description:
      'Apex Legends cheats guides covering features, hotkeys, setup, antivirus exclusions and loader status for current Steam and EA app builds.',
    path: '/forums',
    ogType: 'website',
    image: PAGE_IMAGES.forums.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  reviews: {
    title: 'Apex Legends Cheats Reviews | Before You Buy',
    description:
      'Player feedback on Apex Legends ESP, soft aim, radar and post-patch rebuilds before you choose a license.',
    path: '/reviews',
    ogType: 'website',
    image: PAGE_IMAGES.reviews.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  faq: {
    title: 'Apex Legends Cheats FAQ | Compatibility, Setup & Status',
    description:
      'Answers about Apex Legends PC compatibility, game updates, ESP features, setup, delivery and loader status.',
    path: '/faq',
    ogType: 'website',
    image: PAGE_IMAGES.faq.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  support: {
    title: 'Apex Legends Cheats Support | Loader & Setup Help',
    description:
      'Support for Apex Legends cheats delivery, Windows setup, loader errors, updates and account-specific order questions.',
    path: '/support',
    ogType: 'website',
    image: PAGE_IMAGES.support.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
  product: {
    title: 'Apex Legends Cheats Features & Price | ESP, Radar, Aim',
    description:
      'Full feature list, Windows PC compatibility, live Undetected status and pricing for Apex Legends player ESP, loot ESP, soft aim and 2D radar.',
    path: '/apex-legends-cheats',
    ogType: 'product',
    image: PAGE_IMAGES.product.src,
    robots: 'index, follow, max-image-preview:large, max-snippet:-1',
  },
} as const satisfies Record<string, PageSeo>

export const HOME_HEADINGS = {
  h1: 'Apex Legends Cheats for PC',
  h2Features: 'ESP, soft aim and radar',
  h2Featured: 'Apex Legends ESP and Radar',
  h2About: 'Built for the current Apex Legends season',
  h2Access: 'Get Apex Legends Cheats',
  h2Faq: 'Apex Legends Cheats FAQ',
} as const

export function absoluteUrl(path: string) {
  if (!path || path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}
