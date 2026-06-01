// Centralised contact details used across the site (Footer modal, CTAs, etc).
// Keeps a single source of truth so the number / email only ever changes here.

export const CONTACT_EMAIL = 'kartarpurjourney@gmail.com'

// E.164 digits only — used to build wa.me links.
export const WHATSAPP_NUMBER = '923357111133'
// Human-readable variant for display.
export const WHATSAPP_DISPLAY = '+92 335 7111133'

export const MAILTO_URL = `mailto:${CONTACT_EMAIL}`

export function whatsappUrl(message) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}
