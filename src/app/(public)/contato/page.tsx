import type { Metadata } from 'next'
import { Suspense } from 'react'

import { SiteNav } from '../_components/site-nav'
import { getContactLinks } from '@/lib/db/contact-queries'
import { ContatoSection } from './_components/contato-section'
import { ContatoSkeleton } from './_components/contato-skeleton'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Contato | Tais Dantas',
  description: 'Entre em contato com Tais Dantas.',
}

export default async function ContatoPage() {
  const contact = await getContactLinks()

  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-[#556040]">
      {/* Areia no rodapé, fechando a página como nas seções da home */}
      <svg
        aria-hidden
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[32%] w-full"
      >
        <defs>
          <linearGradient id="areia-contato" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#DCC3A0" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#DCC3A0" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          fill="url(#areia-contato)"
          d="M0 170 C 250 100, 480 230, 720 175 C 960 120, 1200 215, 1440 155 L1440 320 L0 320 Z"
        />
      </svg>

      {/* Traços curvos nas bordas */}
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
          d="M-4 14 C 30 24, 66 8, 104 20"
          vectorEffect="non-scaling-stroke"
          opacity="0.22"
        />
        <path
          d="M-4 90 C 32 80, 68 96, 104 84"
          vectorEffect="non-scaling-stroke"
          opacity="0.18"
        />
      </svg>

      <SiteNav contact={contact} />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-16 sm:px-10">
        <Suspense fallback={<ContatoSkeleton />}>
          <ContatoSection />
        </Suspense>
      </div>
    </div>
  )
}
