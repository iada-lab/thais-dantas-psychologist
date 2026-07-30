import { unstable_cache } from 'next/cache'
import { asc, eq } from 'drizzle-orm'

import { db } from './index'
import { contactChannels, contactInfo } from './schema'
import { telHref, whatsappHref } from '@/lib/contact/format'

export type PublicContactChannel = {
  id: string
  label: string
  iconKey: string
  value: string
}

export type ContactData = {
  mapUrl: string
  channels: PublicContactChannel[]
}

/**
 * Canais e mapa cadastrados no gestor — fonte única dos contatos do site.
 * O cache é invalidado pela tag 'contato', disparada pelas rotas de escrita
 * em /api/contato*.
 */
export const getContactData = unstable_cache(
  async (): Promise<ContactData> => {
    const [info] = await db
      .select({ id: contactInfo.id, mapUrl: contactInfo.mapUrl })
      .from(contactInfo)
      .limit(1)

    if (!info) return { mapUrl: '', channels: [] }

    const channels = await db
      .select({
        id: contactChannels.id,
        label: contactChannels.label,
        iconKey: contactChannels.iconKey,
        value: contactChannels.value,
      })
      .from(contactChannels)
      .where(eq(contactChannels.contactInfoId, info.id))
      .orderBy(asc(contactChannels.sortOrder), asc(contactChannels.createdAt))

    return { mapUrl: info.mapUrl, channels }
  },
  ['contato-data'],
  { tags: ['contato'] }
)

export type ContactLink = { value: string; href: string }

export type ContactLinks = {
  /** Telefone cadastrado, com href `tel:` — null se não houver. */
  phone: ContactLink | null
  /** WhatsApp cadastrado, com link wa.me já com a mensagem de agendamento. */
  whatsapp: ContactLink | null
  /** Destino do CTA "Agendar horário": WhatsApp se cadastrado, senão /contato. */
  bookingHref: string
  /** true quando bookingHref é externo (abre em nova aba). */
  bookingExternal: boolean
}

function findByLabel(
  channels: PublicContactChannel[],
  label: string
): PublicContactChannel | null {
  return channels.find(c => c.label.toLowerCase() === label) ?? null
}

/** Links de telefone/WhatsApp e destino do CTA, derivados do que está no banco. */
export async function getContactLinks(): Promise<ContactLinks> {
  const { channels } = await getContactData()

  const phoneChannel = findByLabel(channels, 'telefone')
  const phoneHref = phoneChannel ? telHref(phoneChannel.value) : null

  const whatsappChannel = findByLabel(channels, 'whatsapp')
  const waHref = whatsappChannel ? whatsappHref(whatsappChannel.value) : null

  return {
    phone:
      phoneChannel && phoneHref
        ? { value: phoneChannel.value, href: phoneHref }
        : null,
    whatsapp:
      whatsappChannel && waHref
        ? { value: whatsappChannel.value, href: waHref }
        : null,
    bookingHref: waHref ?? '/contato',
    bookingExternal: !!waHref,
  }
}
