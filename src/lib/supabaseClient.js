import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('[v0] SUPABASE_URL available:', !!SUPABASE_URL)
console.log('[v0] SUPABASE_ANON_KEY available:', !!SUPABASE_ANON_KEY)
console.log('[v0] All env vars:', import.meta.env)

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('[v0] Missing Supabase credentials')
  throw new Error(
    `Missing Supabase environment variables. 
    VITE_SUPABASE_URL: ${SUPABASE_URL ? 'set' : 'missing'}
    VITE_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY ? 'set' : 'missing'}`
  )
}

// Persist client across HMR / module reloads to avoid multiple
// GoTrueClient instances being created in the same browser context.
const GLOBAL_KEY = '__VIBESHOP_SUPABASE__'
const _global = typeof globalThis !== 'undefined' ? globalThis : window

if (!_global[GLOBAL_KEY]) {
  _global[GLOBAL_KEY] = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  console.log('[v0] Created new Supabase client instance')
} else {
  console.log('[v0] Reusing existing Supabase client instance')
}

export const supabase = _global[GLOBAL_KEY]
