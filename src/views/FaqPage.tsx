import { Navbar } from '../components/Navbar'
import { SiteFooter } from '../components/SiteFooter'
import { FaqSection } from '../components/FaqSection'
import { SITE_FAQS } from '../data/faqs'
import { OFFICIAL_APEX_LINKS } from '../data/links'
import { CheckoutLink } from '../components/CheckoutLink'
import { SeoMedia } from '../components/SeoMedia'
import { SITE_HOST, SITE_NAME } from '../data/site'
import { PAGE_MEDIA } from '../data/media'

export function FaqPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-z-bg text-white">
      <div className="border-b border-z-soft/15 bg-z-bg/90 backdrop-blur-xl">
        <Navbar />
      </div>

      <main className="page-body">
        <section className="page-x pt-12 sm:pt-20">
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/45">
              {SITE_NAME} · FAQ · {SITE_HOST}
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Apex Legends Cheats FAQ
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/55">
              Compatibility, setup and live status for Apex Legends Cheats on Windows PC — plus
              Undetected updates, ESP, soft aim, radar, checkout, loader steps, support, reviews
              and refunds.
            </p>
            <p className="mt-3 text-sm text-white/45">
              Related:{' '}
              <a href="/" className="text-white/75 underline-offset-2 hover:underline">
                Homepage
              </a>
              {' · '}
              <a href="/support" className="text-white/75 underline-offset-2 hover:underline">
                Loader help
              </a>
              {' · '}
              <a href="/reviews" className="text-white/75 underline-offset-2 hover:underline">
                Buyer reviews
              </a>
              {' · '}
              <a
                href={OFFICIAL_APEX_LINKS[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/75 underline-offset-2 hover:underline"
              >
                {OFFICIAL_APEX_LINKS[1].label}
              </a>
            </p>
          </div>
        </section>

        <section className="page-x pt-10 sm:pt-12">
          <div className="mx-auto max-w-6xl">
            <SeoMedia media={PAGE_MEDIA.faq} />
          </div>
        </section>

        <FaqSection
          id="faq"
          heading="All Apex Legends Cheats questions"
          intro="Straight answers on buying, loading, Undetected status, and features."
          items={SITE_FAQS}
          className="border-t-0 pt-10 sm:pt-12"
        />

        <section className="page-band page-x border-t border-white/10 py-16">
          <div className="page-card mx-auto grid max-w-6xl gap-6 overflow-hidden rounded-2xl p-6 sm:rounded-3xl sm:p-10 lg:grid-cols-2 lg:items-center lg:p-12">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                Still need help?
              </h2>
              <p className="mt-3 text-sm text-white/55">
                Open support for load and inject help, or buy when Undetected status is live.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <a
                href="/support"
                className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white hover:bg-white/5"
              >
                Help desk
              </a>
              <CheckoutLink className="cta-gradient inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium text-white">
                Checkout
              </CheckoutLink>
            </div>
          </div>
        </section>

        <SiteFooter currentPath="/faq" />
      </main>
    </div>
  )
}
