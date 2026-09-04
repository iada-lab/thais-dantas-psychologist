'use client'

import { useEffect, useRef } from 'react'

import { cn } from '@/lib/utils'

/**
 * Entrada suave quando o bloco chega na tela. O estado vive num data-attribute
 * em vez de em `useState`: é só uma classe CSS, não precisa de re-render. Sem
 * suporte a IntersectionObserver — ou com "reduzir movimento" ligado — o
 * conteúdo aparece direto, nunca fica escondido.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mostrar = () => el.setAttribute('data-shown', 'true')

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      mostrar()
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        mostrar()
        io.disconnect()
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        'translate-y-8 opacity-0 transition-[opacity,transform] duration-[900ms] ease-out',
        'data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100',
        className
      )}
    >
      {children}
    </div>
  )
}
