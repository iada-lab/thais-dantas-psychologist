import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { BookingLink } from './booking-link'
import { homeNavItems } from '../_constants/home-nav-items'
import type { ContactLinks } from '@/lib/db/contact-queries'
import { OfficeGallery } from './office-gallery'

/**
 * Hero editorial: manchete serifada à esquerda, retrato em oval inclinado à
 * direita e elementos decorativos (estrela, seta, selo giratório). Mantém a
 * paleta verde e o header da home.
 */
export function HeroEditorial({ contact }: { contact: ContactLinks }) {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-[#556040]">
      {/* ── Textura de fundo ─────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(90deg,transparent_0px,transparent_79px,rgba(255,255,255,0.05)_79px,rgba(255,255,255,0.05)_80px)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(65%_55%_at_70%_15%,rgba(228,218,194,0.22),transparent_70%)]"
      />
      {/* Ondulações em areia, com degradê subindo até sumir */}
      <svg
        aria-hidden
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[48%] w-full"
      >
        <defs>
          <linearGradient id="areia-funda" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#DCC3A0" stopOpacity="0.30" />
            <stop offset="100%" stopColor="#DCC3A0" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="areia-clara" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F2EBDE" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#E4DAC2" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#areia-funda)"
          d="M0 200 C 240 130, 480 285, 720 225 C 960 165, 1200 265, 1440 185 L1440 420 L0 420 Z"
        />
        <path
          fill="url(#areia-clara)"
          d="M0 315 C 300 245, 560 375, 860 315 C 1120 263, 1290 345, 1440 295 L1440 420 L0 420 Z"
        />
      </svg>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-1/3 bg-[linear-gradient(to_bottom,transparent,rgba(24,32,26,0.35))]"
      />

      {/* ── Header (idêntico ao da home) ─────────────────────────────────── */}
      <header className="relative z-30 px-5 py-6 sm:px-10 sm:py-8">
        <div className="mx-auto flex max-w-7xl items-center gap-4 sm:gap-5">
          <nav
            aria-label="Navegação principal"
            className="relative flex min-w-0 flex-1 items-center rounded-full bg-[linear-gradient(to_right,rgba(255,255,255,0.18),rgba(255,255,255,0.18)_45%,rgba(255,255,255,0.12)_60%,rgba(255,255,255,0.06)_75%,rgba(255,255,255,0.02)_88%,transparent)] py-2.5 pl-5 pr-3 backdrop-blur-sm sm:py-3 sm:pl-8 sm:pr-4"
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

      {/* ── Conteúdo ─────────────────────────────────────────────────────── */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 items-center px-5 sm:px-10">
        <div className="relative grid w-full items-center gap-10 py-6 lg:grid-cols-[1fr_1.45fr] lg:gap-8 lg:py-8">
          {/* Traços saindo do retrato — acima e abaixo do texto, e um laço à direita */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="pointer-events-none absolute inset-0 hidden size-full overflow-visible text-[#E4DAC2] lg:block"
          >
            {/* Faixa de cima, cruzando-se antes da manchete */}
            <path
              d="M58 14 C 40 6, 18 2, -6 1"
              vectorEffect="non-scaling-stroke"
              opacity="0.5"
            />
            <path
              d="M66 6 C 46 12, 20 10, -6 5"
              vectorEffect="non-scaling-stroke"
              opacity="0.3"
            />
            {/* Traço no topo à direita */}
            <path
              d="M70 8 C 86 -2, 100 -6, 112 2"
              vectorEffect="non-scaling-stroke"
              opacity="0.35"
            />
            {/* Faixa de baixo, sob as estatísticas */}
            <path
              d="M62 80 C 44 90, 20 95, -6 97"
              vectorEffect="non-scaling-stroke"
              opacity="0.45"
            />
            {/* Laço à direita */}
            <path
              d="M84 60 C 102 54, 116 68, 108 80 C 102 89, 92 84, 97 74"
              vectorEffect="non-scaling-stroke"
              opacity="0.4"
            />
          </svg>

          {/* Seta desenhada ligando o texto ao retrato */}
          <svg
            aria-hidden
            viewBox="0 0 200 130"
            fill="none"
            className="pointer-events-none absolute bottom-48 left-[30%] hidden h-32 w-56 text-[#E4DAC2]/55 lg:block"
          >
            <path
              d="M196 6 C 158 74, 96 112, 10 112"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <path
              d="M30 99 L8 112 L31 123"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* ── Coluna esquerda ──────────────────────────────────────────── */}
          <div className="relative z-10">
            <h1 className="font-[family-name:var(--font-cormorant)] text-[#F4EFE3]">
              <span className="block text-[clamp(4.25rem,12vw,10.5rem)] font-light leading-[0.84] tracking-[-0.025em]">
                Leveza
              </span>
              <span className="mt-1 block text-[clamp(1.9rem,5.2vw,4.25rem)] font-light italic leading-[1.08] text-[#E2D7BD]">
                que começa por dentro
              </span>
            </h1>

            <p className="mt-6 max-w-md text-[15px] leading-[1.8] text-white/70">
              Cuidar da mente não é luxo, é compromisso. Mudanças reais nascem
              de um espaço seguro, sem julgamento — e de um acompanhamento que
              respeita o seu tempo.
            </p>

            <BookingLink
              href={contact.bookingHref}
              external={contact.bookingExternal}
              className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#222A17] px-8 py-4 text-sm font-medium text-[#F4EFE3] transition-colors hover:bg-[#171D0F]"
            >
              Agendar uma conversa
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </BookingLink>

            <div className="mt-9 flex items-start gap-10 sm:gap-14">
              <div>
                <p className="font-[family-name:var(--font-cormorant)] text-[2.75rem] font-light leading-none text-[#F4EFE3]">
                  05
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
                  Áreas de atendimento
                </p>
              </div>
              <div className="border-l border-white/15 pl-10 sm:pl-14">
                <p className="font-[family-name:var(--font-cormorant)] text-[2.75rem] font-light leading-none text-[#F4EFE3]">
                  TCC
                </p>
                <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/55">
                  Abordagem clínica
                </p>
              </div>
            </div>
          </div>

          {/* ── Coluna direita: retrato + consultório ────────────────────── */}
          <div className="relative mx-auto w-full max-w-[350px] sm:max-w-[500px] lg:max-w-[700px]">
            {/* O retrato define a altura; os arcos orbitam em volta dele. */}
            <div className="relative -top-14 aspect-4/5 w-[76%] lg:-top-24">
              {/* Contorno deslocado */}
              <div
                aria-hidden
                className="absolute -inset-x-6 -inset-y-2 rotate-[22deg] rounded-[50%] border border-[#E4DAC2]/45 bg-black/25"
              />

              {/* Retrato em oval inclinado */}
              <div className="absolute inset-0 rotate-[9deg] overflow-hidden rounded-[50%]">
                <Image
                  src="/pessoal_2.jpeg"
                  alt="Tais Dantas, psicóloga, em atendimento no consultório"
                  fill
                  priority
                  sizes="(max-width: 1024px) 80vw, 540px"
                  className="-rotate-[9deg] scale-[1.22] object-cover object-[56%_12%]"
                />
              </div>

              {/* Selo giratório */}
              <Link
                href="/#sobre"
                className="absolute -bottom-3 left-[14%] flex size-16 items-center justify-center rounded-full bg-[#F4EFE3] shadow-lg transition-transform hover:scale-105 sm:left-[20%] sm:size-20 lg:bottom-2"
              >
                <svg
                  aria-hidden
                  viewBox="0 0 100 100"
                  className="absolute inset-0 size-full animate-[spin_18s_linear_infinite]"
                >
                  <defs>
                    <path
                      id="selo-hero"
                      d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
                    />
                  </defs>
                  <text className="fill-[#556040] text-[9px] font-medium uppercase tracking-[0.18em]">
                    <textPath href="#selo-hero">
                      Saiba mais • Saiba mais • Saiba mais •
                    </textPath>
                  </text>
                </svg>
                <span className="sr-only">Saiba mais sobre o atendimento</span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="size-4 text-[#556040]"
                  fill="currentColor"
                >
                  <path d="M12 0c.6 5.6 2.8 9.2 12 12-9.2 2.8-11.4 6.4-12 12-.6-5.6-2.8-9.2-12-12C9.2 9.2 11.4 5.6 12 0Z" />
                </svg>
              </Link>
            </div>

            <OfficeGallery />
          </div>
        </div>
      </div>
    </section>
  )
}
