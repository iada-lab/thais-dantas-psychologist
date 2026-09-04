'use client'

import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { formatPostDate } from '@/lib/blog/format'
import { Reveal } from './reveal'
import type { getPublishedPosts } from '@/lib/db/blog-queries'

type Post = Awaited<ReturnType<typeof getPublishedPosts>>['items'][number]

/** Capa do post; cai no monograma se o arquivo não existir mais. */
function Cover({ post }: { post: Post }) {
  const [failed, setFailed] = useState(false)
  const showImage = !!post.coverImageUrl && !failed

  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-[#556040]/10">
      {showImage ? (
        <Image
          src={post.coverImageUrl!}
          alt=""
          fill
          sizes="(max-width: 1024px) 100vw, 480px"
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-[family-name:var(--font-cormorant)] text-5xl font-light text-[#556040]/25">
          TD
        </span>
      )}
    </div>
  )
}

/**
 * Blog na home. Sem artigo publicado, a seção fica no estado "em breve" e não
 * promete pauta nenhuma; com artigo, destaca o mais recente.
 */
export function BlogShowcase({ latestPost }: { latestPost: Post | null }) {
  return (
    <section
      /* Sem `min-h-svh`: a seção passa a ter a altura do conteúdo e some o
         vazio que sobrava entre o cabeçalho dela e o artigo. */
      className={`relative flex flex-col justify-center overflow-hidden bg-[#556040] px-5 py-20 sm:px-10 sm:py-24 ${
        latestPost ? '' : 'min-h-[60vh]'
      }`}
    >
      {/* Areia descendo da seção anterior */}
      <svg
        aria-hidden
        viewBox="0 0 1440 300"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[34%] w-full"
      >
        <defs>
          <linearGradient id="areia-blog" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DCC3A0" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#DCC3A0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#areia-blog)"
          d="M0 0 L1440 0 L1440 140 C 1180 60, 940 200, 690 130 C 460 66, 220 190, 0 120 Z"
        />
      </svg>

      {/* Traços nas bordas, longe do texto */}
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
          d="M-4 10 C 32 22, 64 6, 104 18"
          vectorEffect="non-scaling-stroke"
          opacity="0.25"
        />
        <path
          d="M-4 92 C 28 80, 70 96, 104 84"
          vectorEffect="non-scaling-stroke"
          opacity="0.2"
        />
      </svg>

      {latestPost ? (
        /* ── Com artigo publicado ──────────────────────────────────────── */
        <div className="relative z-10 mx-auto w-full max-w-[1800px]">
          <Reveal>
            <div className="flex items-end justify-between gap-8 border-b border-white/15 pb-6">
              <p className="text-[10px] font-semibold tracking-[0.3em] text-white/45 uppercase">
                Blog &amp; Reflexões
              </p>
              <p className="shrink-0 text-[10px] font-medium tracking-[0.25em] text-white/35 uppercase">
                Último artigo
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-20">
            <Reveal>
              <h2 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.6rem,5.5vw,4.75rem)] leading-[1.04] font-light text-[#F4EFE3]">
                Onde a ciência
                <br />
                <em className="text-[#E2D7BD] italic">encontra o cotidiano.</em>
              </h2>
              <p className="mt-7 max-w-md text-[14px] leading-[1.85] text-white/60">
                Textos sobre saúde mental escritos a partir do que acontece no
                consultório. Sem jargão e sem fórmulas prontas — o que a
                pesquisa mostra, traduzido para a vida de quem lê.
              </p>
              <Link
                href="/blog"
                className="group mt-9 inline-flex items-center gap-3 rounded-full bg-[#222A17] px-7 py-3.5 text-sm font-medium text-[#F4EFE3] transition-colors hover:bg-[#171D0F]"
              >
                Ver todos os artigos
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </Reveal>

            <Reveal delay={150} className="lg:ml-auto lg:max-w-[480px]">
              <Link
                href={`/blog/${latestPost.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-2xl border border-[#556040]/10 bg-[#EDE4D2] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F5EFE2] hover:shadow-xl"
              >
                <Cover post={latestPost} />

                <div className="p-6">
                  {latestPost.categories.length > 0 && (
                    <p className="text-[9px] font-semibold tracking-[0.3em] text-[#556040] uppercase">
                      {latestPost.categories[0].name}
                    </p>
                  )}
                  <h3 className="mt-4 font-[family-name:var(--font-cormorant)] text-[clamp(1.45rem,2.1vw,1.85rem)] leading-[1.15] font-light text-[#2D2D2D]">
                    {latestPost.title}
                  </h3>
                  {latestPost.excerpt && (
                    <p className="mt-3 line-clamp-2 text-[13px] leading-[1.65] text-[#2D2D2D]/65">
                      {latestPost.excerpt}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-2 border-t border-[#556040]/12 pt-4 text-[10px] tracking-[0.12em] text-[#2D2D2D]/45 uppercase">
                    {latestPost.publishedAt && (
                      <>
                        <span>{formatPostDate(latestPost.publishedAt)}</span>
                        <span className="text-[#556040]/25">·</span>
                      </>
                    )}
                    <span>{latestPost.readTimeMinutes} min de leitura</span>
                    <ArrowRight className="ml-auto size-4 text-[#556040] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      ) : (
        /* ── Sem artigo publicado ──────────────────────────────────────── */
        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <p className="text-[10px] font-semibold tracking-[0.3em] text-white/45 uppercase">
            Blog &amp; Reflexões
          </p>

          <div aria-hidden className="mt-7 flex items-center gap-3">
            <span className="h-px w-16 bg-[#E4DAC2]/30 sm:w-24" />
            <span className="size-1 rotate-45 bg-[#E4DAC2]/60" />
            <span className="h-px w-16 bg-[#E4DAC2]/30 sm:w-24" />
          </div>

          <h2 className="mt-8 font-[family-name:var(--font-cormorant)] text-[clamp(2.6rem,5.5vw,4.75rem)] leading-[1.04] font-light text-[#F4EFE3]">
            Onde a ciência
            <br />
            <em className="text-[#E2D7BD] italic">encontra o cotidiano.</em>
          </h2>

          <p className="mt-8 max-w-lg text-[14px] leading-[1.9] text-white/60">
            Este espaço vai reunir textos sobre saúde mental escritos a partir
            do que acontece no consultório. Sem jargão e sem fórmulas prontas —
            o que a pesquisa mostra, traduzido para a vida de quem lê.
          </p>

          <span className="mt-10 rounded-full border border-[#E4DAC2]/40 px-6 py-2.5 text-[10px] font-semibold tracking-[0.25em] text-[#E4DAC2] uppercase">
            Em breve
          </span>
        </div>
      )}
    </section>
  )
}
