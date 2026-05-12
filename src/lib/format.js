// Small shared formatting helpers.

export function formatDate(value, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)
  return d.toLocaleDateString('en-GB', opts)
}

export const formatDateShort = value =>
  formatDate(value, { day: 'numeric', month: 'short', year: 'numeric' })
