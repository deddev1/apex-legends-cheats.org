import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { FaqSection } from '../components/FaqSection'
import { CheckoutLink } from '../components/CheckoutLink'
import { SeoMedia } from '../components/SeoMedia'
import { SITE_HOST, SITE_NAME } from '../data/site'
import { SUPPORT_FAQS, SUPPORT_INTRO, SUPPORT_TOPICS } from '../data/support'
import { PAGE_MEDIA } from '../data/media'

export function SupportPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x pt-12 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {SITE_NAME} · Help · {SITE_HOST}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Apex Legends Cheats loader &amp; setup support
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/55">
              {SUPPORT_INTRO} Play Apex Legends from the{' '}
              <a
                href="https://www.ea.com/games/apex-legends"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-2 hover:underline"
              >
                official site
              </a>{' '}
              or{' '}
              <a
                href="https://store.steampowered.com/app/1172470/Apex_Legends/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 underline-offset-2 hover:underline"
              >
                Steam
              </a>
              . Product help stays on{' '}
              <a href="/apex-legends-cheats" className="text-white/80 underline-offset-2 hover:underline">
                ESP &amp; price
              </a>
              ,{' '}
              <a href="/forums" className="text-white/80 underline-offset-2 hover:underline">
                setup threads
              </a>
              ,{' '}
              <a href="/reviews" className="text-white/80 underline-offset-2 hover:underline">
                ratings
              </a>
              , and the{' '}
              <a href="/faq" className="text-white/80 underline-offset-2 hover:underline">
                FAQ hub
              </a>
              .
            </p>
          </div>
        </section>

        <section className="page-x pt-10 sm:pt-12">
          <div className="mx-auto max-w-6xl">
            <SeoMedia media={PAGE_MEDIA.support} />
          </div>
        </section>

        <section className="page-x py-12 sm:py-14">
          <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
            {SUPPORT_TOPICS.map((topic) => (
              <article key={topic.heading} className="page-card rounded-2xl p-6 sm:p-8">
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {topic.heading}
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/65">
                  {topic.body.map((line) => (
                    <li key={line.slice(0, 48)}>{line}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <FaqSection
          id="faq"
          heading="Apex Legends Cheats support FAQ"
          intro="Load, delivery, menu, setup, config and EAC answers for Apex Legends buyers."
          items={SUPPORT_FAQS}
        />

        <section className="page-band page-x border-t border-white/10 py-16">
          <div className="page-card mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-2xl p-6 sm:gap-8 sm:rounded-3xl sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-12">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
                Need help now
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                Open Apex Legends Cheats or checkout support
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                Confirm Undetected status on the product page, then buy or reopen your order for
                delivery and support.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <a
                href="/apex-legends-cheats"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
              >
                Feature list
              </a>
              <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white">
                Buy license
              </CheckoutLink>
            </div>
          </div>
        </section>

        <SiteFooter currentPath="/support" />
      </main>
    </div>
  )
}
