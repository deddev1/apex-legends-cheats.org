import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = join(import.meta.dirname, '..')
const dist = join(root, 'dist')
const site = 'https://apexlegendscheats.org'
const failures = []

function fail(message) {
  failures.push(message)
}

function htmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name)
    return entry.isDirectory() ? htmlFiles(path) : entry.name.endsWith('.html') ? [path] : []
  })
}

function pageUrl(file) {
  const page = relative(dist, file).replaceAll('\\', '/')
  if (page === 'index.html') return `${site}/`
  if (page.endsWith('/index.html')) return `${site}/${page.slice(0, -11)}`
  return `${site}/${page.slice(0, -5)}`
}

const files = htmlFiles(dist)
const titles = new Map()
const descriptions = new Map()

for (const file of files) {
  const html = readFileSync(file, 'utf8')
  const page = relative(dist, file).replaceAll('\\', '/')
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  const canonicalUrl = pageUrl(file)

  if (h1Count !== 1) fail(`${page}: expected one H1, found ${h1Count}`)
  if (!title) fail(`${page}: missing title`)
  else if (titles.has(title)) fail(`${page}: duplicate title also used by ${titles.get(title)}`)
  else titles.set(title, page)
  if (!description) fail(`${page}: missing description`)
  else if (descriptions.has(description)) {
    fail(`${page}: duplicate description also used by ${descriptions.get(description)}`)
  } else descriptions.set(description, page)

  if (page !== '404.html') {
    if (!html.includes(`rel="canonical" href="${canonicalUrl}"`)) {
      fail(`${page}: missing self-referencing canonical ${canonicalUrl}`)
    }
    if (!html.includes(`hreflang="en" href="${canonicalUrl}"`)) {
      fail(`${page}: missing self-referencing hreflang=en`)
    }
    if (!html.includes(`hreflang="x-default" href="${canonicalUrl}"`)) {
      fail(`${page}: missing self-referencing hreflang=x-default`)
    }
  }

  if (html.includes('assets-prd.ignimgs.com')) fail(`${page}: contains third-party IGN image`)
  if (html.includes('cdn.cosmocheats.com')) fail(`${page}: contains third-party media hotlink`)
  if (html.includes('SearchAction')) fail(`${page}: contains invalid SearchAction`)
  if (html.includes('"keywords"')) fail(`${page}: contains keyword-list structured data`)
  if (/forums\/(instructions|how-to-load)/.test(html)) {
    fail(`${page}: links to a retired forum route`)
  }
}

const home = readFileSync(join(dist, 'index.html'), 'utf8')
const product = readFileSync(join(dist, 'apex-legends-cheats', 'index.html'), 'utf8')
const reviews = readFileSync(join(dist, 'reviews', 'index.html'), 'utf8')
const faq = readFileSync(join(dist, 'faq', 'index.html'), 'utf8')
const support = readFileSync(join(dist, 'support', 'index.html'), 'utf8')
const importantPages = [
  home,
  product,
  reviews,
  faq,
  support,
  readFileSync(join(dist, 'forums', 'index.html'), 'utf8'),
]

if (!home.includes('<title>Apex Legends Cheats | ESP, Aimbot &amp; Radar for PC</title>')) {
  fail('Homepage does not own the exact transactional title')
}
if (product.includes('<title>Buy Apex Legends Cheats')) fail('Product details page competes with homepage')
if ((faq.match(/"@type":"FAQPage"/g) || []).length !== 1) fail('/faq must own one FAQPage')
for (const [name, html] of [
  ['home', home],
  ['product', product],
  ['reviews', reviews],
  ['support', support],
]) {
  if (html.includes('"@type":"FAQPage"')) fail(`${name}: duplicate FAQPage schema`)
}
for (const [name, html] of [
  ['home', home],
  ['product', product],
]) {
  if (!html.includes('"@id":"https://apexlegendscheats.org/#product"')) {
    fail(`${name}: missing shared Product ID`)
  }
}
if (reviews.includes('"@type":"Review"') || reviews.includes('"@type":"AggregateRating"')) {
  fail('/reviews must not emit Review or AggregateRating schema (on-page reviews only)')
}
if (!product.includes('<title>Apex Legends Cheats Features &amp; Price | ESP, Radar, Aim</title>')) {
  fail('Product page title must target features and price, not homepage keywords alone')
}
if (support.includes('noindex')) fail('Support page must be indexable')
for (const file of files) {
  const page = relative(dist, file).replaceAll('\\', '/')
  if (page === '404.html') continue
  const html = readFileSync(file, 'utf8')
  if (html.includes('content="noindex')) fail(`${page}: content page must not be noindex`)
}
for (const html of importantPages) {
  if (
    !html.includes('/media/apex-legends-') &&
    !html.includes('youtube-nocookie.com/embed/') &&
    !html.includes('/videos/apex-product-preview')
  ) {
    fail('An important indexed page is missing visible Apex Legends media')
  }
}
if (!home.includes('youtube-nocookie.com/embed/bZ2kGpS_gQ4')) {
  fail('Homepage is missing the official Apex Legends trailer')
}

