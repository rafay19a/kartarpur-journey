import { supabase } from './supabaseClient'

const TABLE = 'enquiries'

// Insert an enquiry. Called from the booking form before opening WhatsApp/email,
// so a record exists even if the customer never sends the message.
export async function createEnquiry(payload) {
  const { data, error } = await supabase.from(TABLE).insert(payload).select().single()
  if (error) throw error
  return data
}

export async function getEnquiries() {
  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function updateEnquiryStatus(id, status) {
  const { data, error } = await supabase
    .from(TABLE)
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}
