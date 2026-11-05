import { createAuthClient } from '@neondatabase/auth'
import { BetterAuthReactAdapter } from '@neondatabase/auth/react/adapters'

// Vite reads this public URL from client/.env.local.
const authUrl = import.meta.env.VITE_NEON_AUTH_URL

if (!authUrl) {
  throw new Error('VITE_NEON_AUTH_URL is missing')
}

// Share one authentication client across our React components.
export const authClient = createAuthClient(authUrl, {
  adapter: BetterAuthReactAdapter(),
})