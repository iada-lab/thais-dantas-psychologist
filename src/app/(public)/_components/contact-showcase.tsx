import { ArrowRight, MapPin, Phone } from 'lucide-react'

import type { ContactLinks } from '@/lib/db/contact-queries'
import { BookingLink } from './booking-link'
import { MapIframe } from './map-iframe'
import { Reveal } from './reveal'

/**
 * Contato e localização em areia — a mesma cor do "sobre". Fechar a página na
 * cor clara separa o contato do verde do blog logo acima, em vez de os dois
 * virarem um bloco verde só.
 */
export function ContactShowcase({ contact }: { contact: ContactLinks }) {
  const { address } = contact

  const localityLine = [address.neighborhood, address.cityState]
    .filter(Boolean)
    .join(' · ')
  const hasAddress = !!(address.line || localityLine || address.postalCode)

  return (
    <section className="relative overflow-hidden bg-[#EDE4D2] px-5 pt-28 pb-20 sm:px-10 sm:pt-32">
      {/* Verde do blog descendo, emendando as duas seções */}
      <svg
        aria-hidden
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-20 w-full sm:h-28"
      >
        <path
          fill="#556040"
          d="M0 0 L1440 0 L1440 96 C 1180 172, 940 44, 690 112 C 460 174, 220 60, 0 128 Z"
        />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-[1800px]">
        <Reveal>
          <div className="flex items-end justify-between gap-8 border-b border-[#556040]/20 pb-6">
            <p className="text-[10px] font-semibold tracking-[0.3em] text-[#556040] uppercase">
              Contato
            </p>
            {address.cityState && (
              <p className="shrink-0 text-[10px] font-medium tracking-[0.25em] text-[#556040]/55 uppercase">
                {address.cityState}
              </p>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr] lg:gap-16">
          {/* ── Mapa e endereço ─────────────────────────────────────────── */}
          <Reveal>
            {contact.mapUrl.trim() && (
              <div className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#556040]/15 shadow-sm transition-shadow duration-300 hover:shadow-xl">
                {/* O wrapper já é `relative aspect-[16/10]`; h-full preenche. */}
                <MapIframe src={contact.mapUrl} className="h-full" />
              </div>
            )}
            {hasAddress && (
              <div className="mt-6 flex gap-3">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-[#556040]"
                  strokeWidth={1.5}
                />
                <address className="text-[14px] leading-[1.8] text-[#2D2D2D]/70 not-italic">
                  {address.line && (
                    <span className="block font-medium text-[#2D2D2D]">
                      {address.line}
                    </span>
                  )}
                  {localityLine}
                  {localityLine && address.postalCode && <br />}
                  {address.postalCode && `CEP ${address.postalCode}`}
                </address>
              </div>
            )}
          </Reveal>

          {/* ── Identidade e canais ─────────────────────────────────────── */}
          <Reveal delay={120}>
            <div className="lg:border-l lg:border-[#556040]/15 lg:pl-16">
              <h2 className="font-[family-name:var(--font-cormorant)] text-[2.5rem] leading-none font-light text-[#2D2D2D]">
                Tais Dantas
              </h2>
              <p className="mt-3 text-[11px] font-medium tracking-[0.18em] text-[#556040] uppercase">
                Psicóloga — CRP 09/
              </p>
              <p className="mt-1.5 text-[13px] text-[#2D2D2D]/60">
                Especialista em Saúde Alimentar
              </p>

              <div className="mt-8 flex flex-col items-start gap-3">
                {contact.phone && (
                  <a
                    href={contact.phone.href}
                    className="group inline-flex items-center gap-2.5 text-[14px] text-[#2D2D2D]/75 transition-colors hover:text-[#556040]"
                  >
                    <Phone
                      className="size-4 text-[#556040] transition-transform group-hover:-rotate-12"
                      strokeWidth={1.5}
                    />
                    {contact.phone.value}
                  </a>
                )}
                {contact.whatsapp && (
                  <a
                    href={contact.whatsapp.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 text-[14px] text-[#2D2D2D]/75 transition-colors hover:text-[#556040]"
                  >
                    <svg
                      className="size-4 text-[#556040] transition-transform group-hover:scale-110"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.554 4.112 1.523 5.84L0 24l6.338-1.499A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.493-5.184-1.357l-.372-.22-3.862.913.978-3.768-.242-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                    WhatsApp
                  </a>
                )}
              </div>
            </div>
          </Reveal>

          {/* ── Consultas ───────────────────────────────────────────────── */}
          <Reveal delay={240} className="self-start">
            <div
              id="consultas"
              className="scroll-mt-24 rounded-2xl bg-[#556040] p-7 shadow-lg transition-transform duration-300 hover:-translate-y-1"
            >
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#E4DAC2] uppercase">
                Consultas
              </p>
              <p className="mt-5 font-[family-name:var(--font-cormorant)] text-[1.6rem] leading-tight font-light text-[#F4EFE3]">
                Online ou presencial, com horário combinado previamente.
              </p>
              <p className="mt-4 text-[13px] leading-[1.7] text-white/65">
                Sessões sigilosas, conduzidas no seu ritmo.
              </p>
              <BookingLink
                href={contact.bookingHref}
                external={contact.bookingExternal}
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-[#222A17] px-6 py-3 text-sm font-medium text-[#F4EFE3] transition-colors hover:bg-[#171D0F]"
              >
                Agendar uma consulta
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </BookingLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
