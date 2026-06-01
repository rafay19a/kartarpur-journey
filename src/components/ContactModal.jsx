import { useEffect } from 'react'
import Icon from './Icon'
import { CONTACT_EMAIL, MAILTO_URL, WHATSAPP_DISPLAY, whatsappUrl } from '../lib/contact'

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163A11.867 11.867 0 010 11.85C0 5.31 5.323 0 11.876 0a11.78 11.78 0 018.413 3.488 11.81 11.81 0 013.49 8.41c-.003 6.54-5.326 11.86-11.876 11.86a11.9 11.9 0 01-5.683-1.45L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.486.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
)

export default function ContactModal({ open, onClose }) {
  // Lock body scroll while open + close on Escape.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close contact dialog"
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-[0_30px_80px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <Icon name="x" size={18} color="currentColor" />
        </button>

        {/* Header */}
        <div className="px-8 pt-10 pb-6 bg-navy text-center">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-2">Get in Touch</p>
          <h2 id="contact-modal-title" className="font-cormorant text-white text-3xl font-semibold leading-tight mb-2">
            Speak with our team
          </h2>
          <p className="text-white/60 text-sm">
            Our pilgrimage consultants reply 7 days a week.
          </p>
        </div>

        {/* Body */}
        <div className="px-8 py-7 flex flex-col gap-5">
          {/* Email row */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-1.5">Email</p>
            <a
              href={MAILTO_URL}
              className="text-navy text-sm hover:text-accent transition-colors no-underline break-all"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          {/* WhatsApp row */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-slate-400 mb-1.5">Phone / WhatsApp</p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-navy text-sm hover:text-accent transition-colors no-underline"
            >
              {WHATSAPP_DISPLAY}
            </a>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <a
              href={MAILTO_URL}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-accent text-accent font-semibold text-sm px-5 py-3 rounded-xl hover:bg-accent hover:text-navy transition-all duration-200 no-underline"
            >
              <Icon name="arrow" size={16} color="currentColor" />
              Email Us
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-5 py-3 rounded-xl hover:bg-[#1da851] transition-all duration-200 no-underline shadow-[0_8px_24px_rgba(37,211,102,0.35)]"
            >
              <WhatsAppIcon />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
