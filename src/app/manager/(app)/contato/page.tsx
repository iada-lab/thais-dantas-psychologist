import type { Metadata } from 'next'
import { ContatoWorkspace } from './_components/contato-workspace'

export const metadata: Metadata = {
  title: 'Contato | Gestor Tais Dantas',
}

export default function ContatoManagerPage() {
  return <ContatoWorkspace />
}
