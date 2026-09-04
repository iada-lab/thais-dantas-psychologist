import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

/**
 * CTA de agendamento. Aponta para o WhatsApp cadastrado no gestor (link
 * externo) ou, quando não houver número cadastrado, para a página /contato.
 */
export function BookingLink({
  href,
  external,
  className,
  style,
  children,
}: {
  href: string
  external: boolean
  className?: string
  style?: CSSProperties
  children: ReactNode
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  )
}
