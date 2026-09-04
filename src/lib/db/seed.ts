import { eq } from 'drizzle-orm'
import { db } from './index'
import { authUsers, contactChannels, contactInfo } from './schema'
import { auth } from '@/lib/auth'

/**
 * Localização do consultório: Av. T-4, 1478 — a coordenada resolve para o
 * número 1478 da Avenida T-4, CEP 74230-030.
 */
const seedContactInfo = {
  mapUrl:
    'https://maps.google.com/maps?q=-16.71971902331966,-49.2668878132625&z=17&output=embed',
  addressLine: 'Av. T-4, 1478 — Sala 172-B',
  neighborhood: 'Setor Bueno',
  cityState: 'Goiânia – GO',
  postalCode: '74230-030',
} as const

/** Mesmo número atende telefone e WhatsApp. */
const SEED_PHONE = '(62) 9 8252-3582'

const seedChannels = [
  {
    label: 'E-mail',
    iconKey: 'mail',
    value: 'contato@thaisdantas.com.br',
    sortOrder: 0,
  },
  {
    label: 'Telefone',
    iconKey: 'phone',
    value: SEED_PHONE,
    sortOrder: 1,
  },
  {
    label: 'WhatsApp',
    iconKey: 'message-circle',
    value: SEED_PHONE,
    sortOrder: 2,
  },
  {
    label: 'Instagram',
    iconKey: 'instagram',
    value: 'https://instagram.com/thaisdantas',
    sortOrder: 3,
  },
] as const

async function main() {
  console.warn('🌱 Seeding contato…')

  await db.delete(contactChannels)
  await db.delete(contactInfo)

  const [info] = await db
    .insert(contactInfo)
    .values(seedContactInfo)
    .returning({ id: contactInfo.id })

  if (!info) throw new Error('Falha ao criar contact_info')

  await db.insert(contactChannels).values(
    seedChannels.map(ch => ({
      contactInfoId: info.id,
      label: ch.label,
      iconKey: ch.iconKey,
      value: ch.value,
      sortOrder: ch.sortOrder,
    }))
  )

  console.warn('✅ Contato inserido.')

  console.warn('🌱 Criando usuário admin…')
  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminUsername || !adminPassword) {
    console.warn(
      '⚠️  ADMIN_USERNAME ou ADMIN_PASSWORD não definidos no .env — admin ignorado.'
    )
  } else {
    const [existing] = await db
      .select({ id: authUsers.id })
      .from(authUsers)
      .where(eq(authUsers.username, adminUsername))
      .limit(1)

    if (existing) {
      console.warn(`⚠️  Admin "${adminUsername}" já existe — ignorado.`)
    } else {
      try {
        await auth.api.signUpEmail({
          body: {
            name: adminUsername,
            email: `${adminUsername}@thais-dantas.internal`,
            password: adminPassword,
            username: adminUsername,
          },
        })
        console.warn(`✅ Admin "${adminUsername}" criado.`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        console.error('❌ Falha ao criar admin:', msg)
      }
    }
  }

  process.exit(0)
}

main().catch(err => {
  console.error('❌ Seed falhou:', err)
  process.exit(1)
})
