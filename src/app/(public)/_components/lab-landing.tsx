'use client'

import { ArrowRight, Phone } from 'lucide-react'
import Image from 'next/image'

import type { GooglePlaceData } from '../_constants/google-reviews-fallback'
import type { ContactLinks } from '@/lib/db/contact-queries'
import { BookingLink } from './booking-link'
import { HeroEditorial } from './hero-editorial'
import { ReviewsShowcase } from './reviews-showcase'

export function LabLanding({
  googlePlace,
  contact,
}: {
  googlePlace: GooglePlaceData | null
  contact: ContactLinks
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
          src: '/Transtornos Alimentares.png',
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
          src: '/endometrioze.png',
          alt: 'Endometriose e saúde mental',
          label: 'Endometriose',
          flip: true,
          light: false,
        },
      ].map(({ tag, title, titleEm, body, src, alt, label, flip, light }) => {
        const bg = light ? 'bg-[#B8AEA4]' : 'bg-[#7A9068]'

        const colorSide = (
          <div
            key="color"
            className={`relative flex items-center px-10 py-20 sm:px-16 xl:px-24 ${bg}`}
          >
            <div className="pointer-events-none absolute inset-0 bg-black/20" />
            <div className="relative z-10 flex max-w-[460px] flex-col gap-6">
              <span className="text-[0.57rem] font-light uppercase tracking-[0.3em] text-[#2e2b28] opacity-40">
                {tag}
              </span>
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.4rem,3.8vw,4rem)] font-light leading-[1.06] text-[#2e2b28]">
                {title}
                <br />
                <em className="italic opacity-50">{titleEm}</em>
              </h2>
              <div className="h-px w-8 bg-[#2e2b28] opacity-20" />
              <p className="max-w-[40ch] text-sm leading-[1.9] text-[#2e2b28] opacity-55">
                {body}
              </p>
              <BookingLink
                href={contact.bookingHref}
                external={contact.bookingExternal}
                className="mt-1 inline-flex items-center gap-2 text-[0.59rem] font-light uppercase tracking-[0.24em] text-[#2e2b28] opacity-40 transition-opacity hover:opacity-80"
              >
                Agendar consulta <ArrowRight className="size-3" />
              </BookingLink>
            </div>
          </div>
        )

        const blendColor = light ? '#938B83' : '#627353'

        const imageSide = (
          <div key="image" className="group relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="absolute inset-0 h-full w-full object-cover object-top brightness-90 transition-transform duration-[1100ms] ease-in-out group-hover:scale-105"
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
              className={`absolute bottom-7 z-30 text-[0.58rem] font-extralight uppercase tracking-[0.22em] text-white opacity-50 ${flip ? 'left-6' : 'right-6'}`}
            >
              {label}
            </span>
          </div>
        )

        return (
          <section
            key={title}
            className={`grid min-h-svh overflow-hidden ${flip ? 'grid-cols-[40fr_60fr]' : 'grid-cols-[60fr_40fr]'}`}
          >
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
      })}

      {/* ── CONTENT SECTIONS ─────────────────────────────────────────────── */}
      <div className="bg-white">
        {/* ── BLOG ─────────────────────────────────────────────────────────── */}
        <section className="flex min-h-[90vh] flex-col bg-[#556040] px-6 py-16 sm:px-10">
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
            <div className="flex items-center justify-between border-b border-white/15 pb-5">
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/50">
                Blog & Reflexões
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                Em breve
              </span>
            </div>
            <div className="py-12">
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(3.2rem,7vw,6.5rem)] font-light leading-[1.02] text-white">
                Onde a ciência
                <br />
                <em className="italic text-white/45">encontra o cotidiano.</em>
              </h2>
              <p className="mt-6 max-w-md text-[13px] leading-relaxed text-white/50">
                Artigos sobre saúde mental, alimentação emocional e bem-estar —
                escritos para quem quer entender mais sobre si mesmo.
              </p>
            </div>
            <div className="mt-auto grid flex-1 grid-cols-1 gap-px border-t border-white/15 sm:grid-cols-[2fr_1fr_1fr]">
              <article className="group flex cursor-default flex-col justify-between py-8 sm:pr-10">
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
                    Saúde Mental
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-[clamp(1.5rem,2.8vw,2.2rem)] font-light leading-[1.1] text-white transition-opacity group-hover:opacity-70">
                    Comer emocional: por que comemos quando não estamos com
                    fome?
                  </h3>
                  <p className="mt-4 text-[12px] leading-relaxed text-white/45">
                    Entender a relação entre emoções e alimentação é o primeiro
                    passo para transformar padrões que parecem impossíveis de
                    mudar.
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="text-[10px] text-white/35">
                    8 min de leitura
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="text-[10px] text-white/35">Em breve</span>
                </div>
              </article>
              <article className="group flex cursor-default flex-col justify-between py-8 sm:border-l sm:border-white/15 sm:px-8">
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
                    TCC
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-xl font-light leading-[1.15] text-white transition-opacity group-hover:opacity-70">
                    Como nossos pensamentos moldam o que comemos
                  </h3>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="text-[10px] text-white/35">5 min</span>
                </div>
              </article>
              <article className="group flex cursor-default flex-col justify-between py-8 sm:border-l sm:border-white/15 sm:px-8">
                <div>
                  <span className="text-[9px] font-semibold uppercase tracking-[0.3em] text-white/35">
                    Endometriose
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-xl font-light leading-[1.15] text-white transition-opacity group-hover:opacity-70">
                    Dor invisível: saúde mental e endometriose
                  </h3>
                </div>
                <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="text-[10px] text-white/35">6 min</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section
          id="sobre"
          className="scroll-mt-20 border-t border-[#556040]/30 px-6 py-14 sm:px-10"
        >
          <div className="mx-auto max-w-3xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#556040]">
              Sobre
            </span>
            <p className="mt-5 text-sm leading-relaxed text-[#2D2D2D]/90 sm:text-base sm:leading-relaxed">
              Sou Tais Dantas, psicóloga dedicada a oferecer um ambiente seguro
              e acolhedor. Cada encontro é conduzido com escuta qualificada,
              respeito ao seu ritmo e foco no que faz sentido para você. O
              processo terapêutico pode ajudar a compreender padrões emocionais,
              desenvolver recursos internos e construir relações mais saudáveis
              consigo e com os outros — sempre com confidencialidade e cuidado.
            </p>
          </div>
        </section>

        <section
          id="especialidades"
          className="scroll-mt-20 border-t border-[#556040]/30 px-6 py-14 sm:px-10"
        >
          <div className="mx-auto flex max-w-5xl items-center gap-10 sm:gap-14">
            <div className="relative hidden aspect-square w-52 shrink-0 self-center overflow-hidden rounded-full sm:block">
              <Image
                src="/tais-dantas.png"
                alt="Tais Dantas"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="hidden h-full w-px shrink-0 self-stretch bg-[#556040]/15 sm:block" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#556040]">
                Especialidades
              </span>
              <div className="mt-10 grid grid-cols-1 gap-px sm:grid-cols-[1fr_1px_1fr]">
                <div className="flex flex-col">
                  <span className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#556040]/50">
                    Saúde & Corpo
                  </span>
                  {[
                    'Obesidade',
                    'Emagrecimento',
                    'Cirurgia Bariátrica',
                    'Endometriose',
                  ].map(t => (
                    <p
                      key={t}
                      className="border-t border-[#556040]/15 py-2.5 text-sm text-[#2D2D2D]/80"
                    >
                      {t}
                    </p>
                  ))}
                </div>
                <div className="hidden bg-[#556040]/15 sm:block" />
                <div className="mt-12 flex flex-col sm:mt-0 sm:pl-16">
                  <span className="mb-6 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#556040]/50">
                    Abordagem
                  </span>
                  {[
                    'Transtornos Alimentares',
                    'Terapia Cognitiva Comportamental',
                  ].map(t => (
                    <p
                      key={t}
                      className="border-t border-[#556040]/15 py-2.5 text-sm text-[#2D2D2D]/80"
                    >
                      {t}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────────── */}
        <section className="border-t border-[#556040]/20 px-6 py-10 sm:px-10">
          <div className="mx-auto flex max-w-5xl items-center gap-8">
            {/* Map + Address */}
            <div className="flex flex-1 items-center gap-6">
              <div className="h-32 w-48 shrink-0 overflow-hidden rounded-sm">
                <iframe
                  src="https://maps.google.com/maps?q=-16.71971902331966,-49.2668878132625&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do consultório"
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#556040]">
                  Localização
                </p>
                <p className="mt-1 text-sm font-medium text-[#2D2D2D]">
                  Av. T-4, 1478
                </p>
                <p className="text-sm text-[#2D2D2D]/60">Sala 172-B</p>
                <p className="text-sm text-[#2D2D2D]/60">Setor Bueno</p>
                <p className="text-sm text-[#2D2D2D]/60">
                  Goiânia – GO · 74230-030
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-28 w-px shrink-0 bg-[#556040]/15" />

            {/* Info */}
            <div className="flex flex-1 flex-col gap-1.5">
              <p className="text-base font-medium text-[#2D2D2D]">
                Tais Dantas
              </p>
              <p className="text-sm text-[#2D2D2D]/55">Psicóloga — CRP 09/</p>
              <p className="text-sm text-[#2D2D2D]/55">
                Especialista em Saúde Alimentar
              </p>
              <div className="mt-1 flex flex-col gap-1">
                {contact.phone && (
                  <a
                    href={contact.phone.href}
                    className="inline-flex items-center gap-1.5 text-sm text-[#556040] hover:opacity-75 transition-opacity"
                  >
                    <Phone className="size-3.5" strokeWidth={1.5} />
                    {contact.phone.value}
                  </a>
                )}
                {contact.whatsapp && (
                  <a
                    href={contact.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-[#556040] hover:opacity-75 transition-opacity"
                  >
                    <svg
                      className="size-3.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L0 24l6.338-1.499A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.184-1.357l-.372-.22-3.862.913.978-3.768-.242-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    WhatsApp
                  </a>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-28 w-px shrink-0 bg-[#556040]/15" />

            {/* Consultas */}
            <div
              id="consultas"
              className="flex flex-1 flex-col gap-4 scroll-mt-20"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#556040]">
                Consultas
              </p>
              <p className="text-sm leading-relaxed text-[#2D2D2D]/70">
                Atendimentos online ou presenciais, com horários combinados
                previamente.
              </p>
              <BookingLink
                href={contact.bookingHref}
                external={contact.bookingExternal}
                className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#556040] px-5 py-2.5 text-sm font-medium text-[#3A4424] transition-colors hover:bg-[#556040]/10"
              >
                Agendar uma consulta
                <ArrowRight className="size-3.5" strokeWidth={2} />
              </BookingLink>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
