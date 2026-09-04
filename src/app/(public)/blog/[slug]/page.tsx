import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, Eye } from 'lucide-react'

import { SiteNav } from '../../_components/site-nav'
import { getContactLinks } from '@/lib/db/contact-queries'
import { getPublishedPostBySlug } from '@/lib/db/blog-queries'
import { formatPostDate } from '@/lib/blog/format'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPublishedPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const [post, contact] = await Promise.all([
    getPublishedPostBySlug(slug),
    getContactLinks(),
  ])
  if (!post) notFound()

  return (
    <div className="text-[#2D2D2D]">
      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="flex flex-col bg-[#556040]">
        <SiteNav contact={contact} />

        <div className="mx-auto w-full max-w-3xl px-5 sm:px-10">
          <Link
            href="/blog"
            className="flex w-fit items-center gap-1.5 text-[12px] text-white/50 transition-colors hover:text-white/80"
          >
            <ArrowLeft size={13} /> Blog
          </Link>
          <h1 className="mt-6 font-[family-name:var(--font-cormorant)] text-[clamp(2rem,6vw,3.5rem)] font-light leading-[1.05] text-white">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-3 text-[15px] leading-relaxed text-white/55 sm:text-base">
              {post.subtitle}
            </p>
          )}
          {post.categories.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 sm:justify-end">
              {post.categories.map(c => (
                <span
                  key={c.id}
                  className="inline-block rounded-full bg-white/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.22em] text-white"
                >
                  {c.name}
                </span>
              ))}
            </div>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/15 pb-8 pt-5">
            <span className="text-[11px] text-white/40">
              {post.publishedAt ? formatPostDate(post.publishedAt) : ''}
            </span>
            <Clock className="size-3 text-white/25" strokeWidth={1.5} />
            <span className="text-[11px] text-white/40">
              {post.readTimeMinutes} min
            </span>
            <Eye className="size-3 text-white/25" strokeWidth={1.5} />
            <span className="text-[11px] text-white/40">
              {post.views.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      </section>

      {/* ── COVER ───────────────────────────────────────────────────────── */}
      {post.coverImageUrl && (
        <div className="mx-auto -mt-6 max-w-4xl px-5 sm:-mt-10 sm:px-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="aspect-[16/9] w-full rounded-2xl object-cover shadow-lg"
          />
        </div>
      )}

      {/* ── BODY ────────────────────────────────────────────────────────── */}
      <div className="bg-white px-5 py-12 sm:px-10">
        <div
          className="article-body prose sm:prose-lg mx-auto max-w-3xl prose-headings:font-[family-name:var(--font-cormorant)] prose-headings:font-light prose-a:text-[#556040]"
          dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
        />
      </div>
    </div>
  )
}
