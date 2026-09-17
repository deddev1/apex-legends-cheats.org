export type SeoMediaItem = {

  image: string

  video?: string

  alt: string

  title: string

  caption: string

  videoTitle?: string

  videoDescription?: string

}



export const APEX_SOLDIER_HERO = '/media/apex-legends-soldier-hero.jpg'

export const APEX_TACTICAL = '/media/apex-legends-battle-royale.jpg'

export const APEX_OBJECTIVE = '/media/apex-legends-ranked-squad.jpg'



/** Short muted loop for product card + select SeoMedia blocks (~640px, 6s). */

export const APEX_CARD_LOOP_MP4 = '/videos/apex-card-loop.mp4'

export const APEX_CARD_LOOP_WEBM = '/videos/apex-card-loop.webm'

/** Product page gameplay clip from hero footage (~8s, 854px). */
export const APEX_PRODUCT_PREVIEW_MP4 = '/videos/apex-product-preview.mp4'
export const APEX_PRODUCT_PREVIEW_WEBM = '/videos/apex-product-preview.webm'
export const APEX_PRODUCT_PREVIEW_POSTER = '/media/apex-legends-product-hero.webp'

/** Embedded preview on the homepage. */

export const APEX_HOME_VIDEO = {

  id: 'bZ2kGpS_gQ4',

  url: 'https://www.youtube.com/watch?v=bZ2kGpS_gQ4',

  title: 'The BEST Apex CHEATS Are Finally Here..',

  caption: 'Apex Legends cheats preview video on YouTube.',

} as const



export const PAGE_MEDIA = {

  home: {

    image: APEX_SOLDIER_HERO,

    alt: 'Apex Legends ESP overlay in live battle royale match',

    title: 'Apex Legends Cheats for PC',

    caption: 'Feature overview for Apex Legends ESP, radar and aim assistance.',

  },

  product: {

    image: APEX_OBJECTIVE,

    alt: 'Apex Legends player ESP and radar in ranked gameplay',

    title: 'Apex Legends ESP, Radar and Aim Features',

    caption: 'Product overview for current Apex Legends Windows builds.',

  },

  forums: {

    image: APEX_OBJECTIVE,

    video: APEX_CARD_LOOP_MP4,

    alt: 'Apex Legends ESP overlay during ranked gameplay',

    title: 'Apex Legends Cheats Guides',

    caption: 'Gameplay reference for setup, hotkeys, features and status articles.',

    videoTitle: 'Short Apex Legends cheats gameplay loop',

  },

  reviews: {

    image: APEX_TACTICAL,

    video: APEX_CARD_LOOP_MP4,

    alt: 'Apex Legends player ESP and radar in live match',

    title: 'Apex Legends Cheats Reviews',

    caption: 'What buyers see in-game — ESP, radar and match performance.',

    videoTitle: 'Apex Legends cheats review gameplay clip',

  },

  faq: {

    image: APEX_OBJECTIVE,

    alt: 'Apex Legends ESP boxes and distance tags in match',

    title: 'Apex Legends Cheats FAQ',

    caption: 'Compatibility, status and setup answers for Apex Legends.',

  },

  support: {

    image: APEX_TACTICAL,

    alt: 'Apex Legends cheat overlay while aiming down sights',

    title: 'Apex Legends Cheats Support',

    caption: 'Delivery, loader and setup help for Apex Legends.',

  },

} as const satisfies Record<string, SeoMediaItem>



const FORUM_MEDIA: Record<string, SeoMediaItem> = {

  'features-list': {

    ...PAGE_MEDIA.product,

    alt: 'Apex Legends player ESP radar and aim features in match',

    title: 'Apex Legends Cheats Feature List',

    caption: 'Reference for player ESP, loot ESP, radar and aim options.',

  },

  hotkeys: {

    ...PAGE_MEDIA.home,

    alt: 'Apex Legends ESP overlay used while configuring menu hotkeys',

    title: 'ESP Menu Hotkey Preview',

    caption: 'Reference for ESP, radar, aim and stream-proof hotkeys.',

  },

  'complete-setup': {

    ...PAGE_MEDIA.product,

    alt: 'Apex Legends cheats complete loader setup',

    title: 'Complete Apex Legends Setup Preview',

    caption: 'Delivery, exclusions and clean load-order reference.',

  },

  'disable-antivirus': {

    ...PAGE_MEDIA.home,

    alt: 'Apex Legends cheats antivirus exclusion setup',

    title: 'Loader Exclusion Setup Preview',

    caption: 'Reference for antivirus exclusions before loading Apex Legends cheats.',

  },

  'undetected-status': {

    ...PAGE_MEDIA.product,

    alt: 'Apex Legends cheats current product status',

    title: 'Apex Legends Loader Status Preview',

    caption: 'Reference for checking Undetected or Updating before loading.',

  },

}



export function getForumMedia(slug: string): SeoMediaItem {

  return FORUM_MEDIA[slug] || PAGE_MEDIA.forums

}


