import { supabase } from './supabaseClient'

const TABLE = 'package_groups'

// Active, upcoming-first departures for a single package (public site).
export async function getGroupsForPackage(packageId, { activeOnly = true } = {}) {
  let query = supabase
    .from(TABLE)
    .select('*')
    .eq('package_id', packageId)
    .order('departure_date', { ascending: true })
  if (activeOnly) query = query.eq('is_active', true)
  const { data, error } = await query
  if (error) throw error
  return data ?? []
}

// All groups (admin).
export async function getAllGroups() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('departure_date', { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function createGroup(payload) {
  const { data, error } = await supabase.from(TABLE).insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateGroup(id, payload) {
  const { data, error } = await supabase.from(TABLE).update(payload).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteGroup(id) {
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}
