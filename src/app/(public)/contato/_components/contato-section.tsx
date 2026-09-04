import {
  ArrowUpRight,
  Facebook,
  Github,
  Globe,
  Instagram,
  Link as LinkIcon,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Twitter,
  Youtube,
  type LucideIcon,
} from 'lucide-react'

import { telHref, whatsappHref } from '@/lib/contact/format'
import { getContactData } from '@/lib/db/contact-queries'

import { MapIframe } from './map-iframe'

const ICON_MAP: Record<string, LucideIcon> = {
  mail: Mail,
  phone: Phone,
  'message-circle': MessageCircle,
  linkedin: Linkedin,
  instagram: Instagram,
  github: Github,
  youtube: Youtube,
  twitter: Twitter,
  facebook: Facebook,
  globe: Globe,
  'map-pin': MapPin,
  send: Send,
  link: LinkIcon,
}

function getHref(label: string, value: string): string | null {
  const l = label.toLowerCase()
  if (l === 'e-mail') return `mailto:${value}`
  if (l === 'telefone') return telHref(value)
  if (l === 'whatsapp') return whatsappHref(value)
  if (l === 'localização') return null
  return value.startsWith('http') ? value : `https://${value}`
}

/** Encurta URLs para exibição, mantendo o link íntegro no href. */
function display(value: string) {
  return value.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

const DEFAULT_MAP_URL =
  'https://maps.google.com/maps?q=-16.6784792,-49.2453736&z=17&output=embed'

export async function ContatoSection() {
  const { mapUrl: savedMapUrl, channels } = await getContactData()

  const mapUrl = savedMapUrl.trim() || DEFAULT_MAP_URL

  return (
    <>
      <div className="flex items-end justify-between gap-6 border-b border-white/15 pt-8 pb-6">
        <span className="text-[10px] font-semibold tracking-[0.3em] text-white/55 uppercase">
          Contato
        </span>
        <span className="shrink-0 text-[10px] font-medium tracking-[0.25em] text-[#E4DAC2]/70 uppercase">
          Online &amp; Presencial
        </span>
      </div>

      <div className="py-12 lg:py-14">
        <h1 className="font-[family-name:var(--font-cormorant)] text-[clamp(2.6rem,5.5vw,4.75rem)] leading-[1.04] font-light text-[#F4EFE3]">
          Fale <em className="text-[#E2D7BD] italic">comigo.</em>
        </h1>
        <p className="mt-5 max-w-md text-[14px] leading-[1.85] text-white/65">
          Escolha o canal de sua preferência para agendar uma consulta ou tirar
          dúvidas — responderei em breve.
        </p>
      </div>

      <div className="grid flex-1 gap-10 pb-4 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        {/* ── Canais ───────────────────────────────────────────────────── */}
        {/* `min-w-0`: o valor do canal é `truncate` (nowrap), então sem isso a
            coluna cresce até caber o texto inteiro e estoura a tela. */}
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
            Canais
          </p>

          {channels.length === 0 ? (
            <p className="mt-6 rounded-xl border border-dashed border-[#E4DAC2]/30 px-6 py-8 text-center text-[13px] text-white/50">
              Nenhum canal de contato cadastrado.
            </p>
          ) : (
            <ul className="mt-6 flex list-none flex-col gap-3 p-0">
              {channels.map(ch => {
                const Icon = ICON_MAP[ch.iconKey] ?? LinkIcon
                const href = getHref(ch.label, ch.value)
                const isExternal = !!href && href.startsWith('http')

                const inner = (
                  <>
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#556040]/12 text-[#556040]">
                      <Icon size={17} strokeWidth={1.5} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-[9px] font-semibold tracking-[0.28em] text-[#556040] uppercase">
                        {ch.label}
                      </span>
                      <span className="mt-1 block truncate text-[14px] text-[#2D2D2D]">
                        {display(ch.value)}
                      </span>
                    </div>
                    {href && (
                      <ArrowUpRight className="size-4 shrink-0 text-[#556040]/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    )}
                  </>
                )

                const card =
                  'group flex items-center gap-4 rounded-xl border border-[#556040]/10 bg-[#EDE4D2] p-4 shadow-sm transition-all duration-300'

                return (
                  <li key={ch.id}>
                    {href ? (
                      <a
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className={`${card} hover:-translate-y-0.5 hover:bg-[#F5EFE2] hover:shadow-lg`}
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className={card}>{inner}</div>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* ── Localização ──────────────────────────────────────────────── */}
        <div className="min-w-0">
          <p className="text-[10px] font-semibold tracking-[0.25em] text-white/45 uppercase">
            Localização
          </p>

          {/* Mapa solto, como o vídeo na home — sem competir com o card */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#E4DAC2]/25">
            <MapIframe
              src={mapUrl}
              className="h-[280px] [filter:saturate(0.65)_sepia(0.12)_contrast(0.96)] sm:h-[360px]"
            />
          </div>

          <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#556040]/10 bg-[#EDE4D2] p-6 shadow-sm">
            <MapPin
              className="mt-0.5 size-4 shrink-0 text-[#556040]"
              strokeWidth={1.5}
            />
            <div className="min-w-0 flex-1">
              <h2 className="font-[family-name:var(--font-cormorant)] text-2xl leading-tight font-light text-[#2D2D2D]">
                Setor Bueno
              </h2>
              <address className="mt-2 text-[13px] leading-[1.75] text-[#2D2D2D]/65 not-italic">
                Av. T-4, 1478 — Sala 172-B
                <br />
                Goiânia – GO · 74230-030
              </address>
              <p className="mt-4 border-t border-[#556040]/12 pt-3 text-[10px] font-medium tracking-[0.18em] text-[#556040] uppercase">
                Atendimento presencial e online
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
