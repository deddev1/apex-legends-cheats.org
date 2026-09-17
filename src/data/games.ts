export type GameStatus = 'Undetected' | 'Updating' | 'Use with caution'

export type Game = {
  slug: string
  name: string
  status: GameStatus
  popular?: boolean
}

/** Site is Apex Legends Cheats only — no other titles in the catalog. */
export const GAMES: Game[] = [
  { slug: 'apex-legends', name: 'Apex Legends', status: 'Updating', popular: true },
]

export function getGame(slug: string) {
  return GAMES.find((g) => g.slug === slug)
}

export function guidePath(slug: string) {
  return slug === 'apex-legends' ? '/apex-legends-cheats' : `/${slug}-cheats`
}

export function parseGuideSlug(param: string) {
  return param.endsWith('-cheats') ? param.slice(0, -7) : param
}

/**
 * Feature list tuned to what ranks for Apex Legends Cheats
 * Feature bullets for the product page — ESP & awareness first.
 */
export const GUIDE_FEATURES = [
  {
    name: 'Player ESP',
    text: 'Highlight enemy and friendly players with distance, team and health information when supported by the current build.',
  },
  {
    name: 'Loot ESP',
    text: 'Highlight weapons, armor, attachments, healing items and death boxes with configurable filters.',
  },
  {
    name: '2D Radar',
    text: 'Map-style awareness for nearby squads so you can read rotations and approaching third parties.',
  },
  {
    name: 'Aim assistance',
    text: 'Configurable aim support with field-of-view and smoothing controls where the current release supports them.',
  },
  {
    name: 'Stream-proof mode',
    text: 'Keep supported overlays out of common capture software when recording or streaming.',
  },
  {
    name: 'Configurable hotkeys',
    text: 'Toggle visual and aim features quickly without leaving a battle royale or Mixtape match.',
  },
  {
    name: 'Steam and EA app support',
    text: 'Compatibility is tracked against current Windows builds distributed through Steam and the EA app.',
  },
  {
    name: 'Patch status + support',
    text: 'Updating or Undetected status is reviewed after Apex Legends client patches before access is recommended.',
  },
] as const

/** @deprecated use PRODUCT_PAGE_FAQS from faqs.ts — kept as alias */
export { PRODUCT_PAGE_FAQS as PRODUCT_FAQS } from './faqs'
