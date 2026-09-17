import { blogPath } from './blog-paths'

/** Official Apex Legends destinations for factual game context. */
export const OFFICIAL_APEX_LINKS = [
  {
    label: 'EA.com',
    href: 'https://www.ea.com/games/apex-legends',
    description: 'Official Apex Legends website',
  },
  {
    label: 'Steam',
    href: 'https://store.steampowered.com/app/1172470/Apex_Legends/',
    description: 'Official Windows PC store page',
  },
  {
    label: 'EA publisher',
    href: 'https://www.ea.com/games/apex-legends/apex-legends',
    description: 'Publisher page with official game details',
  },
] as const

/** Primary internal routes — short unique anchor text for crawlers. */
export const SITE_PAGE_LINKS = [
  { label: 'Home', to: '/', description: 'Live status, price and checkout' },
  {
    label: 'Product',
    to: '/apex-legends-cheats',
    description: 'ESP, radar, aim and compatibility details',
  },
  {
    label: 'Forums',
    to: '/forums',
    description: 'Setup threads — antivirus, hotkeys, load',
  },
  {
    label: 'Reviews',
    to: '/reviews',
    description: 'Player reviews and ratings',
  },
  {
    label: 'FAQ',
    to: '/faq',
    description: 'Frequently asked questions',
  },
  {
    label: 'Support',
    to: '/support',
    description: 'Delivery, loader and setup help',
  },
  {
    label: 'Privacy',
    to: '/privacy',
    description: 'Order data and site privacy',
  },
  {
    label: 'Terms',
    to: '/terms',
    description: 'License rules and risk disclaimer',
  },
  {
    label: 'Refunds',
    to: '/refunds',
    description: 'When digital license refunds apply',
  },
] as const

/** Forum thread deep links — unique short anchors (no repeated “guide”). */
export const SITE_GUIDE_LINKS = [
  { label: 'Features list', to: blogPath('features-list') },
  { label: 'Hotkeys', to: blogPath('hotkeys') },
  { label: 'Complete setup', to: blogPath('complete-setup') },
  { label: 'Antivirus', to: blogPath('disable-antivirus') },
  { label: 'Undetected status', to: blogPath('undetected-status') },
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
