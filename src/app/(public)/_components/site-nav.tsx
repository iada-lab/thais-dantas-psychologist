'use client'

import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { homeNavItems } from '../_constants/home-nav-items'
import type { ContactLinks } from '@/lib/db/contact-queries'
import { BookingLink } from './booking-link'

/**
 * Barra de navegação em pílula, compartilhada pela home e pelas rotas internas.
 *
 * Abaixo de `lg` não há largura para os quatro links no centro da pílula — eles
 * dão lugar a um botão de menu que abre o painel logo abaixo do cabeçalho.
 */
export function SiteNav({ contact }: { contact: ContactLinks }) {
  const [open, setOpen] = useState(false)

  // Com o painel aberto, a página atrás não rola.
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  return (
    <header className="relative z-30 px-5 py-6 sm:px-10 sm:py-8">
      <div className="mx-auto flex max-w-7xl items-center gap-3 sm:gap-5">
        <nav
          aria-label="Navegação principal"
          className="relative flex min-w-0 flex-1 items-center rounded-full bg-[linear-gradient(to_right,rgba(255,255,255,0.18),rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.12)_60%,rgba(255,255,255,0.06)_75%,rgba(255,255,255,0.02)_88%,transparent)] py-2.5 pr-2 pl-4 backdrop-blur-sm sm:pl-5 lg:py-3 lg:pr-4 lg:pl-8"
        >
          <Link
            href="/"
            className="relative z-10 shrink-0 font-[family-name:var(--font-cinzel)] text-sm font-medium tracking-wide text-white transition-colors hover:text-white/90 sm:text-base"
          >
            Tais Dantas
          </Link>

          {/* Links centrados só quando há espaço para eles sem cobrir a marca. */}
          <ul className="pointer-events-none absolute inset-0 hidden list-none items-center justify-center gap-x-8 p-0 lg:flex">
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

          <button
            type="button"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="menu-principal"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            className="relative z-10 ml-auto flex size-9 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        <BookingLink
          href={contact.bookingHref}
          external={contact.bookingExternal}
          className="shrink-0 rounded-full bg-white/95 px-4 py-2 text-[13px] font-medium whitespace-nowrap text-[#3A4424] shadow-sm transition-colors hover:bg-white sm:px-6 sm:py-2.5 sm:text-sm"
        >
          Agendar<span className="hidden sm:inline"> horário</span>
        </BookingLink>
      </div>

      {open && (
        <div
          id="menu-principal"
          className="mx-auto mt-3 max-w-7xl overflow-hidden rounded-3xl border border-white/15 bg-[#3F4A2E]/95 backdrop-blur-md lg:hidden"
        >
          <ul className="flex list-none flex-col p-2">
            {homeNavItems.map(({ href, label }) => (
              <li key={label}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-[15px] font-medium text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
