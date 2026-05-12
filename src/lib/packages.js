// Shared helpers for normalising Supabase `packages` rows for the public site.

// Postgres array / jsonb columns can come back as a JS array, a JSON string,
// or (for hand-entered data) a comma/newline separated string. Normalise all of them.
export function toArray(val) {
  if (Array.isArray(val)) return val
  if (val == null) return []
  if (typeof val === 'string') {
    const trimmed = val.trim()
    if (!trimmed) return []
    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return parsed
    } catch {
      /* not JSON — fall through */
    }
    return trimmed
      .split(/[\n,]/)
      .map(s => s.trim())
      .filter(Boolean)
  }
  return []
}

export function formatPrice(price, currency = '£') {
  if (price == null || price === '') return '—'
  const n = typeof price === 'number' ? price : Number(String(price).replace(/[^0-9.]/g, ''))
  if (Number.isNaN(n)) return String(price)
  return `${currency}${n.toLocaleString()}`
}

// `duration` may be stored as a number of days, or already as a string
// like "7 Days / 6 Nights". `nights` is an optional companion column.
export function formatDuration(pkg) {
  if (!pkg) return ''
  const { duration, nights } = pkg
  const isNumeric = typeof duration === 'number' || /^\d+$/.test(String(duration ?? '').trim())
  if (isNumeric) {
    const days = Number(duration)
    const n = nights == null || nights === '' ? null : Number(nights)
    return n != null && !Number.isNaN(n) ? `${days} Days / ${n} Nights` : `${days} Days`
  }
  return duration ? String(duration) : ''
}

// Normalise an itinerary item to a consistent shape: { day, title, description }
export function normaliseItinerary(itinerary) {
  return toArray(itinerary).map((item, i) => ({
    day: item?.day ?? i + 1,
    title: item?.title ?? '',
    description: item?.description ?? item?.desc ?? '',
  }))
}
