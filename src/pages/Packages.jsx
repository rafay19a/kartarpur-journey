import { useState, useEffect, useMemo } from 'react'
import Navbar from '../components/Navbar'
import PackageCard from '../components/PackageCard'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { usePackagesList } from '../hooks/usePackages'
import { toArray } from '../lib/packages'

const ALL = 'All'
const sortOptions = ['Default', 'Price: Low to High', 'Price: High to Low', 'Newest']

function priceValue(pkg) {
  const n = typeof pkg.price === 'number' ? pkg.price : Number(String(pkg.price ?? '').replace(/[^0-9.]/g, ''))
  return Number.isNaN(n) ? 0 : n
}

function durationLabel(pkg) {
  if (pkg.duration == null || pkg.duration === '') return null
  return /^\d+$/.test(String(pkg.duration).trim()) ? `${pkg.duration} Days` : String(pkg.duration)
}

export default function Packages() {
  const { data: packages, loading, error } = usePackagesList()
  const [scrolled, setScrolled] = useState(false)
  const [duration, setDuration] = useState(ALL)
  const [location, setLocation] = useState(ALL)
  const [sort, setSort] = useState('Default')

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Filter options derived from live data
  const durationFilters = useMemo(() => {
    const set = new Set()
    packages.forEach(p => { const l = durationLabel(p); if (l) set.add(l) })
    return [ALL, ...Array.from(set)]
  }, [packages])

  const locationFilters = useMemo(() => {
    const set = new Set()
    packages.forEach(p => toArray(p.locations).forEach(l => set.add(l)))
    return [ALL, ...Array.from(set)]
  }, [packages])

  const filtered = useMemo(() => {
    let result = [...packages]
    if (duration !== ALL) result = result.filter(p => durationLabel(p) === duration)
    if (location !== ALL) result = result.filter(p => toArray(p.locations).includes(location))

    if (sort === 'Price: Low to High') result.sort((a, b) => priceValue(a) - priceValue(b))
    else if (sort === 'Price: High to Low') result.sort((a, b) => priceValue(b) - priceValue(a))
    else if (sort === 'Newest') result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

    return result
  }, [packages, duration, location, sort])

  const clearFilters = () => { setDuration(ALL); setLocation(ALL) }
  const hasFilters = duration !== ALL || location !== ALL

  const FilterPill = ({ value, active, onClick }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
        active
          ? 'bg-gold-gradient text-navy shadow-gold'
          : 'bg-white border border-slate-200 text-slate-600 hover:border-accent hover:text-accent'
      }`}
    >
      {value}
    </button>
  )

  return (
    <div className="min-h-screen bg-surface">
      <Navbar scrolled={scrolled} />

      {/* Page header */}
      <div className="bg-navy pt-32 pb-16 px-6 md:px-20 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">Our Packages</p>
        <h1 className="font-cormorant text-white font-semibold text-[clamp(36px,5vw,60px)] leading-snug mb-4">
          Sacred Journey Packages
        </h1>
        <p className="text-white/60 text-base max-w-md mx-auto">
          Choose your pilgrimage — every package includes expert guidance and full support
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-slate-100 px-6 md:px-20 py-5 sticky top-[72px] z-40">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 font-medium w-16">Duration</span>
              <div className="flex flex-wrap gap-2">
                {durationFilters.map(d => (
                  <FilterPill key={d} value={d} active={duration === d} onClick={() => setDuration(d)} />
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-slate-400 font-medium w-16">Site</span>
              <div className="flex flex-wrap gap-2">
                {locationFilters.map(l => (
                  <FilterPill key={l} value={l} active={location === l} onClick={() => setLocation(l)} />
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Icon name="filter" size={14} color="#94A3B8" />
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="text-sm text-slate-600 border border-slate-200 rounded-lg px-3 py-2 bg-white outline-none cursor-pointer"
            >
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="px-6 md:px-20 py-14">
        <div className="max-w-screen-xl mx-auto">
          {loading ? (
            <div className="text-center py-24 text-slate-400">Loading packages…</div>
          ) : error ? (
            <div className="text-center py-24 text-red-500">{error}</div>
          ) : (
            <>
              <p className="text-sm text-slate-400 mb-8">
                Showing <span className="text-navy font-semibold">{filtered.length}</span> package{filtered.length !== 1 ? 's' : ''}
                {hasFilters && (
                  <button onClick={clearFilters} className="ml-3 text-accent hover:underline">Clear filters</button>
                )}
              </p>

              {filtered.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-7">
                  {filtered.map(pkg => (
                    <div
                      key={pkg.id}
                      className="w-full sm:w-[calc(50%-14px)] lg:w-[calc(33.333%-19px)] max-w-[400px]"
                    >
                      <PackageCard pkg={pkg} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-24 text-slate-400">
                  <p className="text-xl mb-2">{packages.length === 0 ? 'No packages available yet' : 'No packages match your filters'}</p>
                  {hasFilters && (
                    <button onClick={clearFilters} className="text-accent hover:underline mt-2">Clear all filters</button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
