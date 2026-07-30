import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { username } from 'better-auth/plugins'
import { db } from '@/lib/db'
import {
  authUsers,
  authSessions,
  authAccounts,
  authVerifications,
} from '@/lib/db/schema'

/**
 * Origens aceitas no sign-in. Em produção, apenas BETTER_AUTH_URL (com e sem
 * www). Em desenvolvimento o app é acessado indiferentemente por localhost,
 * 127.0.0.1 ou 0.0.0.0 — como já previsto em `allowedDevOrigins` no
 * next.config — e sem elas o sign-in responde 403 "Invalid origin" antes de
 * chegar a checar a senha.
 */
function buildTrustedOrigins(): string[] {
  const url = process.env.BETTER_AUTH_URL
  const origins = url
    ? [url, url.replace(/^(https?:\/\/)(?!www\.)/, '$1www.')]
    : []

  if (process.env.NODE_ENV !== 'production') {
    let port = '3000'
    try {
      port = new URL(url ?? '').port || port
    } catch {
      // BETTER_AUTH_URL ausente ou inválido — mantém a porta padrão
    }
    origins.push(
      `http://localhost:${port}`,
      `http://127.0.0.1:${port}`,
      `http://0.0.0.0:${port}`
    )
  }

  return [...new Set(origins)]
}

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_BASE_URL ?? process.env.BETTER_AUTH_URL,
  trustedOrigins: buildTrustedOrigins(),
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user: authUsers,
      session: authSessions,
      account: authAccounts,
      verification: authVerifications,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
  rateLimit: {
    enabled: true,
    window: 60,
    max: 100,
    storage: 'memory',
    customRules: {
      '/sign-in/username': { window: 60, max: 5 },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 dias
    updateAge: 60 * 60 * 24, // renova o cookie se tiver > 1 dia velho
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // cache local de 5 min — evita hit no DB a cada request
    },
  },
  advanced: {
    cookiePrefix: '__Host',
    defaultCookieAttributes: {
      sameSite: 'strict',
    },
  },
})
