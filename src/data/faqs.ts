export type FaqItem = {
  q: string
  a: string
}

/** Master FAQ — visible on /faq and reused in sections. */
export const SITE_FAQS: FaqItem[] = [
  {
    q: 'What are Apex Legends Cheats?',
    a: 'Apex Legends Cheats are tools for Apex Legends on apexlegendscheats.org — mainly player ESP, loot ESP, soft aim and 2D radar — with live Undetected or Updating status after EAC patches.',
  },
  {
    q: 'Do you cover other games?',
    a: 'No. apexlegendscheats.org sells Apex Legends Cheats only. No filler catalog of unrelated titles.',
  },
  {
    q: 'Is aimbot the main feature?',
    a: 'No. Soft aim is optional. Most buyers come for Apex Legends player ESP, loot filters and radar awareness.',
  },
  {
    q: 'Are Apex Legends Cheats undetected against EAC?',
    a: 'We mark live Undetected or Updating status after Apex Legends / Easy Anti-Cheat updates. Always check status on apexlegendscheats.org before you load.',
  },
  {
    q: 'What features are included?',
    a: 'Player ESP / wallhack, loot ESP, 2D radar, stream-proof options and configurable soft aim — focused on Apex Legends only. See the Features List guide for the full checklist.',
  },
  {
    q: 'Does it work with Steam and the EA app?',
    a: 'Compatibility tracks current Apex Legends Windows builds, including Steam app 1172470 and the EA app. Confirm Undetected after each patch before loading.',
  },
  {
    q: 'How do I buy Apex Legends Cheats?',
    a: 'Start on the homepage, confirm Undetected status and review the price. Open the product page for compatibility and ESP, radar and aim features, then continue to checkout for digital delivery.',
  },
  {
    q: 'How do I load Apex Legends Cheats?',
    a: 'After checkout, follow the Complete Setup forum thread for the current load order. If status is Updating, wait rather than forcing an outdated build.',
  },
  {
    q: 'Where do I get Apex Legends Cheats support?',
    a: 'Use the Support page and your checkout order channel. Include Undetected/Updating status and whether you need load, menu or delivery help.',
  },
  {
    q: 'Where can I read Apex Legends Cheats reviews?',
    a: 'Player reviews with ratings are on the Reviews page. They cover ESP usefulness, Undetected honesty and patch survival before you buy.',
  },
  {
    q: 'What is your refund policy?',
    a: 'Digital licenses follow the Refunds page — delivery failures and extended Updating windows can qualify; change of mind after a working key does not.',
  },
  {
    q: 'Is this the official Apex Legends game site?',
    a: 'No. We sell Apex Legends Cheats only. Get the game from EA or Steam. We are not affiliated with Electronic Arts or Respawn Entertainment.',
  },
]

/** Commercial questions shown on the homepage; FAQ schema lives on /faq only. */
export const HOME_FAQS: FaqItem[] = [
  SITE_FAQS[3],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[6],
]

export const PRODUCT_PAGE_FAQS: FaqItem[] = [
  SITE_FAQS[3],
  SITE_FAQS[4],
  SITE_FAQS[5],
  SITE_FAQS[6],
  SITE_FAQS[8],
]
