import Link from 'next/link'

import { homeNavItems } from '../_constants/home-nav-items'
import type { ContactLinks } from '@/lib/db/contact-queries'
import { BookingLink } from './booking-link'

/** Barra de navegação em pílula, compartilhada pela home e pelas rotas internas. */
export function SiteNav({ contact }: { contact: ContactLinks }) {
  return (
    <header className="relative z-30 px-5 py-6 sm:px-10 sm:py-8">
      <div className="mx-auto flex max-w-7xl items-center gap-4 sm:gap-5">
        <nav
          aria-label="Navegação principal"
          className="relative flex min-w-0 flex-1 items-center rounded-full bg-[linear-gradient(to_right,rgba(255,255,255,0.18),rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.12)_60%,rgba(255,255,255,0.06)_75%,rgba(255,255,255,0.02)_88%,transparent)] py-2.5 pr-3 pl-5 backdrop-blur-sm sm:py-3 sm:pr-4 sm:pl-8"
        >
          <Link
            href="/"
            className="relative z-10 shrink-0 font-[family-name:var(--font-cinzel)] text-sm font-medium tracking-wide text-white transition-colors hover:text-white/90 sm:text-base"
          >
            Tais Dantas
          </Link>

          <ul className="pointer-events-none absolute inset-0 flex list-none items-center justify-center gap-x-4 p-0 sm:gap-x-8">
            {homeNavItems.map(({ href, label }) => (
              <li key={label} className="pointer-events-auto">
                <Link
                  href={href}
                  className="text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <BookingLink
          href={contact.bookingHref}
          external={contact.bookingExternal}
          className="shrink-0 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-[#3A4424] shadow-sm transition-colors hover:bg-white sm:px-6 sm:py-2.5"
        >
          Agendar horário
        </BookingLink>
      </div>
    </header>
  )
}