const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8')
if (sitemap.includes('<sitemapindex')) fail('sitemap.xml must be a single urlset, not an index')
if (/forums\/(instructions|how-to-load)/.test(sitemap)) fail('Retired forum remains in sitemap.xml')
const expectedUrls = new Set(
  files
    .filter((file) => relative(dist, file).replaceAll('\\', '/') !== '404.html')
    .map(pageUrl),
)
const urlBlocks = sitemap.match(/<url>[\s\S]*?<\/url>/g) || []
const pageLocs = urlBlocks.map((block) => block.match(/<loc>([^<]+)<\/loc>/)?.[1]).filter(Boolean)
const uniqueSitemapUrls = new Set(pageLocs)
const imageLocs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((match) => match[1])
const requiredImages = [
  '/media/apex-legends-soldier-hero.jpg',
  '/media/apex-legends-battle-royale.jpg',
  '/media/apex-legends-ranked-squad.jpg',
  '/media/apex-legends-product-hero.webp',
  '/media/apex-legends-product-cover.webp',
  '/og/apex-legends-cheats.jpg',
]

for (const url of expectedUrls) {
  if (!uniqueSitemapUrls.has(url)) fail(`sitemap.xml missing built page ${url}`)
}
for (const url of uniqueSitemapUrls) {
  if (!expectedUrls.has(url)) fail(`sitemap.xml contains URL without a built page: ${url}`)
}
if (uniqueSitemapUrls.size !== pageLocs.length) fail('sitemap.xml contains duplicate URLs')
if (urlBlocks.length !== expectedUrls.size) {
  fail(`sitemap.xml must contain exactly ${expectedUrls.size} built page URLs`)
}
if ((sitemap.match(/<image:image>/g) || []).length < expectedUrls.size) {
  fail('Every sitemap URL must include at least one image entry')
}
for (const block of urlBlocks) {
  const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1] || '(unknown)'
  if (!block.includes('<image:image>') || !block.includes('<image:loc>')) {
    fail(`sitemap URL missing image entry: ${loc}`)
  }
}
for (const image of requiredImages) {
  if (!imageLocs.some((loc) => loc.endsWith(image))) {
    fail(`sitemap.xml missing required image ${image}`)
  }
}
if (!sitemap.trimStart().startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
  fail('sitemap.xml must start with an XML declaration')
}
if (sitemap.includes('xml-stylesheet')) {
  fail('sitemap.xml must not embed xml-stylesheet (Worker injects it for browsers only)')
}
for (const stale of [
  'sitemap-pages.xml',
  'sitemap-products.xml',
  'sitemap-forums.xml',
  'sitemap-images.xml',
  'sitemap-blogs.xml',
  'sitemap-regions.xml',
  'sitemap-index.xml',
  'sitemap_index.xml',
]) {
  if (existsSync(join(dist, stale))) fail(`Stale split sitemap still published: ${stale}`)
}

if (!existsSync(join(dist, 'sitemap.xml'))) fail('dist/sitemap.xml is missing')
if (!existsSync(join(dist, 'robots.txt'))) fail('dist/robots.txt is missing')
if (!existsSync(join(dist, '_routes.json'))) fail('dist/_routes.json is missing')

const robots = readFileSync(join(dist, 'robots.txt'), 'utf8')
if (!robots.includes('Sitemap: https://apexlegendscheats.org/sitemap.xml')) {
  fail('robots.txt must point at the canonical HTTPS sitemap')
}
if (!robots.includes('Allow: /sitemap.xml')) {
  fail('robots.txt must explicitly allow /sitemap.xml')
}
if (!robots.includes('User-agent: Googlebot')) {
  fail('robots.txt must explicitly allow Googlebot')
}

const routes = JSON.parse(readFileSync(join(dist, '_routes.json'), 'utf8'))
if (!routes.exclude?.includes('/sitemap.xml') || !routes.exclude?.includes('/robots.txt')) {
  fail('_routes.json must exclude /sitemap.xml and /robots.txt from Functions')
}

for (const asset of [
  'public/og/apex-legends-cheats.jpg',
  'public/media/apex-legends-product-hero.webp',
  'public/media/apex-legends-product-cover.webp',
  'public/media/apex-legends-soldier-hero.jpg',
  'public/media/apex-legends-battle-royale.jpg',
  'public/media/apex-legends-ranked-squad.jpg',
  'public/videos/apex-card-loop.mp4',
  'public/videos/apex-product-preview.mp4',
  'public/media/apex-hero-poster.jpg',
  'public/sitemap.css',
  'public/_routes.json',
  'functions/_middleware.js',
]) {
  if (!existsSync(join(root, asset))) fail(`Missing first-party asset: ${asset}`)
}

const redirects = readFileSync(join(root, 'public', '_redirects'), 'utf8')
if (!redirects.includes('/sitemap-pages.xml')) {
  fail('_redirects missing legacy sitemap → /sitemap.xml redirects')
}
if (!redirects.includes('/sitemap-index.xml')) {
  fail('_redirects missing sitemap-index.xml → /sitemap.xml redirect')
}

const headers = readFileSync(join(root, 'public', '_headers'), 'utf8')
if (!headers.includes('Content-Type: text/html; charset=utf-8')) {
  fail('_headers missing HTML charset Content-Type')
}
if (!headers.includes('/sitemap.xml')) {
  fail('_headers missing /sitemap.xml Content-Type')
}
if (!headers.includes('application/xml; charset=utf-8')) {
  fail('_headers missing XML charset Content-Type')
}

if (failures.length) {
  throw new Error(`SEO verification failed:\n- ${failures.join('\n- ')}`)
}

console.log(`SEO verification passed: ${files.length} HTML files, 5 forums, 12 reviews`)
