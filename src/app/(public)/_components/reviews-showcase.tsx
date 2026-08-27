'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'

import type { GooglePlaceData } from '../_constants/google-reviews-fallback'
import { cn } from '@/lib/utils'

const VIDEO_ID = 'V_e80s00PyY'
const ROTATION_MS = 8000

function Stars({
  rating,
  tone = 'cream',
}: {
  rating: number
  tone?: 'cream' | 'green'
}) {
  const filled = Math.round(rating)
  const [on, off] =
    tone === 'green'
      ? ['text-[#556040]', 'text-[#556040]/25']
      : ['text-[#E4DAC2]', 'text-[#E4DAC2]/25']
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="currentColor"
          className={cn('size-3.5', i < filled ? on : off)}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

/**
 * Avaliações do Google à esquerda e vídeo à direita, logo abaixo do hero.
 * Mantém o verde, o creme e o serifado do hero; as ondulações em areia descem
 * do fim da seção anterior para emendar as duas.
 */
export function ReviewsShowcase({
  googlePlace,
}: {
  googlePlace: GooglePlaceData
}) {
  const reviews = googlePlace.reviews
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || reviews.length < 2) return
    const id = setInterval(
      () => setIndex(i => (i + 1) % reviews.length),
      ROTATION_MS
    )
    return () => clearInterval(id)
  }, [paused, reviews.length])

  const go = (step: number) =>
    setIndex(i => (i + step + reviews.length) % reviews.length)

  // Janela rolante: os cards têm altura fixa e o texto é truncado, então a
  // seção não muda de tamanho conforme o comprimento da avaliação.
  const slots = Array.from(
    { length: Math.min(3, reviews.length) },
    (_, k) => (index + k) % reviews.length
  )

  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[#556040] px-5 py-20 sm:px-10">
      {/* Areia descendo do hero, emendando as duas seções */}
      <svg
        aria-hidden
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[34%] w-full"
      >
        <defs>
          <linearGradient id="areia-topo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DCC3A0" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#DCC3A0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#areia-topo)"
          d="M0 0 L1440 0 L1440 130 C 1200 210, 950 70, 700 145 C 470 214, 230 74, 0 152 Z"
        />
      </svg>

      {/* Traços curvos, nas bordas para não cruzar o texto */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        className="pointer-events-none absolute inset-0 z-0 hidden size-full text-[#E4DAC2] lg:block"
      >
        <path
          d="M-4 6 C 26 14, 58 2, 104 12"
          vectorEffect="non-scaling-stroke"
          opacity="0.28"
        />
        <path
          d="M-4 96 C 30 86, 66 100, 104 90"
          vectorEffect="non-scaling-stroke"
          opacity="0.22"
        />
      </svg>

      <div className="relative z-10 mx-auto grid w-full max-w-[1800px] items-center gap-16 lg:grid-cols-[1fr_1.95fr] lg:gap-14">
        {/* ── Avaliações ─────────────────────────────────────────────────── */}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
            Avaliações
          </p>

          <div className="mt-5 flex items-end gap-5">
            <span className="font-[family-name:var(--font-cormorant)] text-[4.5rem] leading-none font-light text-[#F4EFE3]">
              {googlePlace.rating.toLocaleString('pt-BR', {
                minimumFractionDigits: 1,
                maximumFractionDigits: 1,
              })}
            </span>
            <div className="mb-2">
              <Stars rating={googlePlace.rating} />
              <p className="mt-2 text-[10px] font-medium tracking-[0.18em] text-white/50 uppercase">
                {googlePlace.userRatingCount} avaliaç
                {googlePlace.userRatingCount === 1 ? 'ão' : 'ões'} no Google
              </p>
            </div>
          </div>

          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className="mt-9 flex flex-col gap-3"
          >
            {slots.map(ri => {
              const r = reviews[ri]
              return (
                <article
                  key={ri}
                  className="rounded-xl border border-[#556040]/10 bg-[#EDE4D2] p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F5EFE2] hover:shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    {r.photoUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element -- avatar externo do Google
                      <img
                        src={r.photoUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="size-9 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#556040]/12 text-[11px] font-semibold text-[#556040]">
                        {r.authorName.charAt(0)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[11px] font-medium tracking-[0.14em] text-[#2D2D2D] uppercase">
                        {r.authorName}
                      </p>
                      <p className="mt-0.5 text-[11px] text-[#2D2D2D]/45">
                        {r.relativeTime}
                      </p>
                    </div>
                    <Stars rating={r.rating} tone="green" />
                  </div>
                  <p className="mt-4 line-clamp-3 min-h-[3.9rem] text-[13px] leading-[1.6] text-[#2D2D2D]/70">
                    {r.text}
                  </p>
                </article>
              )
            })}
          </div>

          <div className="mt-7 flex items-center gap-5">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Avaliação anterior"
              className="flex size-9 items-center justify-center rounded-full border border-[#E4DAC2]/40 text-[#E4DAC2] transition-colors hover:border-[#E4DAC2] hover:bg-[#E4DAC2]/10"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima avaliação"
              className="flex size-9 items-center justify-center rounded-full border border-[#E4DAC2]/40 text-[#E4DAC2] transition-colors hover:border-[#E4DAC2] hover:bg-[#E4DAC2]/10"
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="flex gap-1.5">
              {reviews.map((r, i) => (
                <button
                  key={`${r.authorName}-${i}`}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para a avaliação ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'h-1 rounded-full transition-all',
                    i === index ? 'w-6 bg-[#E4DAC2]' : 'w-1.5 bg-white/30'
                  )}
                />
              ))}
            </div>

            {googlePlace.mapsUri && (
              <a
                href={googlePlace.mapsUri}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-[10px] font-medium tracking-[0.18em] text-white/50 uppercase transition-colors hover:text-white/80"
              >
                Ver no Google
              </a>
            )}
          </div>
        </div>

        {/* ── Vídeo ──────────────────────────────────────────────────────── */}
        <div className="relative">
          {/* Moldura deslocada, ecoando o contorno do oval do hero */}
          <div
            aria-hidden
            className="absolute -inset-4 rotate-2 rounded-[1.75rem] border border-[#E4DAC2]/35 sm:-inset-6"
          />

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-[#E4DAC2]/25 bg-[#2A3120] shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?rel=0&modestbranding=1`}
              title="Vídeo de apresentação — Tais Dantas"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 size-full"
            />
          </div>

          <span className="absolute -top-3 left-6 rounded-full bg-[#F4EFE3] px-4 py-1.5 text-[10px] font-semibold tracking-[0.2em] text-[#556040] uppercase shadow-lg">
            Conheça meu trabalho
          </span>
        </div>
      </div>
    </section>
  )
}
