import { Check, Shield } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { GameCover } from '../components/GameCover'
import {
  GUIDE_FEATURES,
  getGame,
  guidePath,
  parseGuideSlug,
  type Game,
} from '../data/games'
import { PRODUCT_PAGE_FAQS } from '../data/faqs'
import { PRODUCT_PRICE_USD, SITE_HOST, SITE_NAME } from '../data/site'
import { FaqSection } from '../components/FaqSection'
import { CheckoutLink } from '../components/CheckoutLink'
import { NotFoundPage } from './NotFoundPage'
import { blogPath } from '../data/blogs'
import {
  APEX_PRODUCT_PREVIEW_MP4,
  APEX_PRODUCT_PREVIEW_POSTER,
  APEX_PRODUCT_PREVIEW_WEBM,
} from '../data/media'

function ProductPurchaseCard({ game }: { game: Game }) {
  return (
    <div className="page-card overflow-hidden rounded-2xl sm:rounded-3xl">
      <CheckoutLink className="block" aria-label="Buy Apex Legends Cheats">
        <GameCover slug={game.slug} name={game.name} aspect="square" className="rounded-none" />
      </CheckoutLink>
      <div className="p-5 sm:p-8">
        <div className="flex items-center gap-3">
          <div className="icon-well shrink-0 text-sm font-bold">AL</div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">Apex Legends Cheats</p>
            <p className="text-xs text-white/45">
              Status: {game.status} · Apex Legends · From ${PRODUCT_PRICE_USD}
            </p>
          </div>
        </div>

        <CheckoutLink className="cta-gradient mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:mt-6">
          Buy Apex Legends Cheats
        </CheckoutLink>
        <p className="mt-3 text-center text-[11px] text-white/40">
          Instant delivery · Check Undetected first
        </p>
      </div>
    </div>
  )
}

type GameProductPageProps = {
  guideSlug: string
}

