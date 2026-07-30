'use client'

import { ArrowLeft, ArrowRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

type CarouselApi = { scrollNext: () => void; scrollPrev: () => void }

type CarouselContextProps = {
  index: number
  count: number
  setCount: (count: number) => void
  animated: boolean
  loop: boolean
  scrollPrev: () => void
  scrollNext: () => void
  onTransitionEnd: (event: React.TransitionEvent<HTMLDivElement>) => void
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const ctx = React.useContext(CarouselContext)
  if (!ctx) throw new Error('useCarousel must be used within <Carousel />')
  return ctx
}

type CarouselProps = {
  opts?: { loop?: boolean }
  setApi?: (api: CarouselApi) => void
  className?: string
  children: React.ReactNode
}

/**
 * Carrossel por passos. Com `opts.loop`, a fita de slides é duplicada em
 * <CarouselContent>: o primeiro card já aparece na sequência do último (em vez
 * de sobrar espaço vazio no fim) e, quando o índice alcança a cópia, ele volta
 * ao original sem transição — o giro fica contínuo, sem salto visível.
 */
function Carousel({ opts, setApi, className, children }: CarouselProps) {
  const [index, setIndex] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [animated, setAnimated] = React.useState(true)
  const [pendingPrev, setPendingPrev] = React.useState(false)
  const loop = opts?.loop ?? false

  // Espelham index/count para manter scrollNext/scrollPrev estáveis — assim o
  // autoplay de quem consome a api não é reiniciado a cada slide.
  const indexRef = React.useRef(0)
  const countRef = React.useRef(0)

  React.useEffect(() => {
    indexRef.current = index
  }, [index])

  React.useEffect(() => {
    countRef.current = count
  }, [count])

  /** Reposiciona sem animar; a transição volta no frame seguinte. */
  const jumpTo = React.useCallback((next: number) => {
    setAnimated(false)
    setIndex(next)
  }, [])

  React.useEffect(() => {
    if (animated) return
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => setAnimated(true))
    )
    return () => cancelAnimationFrame(id)
  }, [animated])

  // Chegou na cópia: volta ao original assim que a transição termina.
  const onTransitionEnd = React.useCallback(
    (event: React.TransitionEvent<HTMLDivElement>) => {
      if (!loop) return
      // Os cards têm transições próprias (hover) que sobem até aqui — só o
      // deslize da fita deve reposicionar o índice.
      if (event.target !== event.currentTarget) return

      const total = countRef.current
      if (total > 0 && indexRef.current >= total) {
        jumpTo(indexRef.current - total)
      }
    },
    [loop, jumpTo]
  )

  // Rede de segurança para quando a transição não dispara (aba em segundo
  // plano, prefers-reduced-motion): normaliza o índice que passou da cópia.
  React.useEffect(() => {
    if (loop && count > 0 && index > count) jumpTo(index - count)
  }, [loop, count, index, jumpTo])

  const scrollNext = React.useCallback(() => {
    setIndex(i =>
      loop ? i + 1 : Math.min(i + 1, Math.max(0, countRef.current - 1))
    )
  }, [loop])

  const scrollPrev = React.useCallback(() => {
    if (indexRef.current > 0) {
      setIndex(i => i - 1)
      return
    }
    if (!loop || countRef.current === 0) return
    // No primeiro card: salta para a cópia equivalente (fim da fita) e anima um
    // passo para trás a partir dela, revelando o último card.
    jumpTo(countRef.current)
    setPendingPrev(true)
  }, [loop, jumpTo])

  React.useEffect(() => {
    if (!pendingPrev || !animated) return
    setPendingPrev(false)
    setIndex(i => i - 1)
  }, [pendingPrev, animated])

  React.useEffect(() => {
    setApi?.({ scrollNext, scrollPrev })
  }, [setApi, scrollNext, scrollPrev])

  return (
    <CarouselContext.Provider
      value={{
        index,
        count,
        setCount,
        animated,
        loop,
        scrollPrev,
        scrollNext,
        onTransitionEnd,
      }}
    >
      <div
        className={cn('relative px-14', className)}
        role="region"
        aria-roledescription="carousel"
      >
        {children}
      </div>
    </CarouselContext.Provider>
  )
}

function CarouselContent({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const { index, setCount, animated, loop, onTransitionEnd } = useCarousel()
  const items = React.Children.toArray(children)

  React.useEffect(() => {
    setCount(items.length)
  }, [items.length, setCount])

  // A cópia da fita é o que emenda o fim no começo: em qualquer posição há
  // sempre cards à direita, então nunca sobra espaço vazio.
  const slides =
    loop && items.length > 0
      ? [
          ...items,
          ...items.map((item, i) =>
            React.isValidElement(item)
              ? React.cloneElement(item, { key: `carousel-clone-${i}` })
              : item
          ),
        ]
      : items

  return (
    /*
     * overflow-x: clip  →  clips horizontally WITHOUT creating a scroll context,
     *                       so overflow-y stays visible → scale is never clipped vertically.
     * py-8 / -my-8      →  creates vertical breathing room for the scale effect.
     */
    <div className="-my-8 py-8 -mx-4 px-4" style={{ overflowX: 'clip' }}>
      <div
        className={cn(
          'flex',
          animated && 'transition-transform duration-500 ease-in-out',
          className
        )}
        style={{
          transform: `translateX(calc(${-index} * var(--slide-w, 0px)))`,
        }}
        onTransitionEnd={onTransitionEnd}
      >
        {slides}
      </div>
    </div>
  )
}

function CarouselItem({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      el.parentElement?.style.setProperty('--slide-w', `${el.offsetWidth}px`)
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn('min-w-0 shrink-0', className)}
    >
      {children}
    </div>
  )
}

function CarouselPrevious({ className }: { className?: string }) {
  const { scrollPrev } = useCarousel()
  return (
    <button
      onClick={scrollPrev}
      aria-label="Slide anterior"
      className={cn(
        'absolute left-0 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border bg-white shadow-sm transition-colors hover:bg-gray-50',
        className
      )}
    >
      <ArrowLeft className="size-4" />
    </button>
  )
}

function CarouselNext({ className }: { className?: string }) {
  const { scrollNext } = useCarousel()
  return (
    <button
      onClick={scrollNext}
      aria-label="Próximo slide"
      className={cn(
        'absolute right-0 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full border bg-white shadow-sm transition-colors hover:bg-gray-50',
        className
      )}
    >
      <ArrowRight className="size-4" />
    </button>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
}
