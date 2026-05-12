import { useEffect, useMemo, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AdminNav from '../../components/admin/AdminNav'
import { getEnquiries, updateEnquiryStatus } from '../../lib/enquiriesApi'
import { formatDate, formatDateShort } from '../../lib/format'
import { formatPrice } from '../../lib/packages'

const STATUSES = ['new', 'contacted', 'confirmed', 'closed']
const ALL = 'All'

const statusCls = {
  new: 'bg-amber-100 text-amber-700',
  contacted: 'bg-sky-100 text-sky-700',
  confirmed: 'bg-emerald-100 text-emerald-700',
  closed: 'bg-slate-100 text-slate-500',
}

const cap = s => (s ? s[0].toUpperCase() + s.slice(1) : s)

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [pkgFilter, setPkgFilter] = useState(ALL)
  const [statusFilter, setStatusFilter] = useState(ALL)
  const [methodFilter, setMethodFilter] = useState(ALL)
  const [savingId, setSavingId] = useState(null)

  useEffect(() => {
    getEnquiries()
      .then(setEnquiries)
      .catch(e => setError(e.message || 'Failed to load enquiries'))
      .finally(() => setLoading(false))
  }, [])

  const packageOptions = useMemo(
    () => [ALL, ...Array.from(new Set(enquiries.map(e => e.package_name).filter(Boolean)))],
    [enquiries]
  )

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return enquiries.filter(e => {
      if (pkgFilter !== ALL && e.package_name !== pkgFilter) return false
      if (statusFilter !== ALL && (e.status || 'new') !== statusFilter) return false
      if (methodFilter !== ALL && e.enquiry_method !== methodFilter) return false
      if (q) {
        const hay = `${e.first_name || ''} ${e.last_name || ''} ${e.email || ''} ${e.phone || ''} ${e.package_name || ''} ${e.group_name || ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [enquiries, search, pkgFilter, statusFilter, methodFilter])

  const stats = useMemo(
    () => ({
      total: enquiries.length,
      new: enquiries.filter(e => (e.status || 'new') === 'new').length,
      confirmed: enquiries.filter(e => e.status === 'confirmed').length,
    }),
    [enquiries]
  )

  const changeStatus = async (enq, status) => {
    setSavingId(enq.id)
    try {
      await updateEnquiryStatus(enq.id, status)
      setEnquiries(prev => prev.map(x => (x.id === enq.id ? { ...x, status } : x)))
    } catch (e) {
      alert(e.message || 'Failed to update status')
    } finally {
      setSavingId(null)
    }
  }

  const selectCls = 'border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-accent'

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="bg-navy pt-28 pb-12 px-6 md:px-20">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-accent text-[11px] tracking-[0.2em] uppercase font-bold mb-2">Admin</p>
          <h1 className="font-cormorant text-white text-[clamp(28px,4vw,44px)] font-semibold">Enquiries</h1>
        </div>
      </div>

      <AdminNav />

      <div className="px-6 md:px-20 py-12">
        <div className="max-w-screen-xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <p className="text-3xl font-bold text-navy">{stats.total}</p>
              <p className="text-sm text-slate-400 mt-1">Total Enquiries</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <p className="text-3xl font-bold text-amber-600">{stats.new}</p>
              <p className="text-sm text-slate-400 mt-1">New / Unhandled</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <p className="text-3xl font-bold text-emerald-600">{stats.confirmed}</p>
              <p className="text-sm text-slate-400 mt-1">Confirmed</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row md:items-end gap-3 mb-6">
            <div className="flex-1">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, phone, package…"
                className={`${selectCls} w-full`}
              />
            </div>
            <select value={pkgFilter} onChange={e => setPkgFilter(e.target.value)} className={selectCls}>
              {packageOptions.map(o => <option key={o} value={o}>{o === ALL ? 'All packages' : o}</option>)}
            </select>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={selectCls}>
              <option value={ALL}>All statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{cap(s)}</option>)}
            </select>
            <select value={methodFilter} onChange={e => setMethodFilter(e.target.value)} className={selectCls}>
              <option value={ALL}>All methods</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Email</option>
            </select>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {loading ? (
            <div className="text-center py-24 text-slate-400">Loading enquiries…</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400">No enquiries found.</div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Date</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Contact</th>
                    <th className="px-4 py-3 font-medium">Package</th>
                    <th className="px-4 py-3 font-medium">Group</th>
                    <th className="px-4 py-3 font-medium">Guests</th>
                    <th className="px-4 py-3 font-medium">Method</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(e => (
                    <tr key={e.id} className="hover:bg-slate-50 align-top">
                      <td className="px-4 py-3 text-slate-500 whitespace-nowrap">{formatDateShort(e.created_at)}</td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-slate-700">{e.first_name} {e.last_name}</p>
                        {e.special_requests && (
                          <p className="text-xs text-slate-400 mt-1 max-w-[220px] truncate" title={e.special_requests}>
                            {e.special_requests}
                          </p>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <p>{e.phone || '—'}</p>
                        {e.email && <p className="text-xs text-slate-400">{e.email}</p>}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        <p>{e.package_name || '—'}</p>
                        {e.package_price != null && <p className="text-xs text-slate-400">{formatPrice(e.package_price)}</p>}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {e.group_name ? (
                          <>
                            <p>{e.group_name}</p>
                            {e.group_departure_date && <p className="text-xs text-slate-400">{formatDate(e.group_departure_date)}</p>}
                          </>
                        ) : '—'}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{e.guests || '—'}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            e.enquiry_method === 'whatsapp' ? 'bg-[#25D366]/15 text-[#1a8f4a]' : 'bg-sky-100 text-sky-700'
                          }`}
                        >
                          {e.enquiry_method || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={e.status || 'new'}
                          onChange={ev => changeStatus(e, ev.target.value)}
                          disabled={savingId === e.id}
                          className={`text-xs rounded-full px-2 py-1 font-medium cursor-pointer border-0 outline-none ${statusCls[e.status] || statusCls.new}`}
                        >
                          {STATUSES.map(s => <option key={s} value={s}>{cap(s)}</option>)}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
