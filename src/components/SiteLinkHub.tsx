import {
  OFFICIAL_APEX_LINKS,
  SITE_GUIDE_LINKS,
  SITE_PAGE_LINKS,
} from '../data/links'

type SiteLinkHubProps = {
  /** Highlight the current path (links stay visible — never emptied). */
  currentPath?: string
  /** Compact = footer-friendly denser list; default = full section. */
  variant?: 'section' | 'compact'
}

function normalizePath(path?: string) {
  if (!path) return ''
  const trimmed = path.replace(/\/+$/, '') || '/'
  return trimmed
}

function isCurrent(to: string, currentPath?: string) {
  const path = normalizePath(currentPath)
  if (!path) return false
  const target = normalizePath(to)
  if (target === '/') return path === '/'
  return path === target || path.startsWith(`${target}/`)
}

/**
 * HTML sitemap: internal + official Apex Legends links for crawl paths.
 * Always renders the full link set — current page is marked, not removed.
 */
export function SiteLinkHub({ currentPath, variant = 'section' }: SiteLinkHubProps) {
  const path = normalizePath(currentPath)

  if (variant === 'compact') {
    return (
      <nav aria-label="Site sitemap" className="space-y-6 text-sm">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
            Site pages
          </p>
          <ul className="mt-3 space-y-2 text-white/65">
            {SITE_PAGE_LINKS.map((l) => (
              <li key={l.to}>
                <a
                  href={l.to}
                  aria-current={isCurrent(l.to, path) ? 'page' : undefined}
                  className={
                    isCurrent(l.to, path) ? 'font-medium text-white' : 'hover:text-white'
                  }
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
            Forums
          </p>
          <ul className="mt-3 space-y-2 text-white/65">
            {SITE_GUIDE_LINKS.map((l) => (
              <li key={l.to}>
                <a
                  href={l.to}
                  aria-current={isCurrent(l.to, path) ? 'page' : undefined}
                  className={
                    isCurrent(l.to, path) ? 'font-medium text-white' : 'hover:text-white'
                  }
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
            Official Apex Legends
          </p>
          <ul className="mt-3 space-y-2 text-white/65">
            {OFFICIAL_APEX_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }

  return (
    <section
      className="page-x border-t border-z-soft/15 py-12 sm:py-14"
      aria-labelledby="site-link-hub-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
          Sitemap
        </p>
        <h2
          id="site-link-hub-heading"
          className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl"
        >
          Apex Legends Cheats sitemap
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-white/50">
          Every indexed page — product, forums, FAQ, support, reviews — plus the official
          Apex Legends website and Steam store for Apex Legends.
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold text-white">Site pages</h3>
            <ul className="mt-3 space-y-2.5">
              {SITE_PAGE_LINKS.map((l) => {
                const current = isCurrent(l.to, path)
                return (
                  <li key={l.to}>
                    <div className="group block text-sm text-white/70">
                      <a
                        href={l.to}
                        aria-current={current ? 'page' : undefined}
                        className={`font-medium underline-offset-2 transition-colors hover:text-z-soft hover:underline ${
                          current ? 'text-white' : ''
                        }`}
                      >
                        {l.label}
                      </a>
                      {l.description ? (
                        <p className="mt-0.5 text-xs text-white/40">{l.description}</p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Forum threads</h3>
            <ul className="mt-3 space-y-2.5">
              {SITE_GUIDE_LINKS.map((l) => {
                const current = isCurrent(l.to, path)
                return (
                  <li key={l.to}>
                    <a
                      href={l.to}
                      aria-current={current ? 'page' : undefined}
                      className={`text-sm underline-offset-2 transition-colors hover:text-z-soft hover:underline ${
                        current ? 'font-medium text-white' : 'text-white/70'
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                )
              })}
              <li>
                <a
                  href="/forums"
                  className="text-sm font-medium text-white/80 underline-offset-2 hover:text-z-soft hover:underline"
                >
                  Browse forum threads →
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">Official Apex Legends</h3>
            <ul className="mt-3 space-y-2.5">
              {OFFICIAL_APEX_LINKS.map((l) => (
                <li key={l.href}>
                  <div className="group block text-sm text-white/70">
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium underline-offset-2 transition-colors hover:text-z-soft hover:underline"
                    >
                      {l.label}
                    </a>
                    <p className="mt-0.5 text-xs text-white/40">{l.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs leading-relaxed text-white/35">
              Official links are for the game itself. Cheats and loaders are only sold on
              this site.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
