export type Review = {
  id: string
  author: string
  role: string
  game: string
  rating: number
  /** ISO date — required for Review schema */
  datePublished: string
  body: string
}

/**
 * Buyer reviews shown on /reviews (on-page only — no Review JSON-LD).
 * Recent buyer feedback used by the reviews page UI and aggregate display.
 */
export const REVIEWS: Review[] = [
  {
    id: '1',
    author: 'jayk',
    role: 'Apex Legends player',
    game: 'Apex Legends',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Status on the product page matched what I got in-game. Player ESP held after the first EAC rebuild — glad I waited for Undetected before loading.',
  },
  {
    id: '2',
    author: 'nova',
    role: 'Ranked grinder',
    game: 'Apex Legends',
    rating: 5,
    datePublished: '2026-09-13',
    body: 'Bought it for ESP and leave soft aim off. Seeing a rotation before a third-party changes everything in ranked fights.',
  },
  {
    id: '3',
    author: 'rift',
    role: 'Squad lead',
    game: 'Apex Legends',
    rating: 4,
    datePublished: '2026-09-13',
    body: 'No fake multi-game catalog. Loot ESP and honest Updating vs Undetected flips are what I wanted before buying.',
  },
  {
    id: '4',
    author: 'kiln',
    role: 'Duo queue',
    game: 'Apex Legends',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'They rebuilt when other sellers still pushed dead loaders. We check status, then checkout — ESP held on our duo.',
  },
  {
    id: '5',
    author: 'moss',
    role: 'Night shifts',
    game: 'Apex Legends',
    rating: 5,
    datePublished: '2026-09-12',
    body: 'Menu was easy. Stream-proof on, radar on. Setup guides covered antivirus and load order so we did not burn the first launch.',
  },
  {
    id: '6',
    author: 'vale',
    role: 'New buyer',
    game: 'Apex Legends',
    rating: 5,
    datePublished: '2026-09-11',
    body: 'Day key first was the right call. Instant delivery and live status sold me before I took the 30-day plan.',
  },
  {
    id: '7',
    author: 'drake',
    role: 'Solo queue',
    game: 'Apex Legends',
    rating: 4,
    datePublished: '2026-09-11',
    body: 'Player ESP distance readouts were solid. Radar helped when squads rotated off-screen. Soft aim smoothing took ten minutes to dial in.',
  },
  {
    id: '8',
    author: 'echo',
    role: 'Ranked player',
    game: 'Apex Legends',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Loot filters alone are worth it — armor swaps and attachments are easier to find during fast resets.',
  },
  {
    id: '9',
    author: 'prism',
    role: 'Ranked tryhard',
    game: 'Apex Legends',
    rating: 4,
    datePublished: '2026-09-15',
    body: 'Soft aim feels human once FOV and smoothing are conservative. I still check status after every EAC note.',
  },
  {
    id: '10',
    author: 'blade',
    role: 'Three-stack',
    game: 'Apex Legends',
    rating: 5,
    datePublished: '2026-09-15',
    body: 'One license, full menu. ESP + radar helped with our ranked rotations. Support answered with the order ID the same day.',
  },
  {
    id: '11',
    author: 'orio',
    role: 'Windows 11',
    game: 'Apex Legends',
    rating: 3,
    datePublished: '2026-09-12',
    body: 'Loader ran fine after exclusions. Wish the first-run docs called out overlay conflicts earlier — lost an hour to Discord overlay.',
  },
  {
    id: '12',
    author: 'sage',
    role: 'Casual lobbies',
    game: 'Apex Legends',
    rating: 5,
    datePublished: '2026-09-14',
    body: 'Apex Legends-only shop is a plus. No random filler titles. Feature list matched the menu.',
  },
]

export function getReviewsAggregate() {
  const count = REVIEWS.length
  const ratingValue = (
    REVIEWS.reduce((sum, review) => sum + review.rating, 0) / count
  ).toFixed(1)
  return { ratingValue, reviewCount: count, bestRating: '5', worstRating: '1' }
}
