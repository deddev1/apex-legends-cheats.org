export type SupportFaq = {
  q: string
  a: string
}

export type SupportTopic = {
  heading: string
  body: string[]
}

export const SUPPORT_INTRO =
  'Support for Apex Legends Cheats buyers on apexlegendscheats.org — loader setup, Undetected status, menu config and delivery help after you purchase.'

export const SUPPORT_TOPICS: SupportTopic[] = [
  {
    heading: 'Before you open a support request',
    body: [
      'Confirm you bought Apex Legends Cheats from apexlegendscheats.org. We only support this product — not random downloads from elsewhere.',
      'Check live status on the product page. If it says Updating, do not load. Wait for Undetected.',
      'Have your order email and license length ready. That speeds up help after EAC patches.',
    ],
  },
  {
    heading: 'Setup and load order',
    body: [
      'Follow the Complete Setup forum thread for the current load order, antivirus exclusions, menu configuration and first clean launch.',
      'If the product is Updating, wait. If an Undetected build still fails after one clean retry, open a support request with your order ID.',
    ],
  },
  {
    heading: 'Status windows and refunds',
    body: [
      'Do not load while status is Updating — that is the biggest avoidable risk after an EAC patch.',
      'Delivery failures and extended Updating windows are covered on the Refunds page. Include your order ID when you write in.',
    ],
  },
  {
    heading: 'What we support',
    body: [
      'Supported: current Apex Legends Windows builds — ESP, radar, soft aim, menu, setup and status questions.',
      'Not supported: other games, cracked loaders or third-party mirrors.',
      'Policy pages: Privacy, Terms and Refunds are linked in the footer.',
    ],
  },
]

export const SUPPORT_FAQS: SupportFaq[] = [
  {
    q: 'How do I contact Apex Legends Cheats support?',
    a: 'Open your order on apexlegendscheats.org and use the checkout support channel tied to your purchase. Include a status screenshot (Undetected / Updating) and whether you need load, menu or delivery help.',
  },
  {
    q: 'How do I load Apex Legends Cheats after a patch?',
    a: 'Follow the Complete Setup forum thread for the current load order. If status is Updating, wait; if an Undetected build fails, include your order ID in a support request.',
  },
  {
    q: 'Loader failed — what should I do?',
    a: 'Do not spam launch. Restart the game, confirm antivirus exclusions, re-check status, then try one clean load. If it still fails, contact support with your order ID.',
  },
  {
    q: 'Do you help with setup and config?',
    a: 'Yes. Use the Complete Setup forum thread first, then contact support with your order ID if a current Undetected build still fails.',
  },
  {
    q: 'Is aimbot required?',
    a: 'No. Apex Legends Cheats lead with ESP and radar. Soft aim is optional. Support focuses on awareness features and safe load steps.',
  },
  {
    q: 'Where is the Apex Legends Cheats download?',
    a: 'Delivery is digital after checkout on apexlegendscheats.org. Use only that loader link. Third-party mirrors are unsupported and unsafe.',
  },
]
