import { createClient } from '@supabase/supabase-js'

const rawUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!rawUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env (project root).'
  )
}

// The SDK appends `/rest/v1`, `/auth/v1`, `/storage/v1` itself, so the URL
// passed to createClient must be the bare project URL only. Strip any
// accidental `/rest/v1`, API path, or trailing slash.
const supabaseUrl = String(rawUrl)
  .trim()
  .replace(/\/(rest|auth|storage|realtime)\/v1\/?.*$/i, '')
  .replace(/\/+$/, '')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
