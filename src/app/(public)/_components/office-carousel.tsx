'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { OFFICE_PHOTOS } from '../_constants/office-photos'

/**
 * A fita é dobrada de propósito: só as posições -1, 0 e 1 aparecem, e a volta
 * do fim para o começo acontece nas posições escondidas — por isso o giro é
 * contínuo, sem nenhuma foto atravessando a tela para voltar ao lugar.
 */
const SLIDES = [...OFFICE_PHOTOS, ...OFFICE_PHOTOS]
const HALF = SLIDES.length / 2

/**
 * Carrossel do consultório em círculo: a foto do meio vem inteira e nítida, as
 * das laterais menores e desfocadas, e todas caminham sozinhas da direita para
 * a esquerda — as mesmas fotos que orbitam o retrato no hero. As setas e o
 * clique numa lateral adiantam o giro.
 */
export function OfficeCarousel() {
  const [index, setIndex] = useState(0)

  const go = (step: number) =>
    setIndex(i => (i + step + SLIDES.length) % SLIDES.length)

  // Agendado a cada troca (e não num intervalo fixo): quem clica nas setas
  // ganha os 4s inteiros para olhar a foto antes do giro seguir sozinho.
  useEffect(() => {
    const id = setTimeout(() => go(1), 4000)
    return () => clearTimeout(id)
  }, [index])

  return (
    <div className="relative mx-auto mt-10 h-[clamp(330px,52vw,540px)] w-full max-w-[1000px] [--dx:58%] sm:[--dx:72%]">
      {SLIDES.map(({ src, alt }, i) => {
        // Distância assinada até o centro: 0 é a foto principal, ±1 as vizinhas
        // e o resto fica fora de cena, esperando a vez.
        const rel = (i - index + SLIDES.length) % SLIDES.length
        const slot = rel > HALF ? rel - SLIDES.length : rel
        const side = Math.abs(slot)
        const onStage = side <= 1

        return (
          <button
            key={`${src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            tabIndex={onStage ? 0 : -1}
            aria-hidden={!onStage}
            aria-label={`Ver foto do consultório: ${alt}`}
            className="absolute top-1/2 left-1/2 aspect-3/4 h-full w-auto cursor-pointer overflow-hidden rounded-t-full border border-[#556040]/20 shadow-xl transition-[transform,opacity,filter] duration-700 ease-out focus-visible:ring-2 focus-visible:ring-[#556040] focus-visible:outline-none"
            style={{
              transform: `translate(-50%, -50%) translateX(calc(var(--dx) * ${slot})) scale(${side === 0 ? 1 : 0.74})`,
              filter: side === 0 ? 'none' : `blur(${side === 1 ? 3 : 6}px)`,
              opacity: onStage ? (side === 0 ? 1 : 0.55) : 0,
              zIndex: 30 - side * 10,
              pointerEvents: onStage ? 'auto' : 'none',
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 640px) 70vw, 420px"
              className="object-cover"
            />
          </button>
        )
      })}

      <button
        type="button"
        onClick={() => go(-1)}
        aria-label="Foto anterior do consultório"
        className="absolute top-1/2 left-0 z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#556040]/25 bg-[#F5EFE2]/90 text-[#556040] shadow-md backdrop-blur-sm transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#556040] focus-visible:outline-none"
      >
        <ChevronLeft className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => go(1)}
        aria-label="Próxima foto do consultório"
        className="absolute top-1/2 right-0 z-40 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#556040]/25 bg-[#F5EFE2]/90 text-[#556040] shadow-md backdrop-blur-sm transition-colors hover:bg-white focus-visible:ring-2 focus-visible:ring-[#556040] focus-visible:outline-none"
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  )
}
