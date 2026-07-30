/**
 * Normaliza um telefone para dígitos com DDI, pronto para `tel:` e `wa.me`.
 *
 * O gestor aceita o número em formato livre — "(62) 9 0000-0000",
 * "+55 62 90000-0000", "62900000000" — então aqui reduzimos tudo a dígitos e
 * assumimos Brasil quando não há DDI. O "55" inicial só é tratado como DDI a
 * partir de 12 dígitos: abaixo disso ele é o DDD (55 = Santa Maria/RS).
 */
export function toPhoneDigits(value: string): string | null {
  const digits = value.replace(/\D/g, '')
  if (digits.length < 10) return null
  if (digits.length > 11) return digits
  return `55${digits}`
}

export function telHref(value: string): string | null {
  const digits = toPhoneDigits(value)
  return digits ? `tel:+${digits}` : null
}

export const DEFAULT_WHATSAPP_MESSAGE = 'Olá! Gostaria de agendar um horário.'

export function whatsappHref(
  value: string,
  message: string = DEFAULT_WHATSAPP_MESSAGE
): string | null {
  const digits = toPhoneDigits(value)
  if (!digits) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
