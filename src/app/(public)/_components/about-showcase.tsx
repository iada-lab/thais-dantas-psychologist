import Image from 'next/image'

import { OfficeCarousel } from './office-carousel'

const CONDICOES = [
  'Obesidade',
  'Emagrecimento',
  'Transtornos Alimentares',
  'Cirurgia Bariátrica',
  'Endometriose',
]

/**
 * Sobre + Especialidades numa seção só, em areia — entra logo depois do hero,
 * quebrando a sequência de seções verdes antes das avaliações. A onda de topo
 * traz o verde do hero; embaixo, quem faz a emenda é a onda de areia no topo
 * das avaliações.
 */
export function AboutShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#EDE4D2] px-5 pt-28 pb-24 sm:px-10 lg:pt-32">
      {/* Verde descendo da seção anterior, emendando as duas */}
      <svg
        aria-hidden
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-24 w-full sm:h-32"
      >
        <path
          fill="#556040"
          d="M0 0 L1440 0 L1440 96 C 1180 172, 940 44, 690 112 C 460 174, 220 60, 0 128 Z"
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1800px]">
        {/* ── Sobre ────────────────────────────────────────────────────────── */}
        <div
          id="sobre"
          className="grid scroll-mt-24 items-center gap-14 lg:grid-cols-[0.75fr_1fr] lg:gap-20"
        >
          <div className="relative mx-auto w-full max-w-[340px] lg:max-w-[420px]">
            {/* Contorno deslocado, ecoando o do retrato do hero */}
            <div
              aria-hidden
              className="absolute -inset-x-5 -inset-y-4 rounded-t-full border border-[#556040]/25"
            />
            <div className="relative aspect-3/4 overflow-hidden rounded-t-full">
              <Image
                src="/pessoal_3.jpeg"
                alt="Tais Dantas em seu consultório"
                fill
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover object-[52%_30%]"
              />
            </div>
          </div>

          <div>
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#556040] uppercase">
              Sobre
            </p>
            <h2 className="mt-6 font-[family-name:var(--font-cormorant)] text-[clamp(2.4rem,4.6vw,4rem)] leading-[1.06] font-light text-[#2D2D2D]">
              Escuta qualificada,
              <br />
              <em className="text-[#556040] italic">no seu ritmo.</em>
            </h2>
            <p className="mt-8 max-w-xl text-[15px] leading-[1.9] text-[#2D2D2D]/75">
              Sou Tais Dantas, psicóloga dedicada a oferecer um ambiente seguro
              e acolhedor. Cada encontro é conduzido com escuta qualificada,
              respeito ao seu ritmo e foco no que faz sentido para você.
            </p>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.9] text-[#2D2D2D]/75">
              O processo terapêutico pode ajudar a compreender padrões
              emocionais, desenvolver recursos internos e construir relações
              mais saudáveis consigo e com os outros — sempre com
              confidencialidade e cuidado.
            </p>
          </div>
        </div>

        {/* ── Consultório ──────────────────────────────────────────────────── */}
        <div className="mt-24 border-t border-[#556040]/20 pt-14 lg:mt-32">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#556040] uppercase">
            O consultório
          </p>
          <OfficeCarousel />
        </div>

        {/* ── Especialidades ───────────────────────────────────────────────── */}
        <div
          id="especialidades"
          className="mt-24 scroll-mt-24 border-t border-[#556040]/20 pt-14 lg:mt-32"
        >
          <p className="text-[10px] font-semibold tracking-[0.3em] text-[#556040] uppercase">
            Especialidades
          </p>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#556040]/55 uppercase">
                Condições atendidas
              </p>
              <ul className="mt-6 grid list-none grid-cols-1 gap-x-12 p-0 sm:grid-cols-2">
                {CONDICOES.map(item => (
                  <li
                    key={item}
                    className="border-t border-[#556040]/15 py-3.5 font-[family-name:var(--font-cormorant)] text-[1.35rem] font-light text-[#2D2D2D]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#556040]/55 uppercase">
                Abordagem
              </p>
              <p className="mt-6 border-t border-[#556040]/15 pt-3.5 font-[family-name:var(--font-cormorant)] text-[1.35rem] leading-tight font-light text-[#2D2D2D]">
                Terapia Cognitiva Comportamental
              </p>
              <p className="mt-4 text-[14px] leading-[1.8] text-[#2D2D2D]/65">
                Abordagem baseada em evidências, focada em identificar e
                transformar os padrões de pensamento que sustentam o sofrimento.
              </p>
              <p className="mt-6 border-t border-[#556040]/15 pt-3.5 text-[11px] font-medium tracking-[0.18em] text-[#556040] uppercase">
                Atendimento online e presencial
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
