'use client'

import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { OFFICE_PHOTOS } from '../_constants/office-photos'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

/** Posição de cada arco em volta do retrato, na ordem de OFFICE_PHOTOS. */
const ARCS = [
  'left-[66%] top-[-14%] h-[30%] w-[21%] rotate-[-6deg]',
  'left-[76%] top-[22%] h-[34%] w-[23%]',
  'left-[66%] top-[66%] h-[28%] w-[20%] rotate-[6deg]',
] as const

/**
 * Arcos do consultório orbitando o retrato. Cada arco cresce no hover e abre
 * um carrossel com todas as fotos, já posicionado na que foi clicada.
 */
export function OfficeGallery() {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const go = (step: number) =>
    setIndex(i => (i + step + OFFICE_PHOTOS.length) % OFFICE_PHOTOS.length)

  return (
    <>
      {OFFICE_PHOTOS.map(({ src, alt }, i) => (
        <button
          key={src}
          type="button"
          onClick={() => {
            setIndex(i)
            setOpen(true)
          }}
          aria-label={`Ampliar foto do consultório: ${alt}`}
          className={cn(
            'absolute overflow-hidden rounded-t-full border border-[#E4DAC2]/35 shadow-lg',
            'cursor-pointer transition-transform duration-300 ease-out',
            'hover:z-10 hover:scale-110 focus-visible:z-10 focus-visible:scale-110',
            'focus-visible:ring-2 focus-visible:ring-[#F4EFE3] focus-visible:outline-none',
            ARCS[i]
          )}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1024px) 26vw, 220px"
            className="object-cover"
          />
        </button>
      ))}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton={false}
          onKeyDown={e => {
            if (e.key === 'ArrowLeft') go(-1)
            if (e.key === 'ArrowRight') go(1)
          }}
          className="w-auto max-w-none border-none bg-transparent p-0 shadow-none sm:max-w-none"
        >
          <DialogHeader className="sr-only">
            <DialogTitle>Fotos do consultório</DialogTitle>
          </DialogHeader>

          {/* Retrato 3:4, mesma proporção dos arquivos — nada é cortado. */}
          <div className="relative mx-auto aspect-3/4 w-[min(86vw,56vh)]">
            {OFFICE_PHOTOS.map(({ src, alt }, i) => (
              <Image
                key={src}
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 86vw, 42vh"
                className={cn(
                  'rounded-2xl object-cover transition-opacity duration-500',
                  i === index ? 'opacity-100' : 'opacity-0'
                )}
              />
            ))}

            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:-left-16"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Próxima foto"
              className="absolute top-1/2 right-2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30 sm:-right-16"
            >
              <ChevronRight className="size-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2 rounded-full bg-black/25 px-3 py-2 backdrop-blur-sm">
              {OFFICE_PHOTOS.map(({ src }, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Ir para a foto ${i + 1}`}
                  aria-current={i === index}
                  className={cn(
                    'size-1.5 rounded-full transition-colors',
                    i === index ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                  )}
                />
              ))}
            </div>

            <DialogClose
              aria-label="Fechar"
              className="absolute -top-4 -right-4 flex size-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            >
              <X className="size-4" />
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
