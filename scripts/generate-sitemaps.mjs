/**
 * Single sitemap at /sitemap.xml — every indexed page URL + image sitemap entries.
 * Every <url> must include ≥1 <image:image>. Every first-party still image must appear.
 */
import { existsSync, readFileSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = join(root, 'public')
const dataDir = join(root, 'src', 'data')
const pagesDir = join(root, 'src', 'pages')
const SITE = (process.env.SITE_URL || 'https://apexlegendscheats.org').replace(/\/$/, '')
const TODAY = new Date().toLocaleDateString('en-CA')
const HREFLANG = ['en', 'x-default']

const SOLDIER = '/media/apex-legends-soldier-hero.jpg'
const TACTICAL = '/media/apex-legends-battle-royale.jpg'
const OBJECTIVE = '/media/apex-legends-ranked-squad.jpg'
const PRODUCT_HERO = '/media/apex-legends-product-hero.webp'
const PRODUCT_COVER = '/media/apex-legends-product-cover.webp'
const OG_DEFAULT = '/og/apex-legends-cheats.jpg'
const HERO_POSTER = '/media/apex-hero-poster.jpg'

/** All indexable still images that must appear in the sitemap at least once. */
const ALL_SITE_IMAGES = [
  SOLDIER,
  TACTICAL,
  OBJECTIVE,
  PRODUCT_HERO,
  PRODUCT_COVER,
  OG_DEFAULT,
  HERO_POSTER,
]

const FORUM_IMAGES = {
  'features-list': OBJECTIVE,
  hotkeys: SOLDIER,
  'complete-setup': OBJECTIVE,
  'disable-antivirus': TACTICAL,
  'undetected-status': OBJECTIVE,
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}

function siteUrl(path) {
  return !path || path === '/' ? `${SITE}/` : `${SITE}${path.startsWith('/') ? path : `/${path}`}`
}

function loadGames() {
  const src = readFileSync(join(dataDir, 'games.ts'), 'utf8')
  return [...src.matchAll(/\{\s*slug:\s*['"]([^'"]+)['"],\s*name:\s*['"]([^'"]+)['"]/g)].map(
    (match) => ({ slug: match[1], name: match[2] }),
  )
}

function loadForums() {
  const src = readFileSync(join(dataDir, 'blogs.ts'), 'utf8')
  const pattern =
    /slug:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],[\s\S]*?date:\s*['"](\d{4}-\d{2}-\d{2})['"]/g
  return [...src.matchAll(pattern)].map((match) => ({
    slug: match[1],
    title: match[2],
    date: match[3],
  }))
}

function loadStaticRoutes() {
  return readdirSync(pagesDir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.astro') && entry.name !== '404.astro')
    .map((entry) => (entry.name === 'index.astro' ? '/' : `/${entry.name.slice(0, -6)}`))
}

function alternateLinks(url) {
  return HREFLANG.map(
    (language) =>
      `    <xhtml:link rel="alternate" hreflang="${language}" href="${escapeXml(url)}" />`,
  ).join('\n')
}

function imageBlock({ src, title, caption }) {
  return `    <image:image>
      <image:loc>${escapeXml(siteUrl(src))}</image:loc>
      <image:title>${escapeXml(title)}</image:title>
      <image:caption>${escapeXml(caption)}</image:caption>
    </image:image>`
}

function urlEntry({ path, priority, changefreq, lastmod = TODAY, images }) {
  if (!images?.length) {
    throw new Error(`Sitemap entry for ${path} is missing images`)
  }
  const url = siteUrl(path)
  const imageXml = images.map((image) => imageBlock(image)).join('\n')
  return `  <url>
    <loc>${escapeXml(url)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${alternateLinks(url)}
${imageXml}
  </url>`
}

function buildSitemap(games, forums) {
  const entries = [
    urlEntry({
      path: '/',
      priority: '1.0',
      changefreq: 'daily',
      images: [
        {
          src: SOLDIER,
          title: 'Apex Legends Cheats gameplay screenshot',
          caption: 'In-game ESP and radar preview for Apex Legends Cheats on PC.',
        },
        {
          src: PRODUCT_COVER,
          title: 'Apex Legends Cheats product gameplay',
          caption: 'Gameplay screenshot from the Apex Legends Cheats loader.',
        },
        {
          src: HERO_POSTER,
          title: 'Apex Legends Cheats hero video poster',
          caption: 'Poster frame for the homepage hero gameplay clip.',
        },
        {
          src: OG_DEFAULT,
          title: 'Apex Legends Cheats Social Preview',
          caption: 'Open Graph image for apexlegendscheats.org.',
        },
      ],
    }),
    ...games.map((game) =>
      urlEntry({
        path: `/${game.slug}-cheats`,
        priority: '0.9',
        changefreq: 'weekly',
        images: [
          {
            src: PRODUCT_HERO,
            title: 'Apex Legends Cheats gameplay preview',
            caption: 'In-match ESP and radar screenshot on the product page.',
          },
          {
            src: PRODUCT_COVER,
            title: 'Apex Legends Cheats buy card gameplay',
            caption: 'Gameplay screenshot on the Apex Legends Cheats product card.',
          },
          {
            src: OBJECTIVE,
            title: 'Apex Legends ESP ranked gameplay',
            caption: 'Product features, compatibility, status and price before checkout.',
          },
          {
            src: OG_DEFAULT,
            title: 'Apex Legends Cheats share image',
            caption: 'Social preview for Apex Legends Cheats product listing.',
          },
        ],
      }),
    ),
    urlEntry({
      path: '/forums',
      priority: '0.85',
      changefreq: 'weekly',
      images: [
        {
          src: OBJECTIVE,
          title: 'Apex Legends Cheats Forum Artwork',
          caption: 'Artwork reference for setup and feature threads.',
        },
      ],
    }),
    ...forums.map((forum) =>
      urlEntry({
        path: `/forums/${forum.slug}`,
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: forum.date,
        images: [
          {
            src: FORUM_IMAGES[forum.slug] || OBJECTIVE,
            title: `${forum.title} Artwork`,
            caption: `Visible Apex Legends reference for ${forum.title}.`,
          },
        ],
      }),
    ),
    urlEntry({
      path: '/reviews',
      priority: '0.8',
      changefreq: 'weekly',
      images: [
        {
          src: TACTICAL,
          title: 'Apex Legends Cheats Review Artwork',
          caption: 'Artwork accompanying verified buyer reviews.',
        },
      ],
    }),
    urlEntry({
      path: '/faq',
      priority: '0.75',
      changefreq: 'monthly',
      images: [
        {
          src: OBJECTIVE,
          title: 'Apex Legends Cheats FAQ Artwork',
          caption: 'Product artwork accompanying pre-purchase answers.',
        },
      ],
    }),
    urlEntry({
      path: '/support',
      priority: '0.75',
      changefreq: 'weekly',
      images: [
        {
          src: TACTICAL,
          title: 'Apex Legends Cheats Support Artwork',
          caption: 'Artwork accompanying load and delivery support.',
        },
      ],
    }),
    urlEntry({
      path: '/privacy',
      priority: '0.4',
      changefreq: 'yearly',
      images: [
        {
          src: OG_DEFAULT,
          title: 'Apex Legends Cheats Privacy Policy',
          caption: 'Privacy policy for apexlegendscheats.org orders and support.',
        },
      ],
    }),
    urlEntry({
      path: '/terms',
      priority: '0.4',
      changefreq: 'yearly',
      images: [
        {
          src: OG_DEFAULT,
          title: 'Apex Legends Cheats Terms of Use',
          caption: 'License terms and risk disclaimer for Apex Legends Cheats.',
        },
      ],
    }),
    urlEntry({
      path: '/refunds',
      priority: '0.45',
      changefreq: 'yearly',
      images: [
        {
          src: OG_DEFAULT,
          title: 'Apex Legends Cheats Refund Policy',
          caption: 'Refund rules for digital Apex Legends Cheats licenses.',
        },
      ],
    }),
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`
}

function validate(games, forums, staticRoutes, sitemap) {
  const errors = []
  if (forums.some((forum) => ['instructions', 'how-to-load'].includes(forum.slug))) {
    errors.push('Retired forum slug remains indexed')
  }

  for (const game of games) {
    const page = join(pagesDir, `${game.slug}-cheats.astro`)
    if (!existsSync(page)) errors.push(`Product route has no page file: /${game.slug}-cheats`)
  }
  if (forums.length && !existsSync(join(pagesDir, 'forums', '[slug].astro'))) {
    errors.push('Forum routes have no dynamic page file: src/pages/forums/[slug].astro')
  }

  for (const image of ALL_SITE_IMAGES) {
    const diskPath = join(publicDir, image.replace(/^\//, ''))
    if (!existsSync(diskPath)) errors.push(`Missing image asset on disk: ${image}`)
  }

  const expectedRoutes = new Set([
    ...staticRoutes,
    ...games.map((game) => `/${game.slug}-cheats`),
    ...forums.map((forum) => `/forums/${forum.slug}`),
  ])
  const expectedUrls = new Set([...expectedRoutes].map(siteUrl))

  // Page <loc> only — image:loc also uses <loc> nesting under image:image
  const pageLocs = [...sitemap.matchAll(/<url>\s*<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  const imageLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
  const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []

  for (const url of expectedUrls) {
    if (!pageLocs.includes(url)) errors.push(`Missing URL: ${url}`)
  }
  for (const url of pageLocs) {
    if (!expectedUrls.has(url)) errors.push(`Unexpected URL: ${url}`)
  }
  if (new Set(pageLocs).size !== pageLocs.length) {
    errors.push('sitemap.xml contains duplicate page URLs')
  }
  if (sitemap.includes('<sitemapindex')) errors.push('sitemap.xml must be a single urlset, not an index')
  if (urlBlocks.length !== expectedUrls.size) {
    errors.push(`Expected ${expectedUrls.size} <url> entries, found ${urlBlocks.length}`)
  }

  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
    if (!block.includes('<image:image>')) {
      errors.push(`URL missing image entry: ${loc}`)
    }
    if (!block.includes('<image:loc>')) {
      errors.push(`URL missing image:loc: ${loc}`)
    }
  }

  for (const image of ALL_SITE_IMAGES) {
    const absolute = siteUrl(image)
    if (!imageLocs.includes(absolute)) {
      errors.push(`Sitemap missing required image: ${image}`)
    }
  }

  if (imageLocs.length < expectedUrls.size) {
    errors.push('Image count is lower than page count — every URL needs an image')
  }

  if (errors.length) throw new Error(`Sitemap validation failed:\n- ${errors.join('\n- ')}`)
}

function main() {
  const games = loadGames()
  const forums = loadForums()
  const staticRoutes = loadStaticRoutes()
  const sitemap = buildSitemap(games, forums)
  validate(games, forums, staticRoutes, sitemap)

  writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8')
  writeFileSync(
    join(publicDir, 'robots.txt'),
    [
      'User-agent: Googlebot',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      '',
      'User-agent: Google-InspectionTool',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      '',
      'User-agent: *',
      'Allow: /',
      'Allow: /sitemap.xml',
      'Allow: /robots.txt',
      '',
      `Sitemap: ${siteUrl('/sitemap.xml')}`,
      '',
    ].join('\n'),
    'utf8',
  )

  const stale = [
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
    'sitemap-blogs.xml',
    'sitemap-regions.xml',
    'sitemap-index.xml',
    'sitemap_index.xml',
  ]
  for (const name of stale) {
    for (const dir of [publicDir, join(root, 'dist')]) {
      const path = join(dir, name)
      if (existsSync(path)) unlinkSync(path)
    }
  }

  const urlCount = (sitemap.match(/<url>/g) || []).length
  const imageCount = (sitemap.match(/<image:image>/g) || []).length
  console.log(
    `Sitemap OK: ${urlCount} URLs, ${imageCount} images in ${siteUrl('/sitemap.xml')}`,
  )
}

main()
