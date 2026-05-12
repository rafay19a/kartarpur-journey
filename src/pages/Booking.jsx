import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import GroupSelector from '../components/GroupSelector'
import { usePackage } from '../hooks/usePackages'
import { useGroupsForPackage } from '../hooks/useGroups'
import { formatPrice, formatDuration } from '../lib/packages'
import { formatDate } from '../lib/format'
import { createEnquiry } from '../lib/enquiriesApi'

const WHATSAPP_NUMBER = '923357111133'
const ENQUIRY_EMAIL = 'kartartpurjourney@gmail.com'

const guestOptions = ['1 Adult', '2 Adults', 'Family (2 adults + 2 children)', 'Group (8+)']

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <polyline points="2,4 12,13 22,4" />
  </svg>
)

function priceNumber(price) {
  if (price == null || price === '') return null
  const n = typeof price === 'number' ? price : Number(String(price).replace(/[^0-9.]/g, ''))
  return Number.isNaN(n) ? null : n
}

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const { data: pkg, loading, error } = usePackage(id)
  const { data: groups, loading: groupsLoading, error: groupsError } = useGroupsForPackage(id)

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    guests: '2 Adults',
    specialRequests: '',
  })
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [saveNotice, setSaveNotice] = useState(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const update = field => e => setForm(f => ({ ...f, [field]: e.target.value }))
  const { firstName, lastName, email, phone, guests, specialRequests } = form

  const buildBookingMessage = () => {
    const groupLine = selectedGroup
      ? `Group: ${selectedGroup.group_name}\nDeparture: ${formatDate(selectedGroup.departure_date)}`
      : 'Group: (to be confirmed)'
    return `New Booking Enquiry

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Package: ${pkg?.title ?? ''}
Duration: ${pkg ? formatDuration(pkg) : ''}
Price: ${pkg ? formatPrice(pkg.price) : ''}

${groupLine}

Guests: ${guests}

Special Requests:
${specialRequests}`
  }

  const validate = () => {
    if (!firstName.trim() || !phone.trim()) {
      alert('Please enter your name and phone number.')
      return false
    }
    if (groups.length > 0 && !selectedGroup) {
      alert('Please select a group departure.')
      return false
    }
    return true
  }

  const buildEnquiryPayload = method => ({
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    email: email.trim() || null,
    phone: phone.trim(),
    guests,
    package_id: pkg?.id ?? null,
    package_name: pkg?.title ?? null,
    package_price: priceNumber(pkg?.price),
    duration: pkg ? formatDuration(pkg) : null,
    group_id: selectedGroup?.id ?? null,
    group_name: selectedGroup?.group_name ?? null,
    group_departure_date: selectedGroup?.departure_date ?? null,
    special_requests: specialRequests.trim() || null,
    enquiry_method: method,
    status: 'new',
  })

  // Save the enquiry to Supabase first, then open the chosen channel.
  // Best-effort: if the save fails we still let the customer reach us.
  const saveEnquiry = async method => {
    setSubmitting(true)
    setSaveNotice(null)
    try {
      await createEnquiry(buildEnquiryPayload(method))
    } catch (e) {
      console.error('Failed to save enquiry:', e)
      setSaveNotice('We could not save your enquiry automatically, but you can still send it below.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleWhatsApp = async () => {
    if (!validate()) return
    // Open the tab synchronously (before the await) so popup blockers don't fire.
    const win = window.open('about:blank', '_blank')
    await saveEnquiry('whatsapp')
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildBookingMessage())}`
    if (win) win.location.href = url
    else window.open(url, '_blank')
  }

  const handleEmail = async () => {
    if (!validate()) return
    await saveEnquiry('email')
    window.location.href = `mailto:${ENQUIRY_EMAIL}?subject=${encodeURIComponent('New Booking Enquiry')}&body=${encodeURIComponent(buildBookingMessage())}`
  }

  const inputClass =
    'w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-navy outline-none focus:border-accent transition-colors duration-200 bg-white'
  const labelClass = 'block text-xs font-semibold text-slate-500 tracking-wide uppercase mb-1.5'

  if (loading) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar scrolled={scrolled} />
        <div className="min-h-[60vh] flex items-center justify-center text-slate-400">Loading…</div>
        <Footer />
      </div>
    )
  }

  if (error || !pkg) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar scrolled={scrolled} />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="text-slate-500">{error || 'Package not found.'}</p>
          <Link to="/packages" className="text-accent hover:underline">Back to packages</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar scrolled={scrolled} />

      <div className="bg-navy pt-28 pb-14 px-6 text-center">
        <p className="text-accent text-[11px] tracking-[0.2em] uppercase font-bold mb-3">Book Your Journey</p>
        <h1 className="font-cormorant text-white text-[clamp(28px,4vw,48px)] font-semibold">{pkg.title}</h1>
        <p className="text-white/60 mt-2">{formatDuration(pkg)}</p>
      </div>

      <div className="px-6 md:px-20 py-16">
        <div className="max-w-screen-md mx-auto">
          <form className="bg-white rounded-[24px] shadow-sm border border-slate-100 p-8 space-y-6" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>First Name</label>
                <input required value={form.firstName} onChange={update('firstName')} className={inputClass} placeholder="Gurpreet" />
              </div>
              <div>
                <label className={labelClass}>Last Name</label>
                <input required value={form.lastName} onChange={update('lastName')} className={inputClass} placeholder="Singh" />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email Address</label>
              <input type="email" value={form.email} onChange={update('email')} className={inputClass} placeholder="you@example.com" />
            </div>

            <div>
              <label className={labelClass}>Phone / WhatsApp</label>
              <input required value={form.phone} onChange={update('phone')} className={inputClass} placeholder="+44 7700 000000" />
            </div>

            <div>
              <label className={labelClass}>Number of Guests</label>
              <select value={form.guests} onChange={update('guests')} className={inputClass}>
                {guestOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>

            {/* Group departure selector — replaces the old date picker */}
            <div>
              <label className={labelClass}>Select Available Group{groups.length > 0 ? ' *' : ''}</label>
              <GroupSelector
                groups={groups}
                selectedId={selectedGroup?.id}
                onSelect={setSelectedGroup}
                loading={groupsLoading}
                error={groupsError}
              />
            </div>

            <div>
              <label className={labelClass}>Special Requests</label>
              <textarea
                value={form.specialRequests}
                onChange={update('specialRequests')}
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Dietary requirements, accessibility needs, or any questions..."
              />
            </div>

            {/* Package summary */}
            <div className="bg-surface rounded-2xl p-5 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">You're enquiring about</p>
              <p className="font-cormorant text-lg font-semibold text-navy">{pkg.title}</p>
              <p className="text-sm text-slate-500">{formatDuration(pkg)} · From {formatPrice(pkg.price)}/person</p>
              {selectedGroup && (
                <p className="text-sm text-accent mt-2">
                  {selectedGroup.group_name} — Departure {formatDate(selectedGroup.departure_date)}
                </p>
              )}
            </div>

            {saveNotice && <p className="text-amber-600 text-sm">{saveNotice}</p>}

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleWhatsApp}
                disabled={submitting}
                className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold text-[15px] py-4 rounded-[14px] shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.5)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-60"
              >
                <WhatsAppIcon />
                {submitting ? 'Saving…' : 'Book via WhatsApp'}
              </button>

              <button
                type="button"
                onClick={handleEmail}
                disabled={submitting}
                className="flex items-center justify-center gap-2.5 w-full border-2 border-slate-200 hover:border-accent text-slate-600 hover:text-accent font-semibold text-[15px] py-4 rounded-[14px] transition-all duration-200 disabled:opacity-60"
              >
                <MailIcon />
                {submitting ? 'Saving…' : 'Send via Email'}
              </button>
            </div>

            <p className="text-xs text-slate-400 text-center">
              By submitting you agree to our Terms of Service. We'll never share your data with third parties.
            </p>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  )
}
