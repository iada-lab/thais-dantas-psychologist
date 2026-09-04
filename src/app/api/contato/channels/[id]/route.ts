import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { compactContactChannelSortOrders } from '@/lib/db/contact-channel-order'
import { contactChannels } from '@/lib/db/schema'
import { contactChannelPostSchema } from '@/lib/validation/contato-api'
import {
  uuidParamSafeParse,
  validationErrorResponse,
} from '@/lib/validation/api'

/**
 * Edita um canal existente. Reusa o schema do POST — mesmas regras de rótulo,
 * ícone e formato do valor. `sort_order` não é tocado: a posição na página
 * pública é do canal, não do conteúdo, então editar não reordena a lista.
 */
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const idParsed = uuidParamSafeParse(id)
    if (!idParsed.success) return validationErrorResponse(idParsed.error)

    const parsed = contactChannelPostSchema.safeParse(await req.json())
    if (!parsed.success) return validationErrorResponse(parsed.error)

    const [updated] = await db
      .update(contactChannels)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(contactChannels.id, id))
      .returning()

    if (!updated) {
      return NextResponse.json(
        { error: 'Canal não encontrado' },
        { status: 404 }
      )
    }

    revalidateTag('contato', 'max')
    return NextResponse.json(updated)
  } catch (err) {
    console.error('[PUT /api/contato/channels/:id]', err)
    return NextResponse.json(
      { error: 'Erro ao atualizar canal' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const idParsed = uuidParamSafeParse(id)
    if (!idParsed.success) return validationErrorResponse(idParsed.error)

    const [removed] = await db
      .delete(contactChannels)
      .where(eq(contactChannels.id, id))
      .returning({ contactInfoId: contactChannels.contactInfoId })

    if (!removed) {
      return NextResponse.json(
        { error: 'Canal não encontrado' },
        { status: 404 }
      )
    }

    await compactContactChannelSortOrders(removed.contactInfoId)
    revalidateTag('contato', 'max')
    return new NextResponse(null, { status: 204 })
  } catch (err) {
    console.error('[DELETE /api/contato/channels/:id]', err)
    return NextResponse.json(
      { error: 'Erro ao remover canal' },
      { status: 500 }
    )
  }
}
