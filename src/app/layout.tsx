import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Inter, Cinzel } from 'next/font/google'

import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BETTER_AUTH_URL ?? 'http://localhost:3000'),
  title: {
    default: 'Tais Dantas',
    template: '%s | Tais Dantas',
  },
  description: 'Psicóloga Tais Dantas — atendimento psicológico.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
}

/**
 * `only light` também como meta tag: o Android decide se vai aplicar o Auto
 * Dark Theme antes do CSS carregar, e a meta no `<head>` chega primeiro.
 * Mesma declaração que existe em `globals.css`.
 */
export const viewport: Viewport = {
  colorScheme: 'only light',
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
})

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  weight: ['400', '700', '900'],
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400'],
  style: ['normal', 'italic'],
})

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${cinzel.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
