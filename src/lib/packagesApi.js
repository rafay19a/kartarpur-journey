import { supabase } from './supabaseClient'

const TABLE = 'packages'
const BUCKET = 'package-images'

// ─── Reads ──────────────────────────────────────────────────────────────────

export async function getPackages() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getFeaturedPackages(limit = 3) {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(limit)
  if (error) throw error
  return data ?? []
}

export async function getPackageById(id) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single()
  if (error) throw error
  return data
}

export async function getPackageBySlug(slug) {
  const { data, error } = await supabase.from(TABLE).select('*').eq('slug', slug).single()
  if (error) throw error
  return data
}

// ─── Writes (admin only — protected by RLS) ─────────────────────────────────

export async function createPackage(payload) {
  const { data, error } = await supabase.from(TABLE).insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updatePackage(id, payload) {
  const { data, error } = await supabase.from(TABLE).update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deletePackage(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

// ─── Storage ────────────────────────────────────────────────────────────────

export async function uploadPackageImage(file) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, { cacheControl: '3600', upsert: false })
  if (error) throw error
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(fileName)
  return data.publicUrl
}
