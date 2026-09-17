import { readFileSync } from 'node:fs'
import { join } from 'node:path'

/**
 * Serve crawler-critical SEO files with correct MIME types in Astro
 * dev + preview (production uses public/_headers on Cloudflare Pages).
 */
export function sitemapBrowserViewPlugin(root = process.cwd()) {
  const xmlType = 'application/xml; charset=utf-8'
  const sitemapPaths = [
    'sitemap.xml',
    'sitemap-pages.xml',
    'sitemap-products.xml',
    'sitemap-forums.xml',
    'sitemap-images.xml',
  ]
  const files = new Map([
    ...sitemapPaths.map((name) => [
      `/${name}`,
      { path: join(root, 'public', name), type: xmlType },
    ]),
    [
      '/robots.txt',
      {
        path: join(root, 'public', 'robots.txt'),
        type: 'text/plain; charset=utf-8',
      },
    ],
    [
      '/sitemap.css',
      {
        path: join(root, 'public', 'sitemap.css'),
        type: 'text/css; charset=utf-8',
      },
    ],
  ])

  const serve = (req, res, next) => {
    const path = req.url?.split('?')[0] ?? ''
    const file = files.get(path)
    if (!file) {
      next()
      return
    }

    let body
    try {
      body = readFileSync(file.path)
    } catch {
      next()
      return
    }

    res.statusCode = 200
    res.setHeader('Content-Type', file.type)
    res.setHeader('X-Content-Type-Options', 'nosniff')
    res.setHeader('Cache-Control', 'no-cache')
    res.end(body)
  }

  return {
    name: 'sitemap-browser-view',
    configureServer(server) {
      server.middlewares.use(serve)
    },
    configurePreviewServer(server) {
      server.middlewares.use(serve)
    },
  }
}
