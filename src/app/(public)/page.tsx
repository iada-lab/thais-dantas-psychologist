import type { Metadata } from 'next'

import { LabLanding } from './_components/lab-landing'
import { GOOGLE_REVIEWS_FALLBACK } from './_constants/google-reviews-fallback'
import { getPublishedPosts } from '@/lib/db/blog-queries'
import { getContactLinks } from '@/lib/db/contact-queries'

// Os contatos vêm do banco (cache com tag 'contato'), então a página não pode
// ser pré-renderizada no build — o banco só existe em runtime.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Tais Dantas | Psicóloga',
  description: 'Atendimento psicológico com Tais Dantas.',
}

export default async function Home() {
  const [contact, latest] = await Promise.all([
    getContactLinks(),
    getPublishedPosts({ perPage: 1 }),
  ])

  return (
    <LabLanding
      googlePlace={GOOGLE_REVIEWS_FALLBACK}
      contact={contact}
      latestPost={latest.items[0] ?? null}
    />
  )
}