export function GameProductPage({ guideSlug }: GameProductPageProps) {
  const slug = parseGuideSlug(guideSlug)
  const game = getGame(slug)

  if (!guideSlug.endsWith('-cheats')) {
    const maybe = getGame(guideSlug)
    if (maybe) {
      if (typeof window !== 'undefined') {
        window.location.replace(guidePath(maybe.slug))
      }
      return null
    }
    return <NotFoundPage />
  }

  if (!game) return <NotFoundPage />

  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x py-8 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <nav
              className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-white/40"
              aria-label="Breadcrumb"
            >
              <a href="/" className="shrink-0 hover:text-white/70">
                Home
              </a>
              <span className="shrink-0">/</span>
              <span className="min-w-0 text-white/70">Product details</span>
            </nav>

            <div className="mt-5 overflow-hidden rounded-2xl border border-z-soft/20 bg-black sm:mt-8">
              <div className="relative aspect-video w-full lg:aspect-[21/9]">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster={APEX_PRODUCT_PREVIEW_POSTER}
                  aria-label="Apex Legends cheats gameplay preview"
                >
                  <source src={APEX_PRODUCT_PREVIEW_MP4} type="video/mp4" />
                  <source src={APEX_PRODUCT_PREVIEW_WEBM} type="video/webm" />
                </video>
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-z-soft">
                <Shield className="h-3.5 w-3.5 shrink-0 text-z-soft" strokeWidth={1.75} />
                {game.status} · Apex Legends · EAC · {SITE_HOST}
              </span>

              <h1 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-white sm:mt-4 sm:text-4xl lg:text-5xl">
                Apex Legends Cheat Features, Price & Checkout
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55 sm:mt-4 sm:text-base">
                Compare player ESP, loot ESP, soft aim, 2D radar and stream-proof options.
                Confirm current status, then continue to checkout.
              </p>
              <CheckoutLink className="cta-gradient mt-5 inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                Buy Apex Legends Cheats
              </CheckoutLink>
            </div>

            <div className="mt-6 lg:hidden">
              <ProductPurchaseCard game={game} />
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
              <div className="lg:col-span-7 space-y-10">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Included Apex Legends features
                  </h2>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {GUIDE_FEATURES.map((f) => (
                      <div key={f.name} className="page-card rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-z-accent/20">
                            <Check className="h-3 w-3 text-z-soft" strokeWidth={2.5} />
                          </span>
                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-white">{f.name}</h3>
                            <p className="mt-1 text-xs leading-relaxed text-white/50">{f.text}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Player ESP, loot ESP & radar
                  </h2>
                  <p>
                    Apex Legends Cheats lead with player ESP through terrain and buildings, loot
                    filters for faster resets, and a 2D radar so you see rotations before
                    another squad third-parties your fight.
                  </p>
                  <p>
                    Soft aim stays optional. If you want the lowest-report playstyle, run ESP
                    + radar + stream-proof and leave combat extras off.
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Apex Legends Undetected status (EAC)
                  </h2>
                  <p>
                    Apex Legends uses Easy Anti-Cheat. After a client or EAC patch, builds can flip
                    to Updating until tested. {SITE_NAME} shows live Undetected status so you
                    are not buying a dead loader from a screenshot farm.
                  </p>
                  <p>
                    Rule: status first, load second. That beats every “lifetime undetected”
                    claim on competing shops.
                  </p>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Checkout and delivery
                  </h2>
                  <ol className="list-decimal space-y-2 pl-5">
                    <li>Confirm current status on the {SITE_HOST} homepage.</li>
                    <li>Confirm status is Undetected (or accept Updating risk).</li>
                    <li>Scan ESP / radar / soft-aim features on this page.</li>
                    <li>Checkout for digital license delivery.</li>
                    <li>
                      Follow the{' '}
                      <a
                        href={blogPath('complete-setup')}
                        className="text-white/80 underline-offset-2 hover:underline"
                      >
                        complete setup and load order
                      </a>{' '}
                      after delivery.
                    </li>
                  </ol>
                </div>

                <div className="space-y-3 text-sm leading-relaxed text-white/55">
                  <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                    Why we stay Apex Legends-only
                  </h2>
                  <p>
                    {SITE_NAME} covers one title — Apex Legends on Windows PC. Status
                    updates stay on one product page, not buried under a multi-game catalog.
                  </p>
                  <p>
                    Play the game from the{' '}
                    <a
                      href="https://www.ea.com/games/apex-legends"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 underline-offset-2 hover:underline"
                    >
                      official Apex Legends website
                    </a>{' '}
                    or{' '}
                    <a
                      href="https://store.steampowered.com/app/1172470/Apex_Legends/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/80 underline-offset-2 hover:underline"
                    >
                      Apex Legends on Steam
                    </a>
                    . For hacks, stay on {SITE_HOST}:{' '}
                    <a href="/reviews" className="text-white/80 underline-offset-2 hover:underline">
                      reviews
                    </a>
                    ,{' '}
                    <a href="/support" className="text-white/80 underline-offset-2 hover:underline">
                      support
                    </a>
                    ,{' '}
                    <a href="/refunds" className="text-white/80 underline-offset-2 hover:underline">
                      refunds
                    </a>
                    , and{' '}
                    <a href="/forums" className="text-white/80 underline-offset-2 hover:underline">
                      forums
                    </a>
                    .
                  </p>
                </div>
              </div>

              <aside className="hidden lg:col-span-5 lg:block">
                <div className="sticky top-24">
                  <ProductPurchaseCard game={game} />
                </div>
              </aside>
            </div>
          </div>
        </section>

        <FaqSection
          heading="Apex Legends Cheats product FAQ"
          intro="Status, features, delivery and load questions before checkout."
          items={PRODUCT_PAGE_FAQS}
        />

        <SiteFooter currentPath="/apex-legends-cheats" />
      </main>
    </div>
  )
}
