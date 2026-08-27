'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import type { GooglePlaceData } from '../_constants/google-reviews-fallback'
import type { getPublishedPosts } from '@/lib/db/blog-queries'
import type { ContactLinks } from '@/lib/db/contact-queries'
import { BookingLink } from './booking-link'
import { AboutShowcase } from './about-showcase'
import { BlogShowcase } from './blog-showcase'
import { ContactShowcase } from './contact-showcase'
import { HeroEditorial } from './hero-editorial'
import { ReviewsShowcase } from './reviews-showcase'

type LatestPost = Awaited<ReturnType<typeof getPublishedPosts>>['items'][number]

export function LabLanding({
  googlePlace,
  contact,
  latestPost,
}: {
  googlePlace: GooglePlaceData | null
  contact: ContactLinks
  latestPost: LatestPost | null
}) {
  return (
    <div className="text-[#2D2D2D]">
      <HeroEditorial contact={contact} />

      {googlePlace && googlePlace.reviews.length > 0 && (
        <ReviewsShowcase googlePlace={googlePlace} />
      )}

      {/* ── SPECIALTY SECTIONS ───────────────────────────────────────────── */}
      {[
        {
          tag: 'Especialidade',
          title: 'Obesidade',
          titleEm: '& Corpo',
          body: 'A obesidade vai além do aspecto físico — ela é moldada por gatilhos emocionais, padrões comportamentais e pela história de cada pessoa. O acompanhamento psicológico cria um espaço seguro para identificar esses padrões, trabalhar a relação com a comida e o próprio corpo, e construir mudanças duradouras sem julgamento.',
          src: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=900&q=80',
          alt: 'Reflexão e autocuidado',
          label: 'Obesidade',
          flip: false,
          light: true,
        },
        {
          tag: 'Especialidade',
          title: 'Emagrecimento',
          titleEm: 'consciente',
          body: 'Emagrecer de forma sustentável começa na mente. Mais do que controlar o peso, o processo envolve compreender o que leva ao comer emocional, romper ciclos de culpa e restrição, e cultivar uma relação mais leve com a alimentação. A psicoterapia oferece as ferramentas para que essa transformação venha de dentro.',
          src: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=900&q=80',
          alt: 'Equilíbrio alimentar',
          label: 'Emagrecimento',
          flip: true,
          light: false,
        },
        {
          tag: 'Especialidade',
          title: 'Transtornos',
          titleEm: 'Alimentares',
          body: 'Anorexia, bulimia, compulsão alimentar e outros transtornos carregam sofrimentos que vão muito além da mesa. O tratamento psicológico é peça central nesse caminho — ajudando a ressignificar a relação com o corpo, a comida e a autoimagem, com escuta acolhedora e abordagem baseada em evidências.',
          src: '/transtornos-alimentares.png',
          alt: 'Transtornos Alimentares',
          label: 'Transtornos Alimentares',
          flip: false,
          light: true,
        },
        {
          tag: 'Especialidade',
          title: 'Cirurgia',
          titleEm: 'Bariátrica',
          body: 'A cirurgia bariátrica transforma o corpo, mas a mente precisa acompanhar essa mudança. O suporte psicológico — antes e depois do procedimento — é fundamental para avaliar a prontidão emocional, prevenir transtornos no pós-operatório e garantir que os resultados sejam mantidos a longo prazo.',
          src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80',
          alt: 'Cuidado e preparo',
          label: 'Cirurgia Bariátrica',
          flip: true,
          light: false,
        },
        {
          tag: 'Abordagem',
          title: 'Terapia Cognitiva',
          titleEm: 'Comportamental',
          body: 'A TCC é uma das abordagens mais bem estudadas da psicologia. Ela parte da compreensão de que nossos pensamentos influenciam diretamente nossas emoções e comportamentos — e que é possível mudá-los. Com técnicas práticas e foco nos objetivos de cada pessoa, a TCC oferece resultados concretos e duradouros.',
          src: '/TCC.png',
          alt: 'Terapia Cognitiva Comportamental',
          label: 'TCC',
          flip: false,
          light: true,
        },
        {
          tag: 'Experiência Clínica',
          title: 'Endometriose',
          titleEm: '& Saúde Mental',
          body: 'Viver com endometriose é carregar uma dor que muitas vezes não é vista. A dor crônica, o longo caminho até o diagnóstico e os impactos na fertilidade e na vida social geram ansiedade, depressão e isolamento. O acompanhamento psicológico oferece um espaço de escuta real — para que a mulher seja cuidada em todas as dimensões.',
          src: '/endometriose.png',
          alt: 'Endometriose e saúde mental',
          label: 'Endometriose',
          flip: true,
          light: false,
        },
      ].map(
        (
          { tag, title, titleEm, body, src, alt, label, flip, light },
          i,
          all
        ) => {
          const bg = light ? 'bg-[#B8AEA4]' : 'bg-[#7A9068]'
          // Tinta sólida: a opacidade anterior derrubava o contraste a 2,2:1.
          const ink = light ? '#2E2B28' : '#1A1F12'
          // A onda de topo copia a cor do que está acima — é o que faz a
          // emenda sumir, como acontece no primeiro painel.
          const prevBg =
            i === 0 ? '#556040' : all[i - 1].light ? '#B8AEA4' : '#7A9068'

          const colorSide = (
            <div
              key="color"
              className={`relative flex items-center px-10 py-20 sm:px-16 xl:px-24 ${bg}`}
            >
              <div className="relative z-10 flex max-w-[460px] flex-col gap-6">
                <span
                  className="text-[11px] font-semibold uppercase tracking-[0.25em]"
                  style={{ color: ink, opacity: 0.75 }}
                >
                  {tag}
                </span>
                <h2
                  className="font-[family-name:var(--font-cormorant)] text-[clamp(2.6rem,4.2vw,4.4rem)] font-light leading-[1.06]"
                  style={{ color: ink }}
                >
                  {title}
                  <br />
                  <em className="italic opacity-65">{titleEm}</em>
                </h2>
                <div
                  className="h-px w-10"
                  style={{ backgroundColor: ink, opacity: 0.35 }}
                />
                <p
                  className="max-w-[42ch] text-[15px] leading-[1.85]"
                  style={{ color: ink, opacity: 0.85 }}
                >
                  {body}
                </p>
                <BookingLink
                  href={contact.bookingHref}
                  external={contact.bookingExternal}
                  className="mt-1 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-opacity hover:opacity-100"
                  style={{ color: ink, opacity: 0.8 }}
                >
                  Agendar consulta <ArrowRight className="size-3" />
                </BookingLink>
              </div>
            </div>
          )

          const blendColor = light ? '#B8AEA4' : '#7A9068'

          const imageSide = (
            <div key="image" className="group relative overflow-hidden">
              <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 1024px) 60vw, 55vw"
                className="object-cover object-top brightness-90 transition-transform duration-[1100ms] ease-in-out group-hover:scale-105"
              />
              {/* Dark overlay — same level as colorSide */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-black/20" />
              {/* Blend into solid color — above dark overlay */}
              <div
                className={`pointer-events-none absolute top-0 z-20 h-full w-[55%] ${flip ? 'right-0' : 'left-0'}`}
                style={{
                  background: flip
                    ? `linear-gradient(to left, ${blendColor}, transparent)`
                    : `linear-gradient(to right, ${blendColor}, transparent)`,
                }}
              />
              {/* Shadow on screen edge — above dark overlay */}
              <div
                className={`pointer-events-none absolute top-0 z-20 h-full w-[20%] ${flip ? 'left-0' : 'right-0'}`}
                style={{
                  background: flip
                    ? 'linear-gradient(to right, rgba(0,0,0,0.35), transparent)'
                    : 'linear-gradient(to left, rgba(0,0,0,0.35), transparent)',
                }}
              />
              <span
                className={`absolute bottom-7 z-30 text-[11px] font-medium uppercase tracking-[0.22em] text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.55)] ${flip ? 'left-6' : 'right-6'}`}
              >
                {label}
              </span>
            </div>
          )

          return (
            <section
              key={title}
              className={`relative grid min-h-svh ${flip ? 'grid-cols-[40fr_60fr]' : 'grid-cols-[60fr_40fr]'}`}
            >
              {/* Onda do topo na própria cor: encontra a onda de rodapé do
                  painel anterior, pintada nesta mesma cor, e as duas viram
                  uma faixa só — escondendo o corte reto sobre a foto. */}
              <svg
                aria-hidden
                viewBox="0 0 1440 220"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-x-0 top-0 z-40 h-28 w-full -translate-y-1/2 sm:h-40 lg:h-48"
              >
                <path
                  fill={prevBg}
                  d="M0 40 C 250 -6, 500 96, 730 44 C 950 -4, 1200 92, 1440 34 L1440 168 C 1210 226, 950 128, 700 182 C 470 232, 230 130, 0 176 Z"
                />
              </svg>
              {i === all.length - 1 && (
                <svg
                  aria-hidden
                  viewBox="0 0 1440 220"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-16 w-full sm:h-24 lg:h-28"
                >
                  <path
                    fill="#556040"
                    d="M0 128 C 250 26, 500 196, 730 108 C 950 28, 1200 192, 1440 66 L1440 220 L0 220 Z"
                  />
                </svg>
              )}
              {flip ? (
                <>
                  {imageSide}
                  {colorSide}
                </>
              ) : (
                <>
                  {colorSide}
                  {imageSide}
                </>
              )}
            </section>
          )
        }
      )}

      {/* ── CONTENT SECTIONS ─────────────────────────────────────────────── */}
      <div className="bg-white">
        <BlogShowcase latestPost={latestPost} />

        <AboutShowcase />

        <ContactShowcase contact={contact} />
      </div>
    </div>
  )
}
