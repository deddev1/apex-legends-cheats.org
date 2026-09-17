import { blogPath } from './blog-paths'

/** Official Apex Legends destinations for factual game context. */
export const OFFICIAL_APEX_LINKS = [
  {
    label: 'Apex Legends official website',
    href: 'https://www.ea.com/games/apex-legends',
    description: 'Official Apex Legends website',
  },
  {
    label: 'Apex Legends on Steam',
    href: 'https://store.steampowered.com/app/1172470/Apex_Legends/',
    description: 'Official Windows PC store page',
  },
  {
    label: 'Apex Legends at EA',
    href: 'https://www.ea.com/games/apex-legends/apex-legends',
    description: 'Publisher page with official game details',
  },
] as const

/** Primary internal routes for crawl equity. Unique anchors vs nav CTAs. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Live status, price and checkout' },
  {
    label: 'Product page',
    to: '/apex-legends-cheats',
    description: 'ESP, radar, aim and compatibility details',
  },
  {
    label: 'Forums index',
    to: '/forums',
    description: 'Setup forums — antivirus, hotkeys, load',
  },
  {
    label: 'Player reviews',
    to: '/reviews',
    description: 'Player reviews and ratings',
  },
  {
    label: 'FAQ answers',
    to: '/faq',
    description: 'Frequently asked questions',
  },
  {
    label: 'Support desk',
    to: '/support',
    description: 'Delivery, loader and setup help',
  },
  {
    label: 'Privacy policy',
    to: '/privacy',
    description: 'Order data and site privacy',
  },
  {
    label: 'Terms of use',
    to: '/terms',
    description: 'License rules and risk disclaimer',
  },
  {
    label: 'Refund policy',
    to: '/refunds',
    description: 'When digital license refunds apply',
  },
] as const

/** Deep links into forum threads — commercial / transactional. */
export const SITE_GUIDE_LINKS = [
  { label: 'Features list guide', to: blogPath('features-list') },
  { label: 'Hotkeys guide', to: blogPath('hotkeys') },
  { label: 'Complete setup guide', to: blogPath('complete-setup') },
  { label: 'Antivirus exclusion guide', to: blogPath('disable-antivirus') },
  { label: 'Undetected status guide', to: blogPath('undetected-status') },
] as const

/**
 * External checkout go-link → Apex Legends product.
 * Always pair with rel=nofollow so crawlers do not index the redirect.
 */
const CHECKOUT_HOST = ['za', 'deyo', '.com'].join('')
const CHECKOUT_REF = ['Q', 'R', 'H'].join('')
const CHECKOUT_PRODUCT = '/products/apex-legends'

export const CHECKOUT_URL = `https://${CHECKOUT_HOST}/go/${CHECKOUT_REF}?to=${encodeURIComponent(CHECKOUT_PRODUCT)}`

export function getCheckoutUrl(_productSlug?: string): string {
  return CHECKOUT_URL
}

/** Outbound checkout: nofollow so redirect targets are not indexed via our links. */
export const CHECKOUT_REL = 'nofollow noopener noreferrer'
