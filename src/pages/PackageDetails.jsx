import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { seatsBadge } from '../components/GroupSelector'
import { usePackage } from '../hooks/usePackages'
import { useGroupsForPackage } from '../hooks/useGroups'
import { toArray, formatPrice, formatDuration, normaliseItinerary } from '../lib/packages'
import { formatDate } from '../lib/format'

export default function PackageDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const { data: pkg, loading, error } = usePackage(id)
  const { data: groups } = useGroupsForPackage(id)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

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
          <p className="text-lg text-slate-500">{error || 'Package not found.'}</p>
          <Link to="/packages" className="text-accent hover:underline">Back to packages</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const locations = toArray(pkg.locations)
  const highlights = toArray(pkg.highlights)
  const included = toArray(pkg.included)
  const excluded = toArray(pkg.excluded)
  const itinerary = normaliseItinerary(pkg.itinerary)

  return (
    <div className="min-h-screen bg-surface">
      <Navbar scrolled={scrolled} />

      {/* Hero banner */}
      <div className="bg-navy pt-28 pb-16 px-6 md:px-20">
        <div className="max-w-screen-lg mx-auto">
          <button
            onClick={() => navigate('/packages')}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12,5 5,12 12,19" />
            </svg>
            Back to Packages
          </button>

          {highlights.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {highlights.map(tag => (
                <span key={tag} className="text-xs text-accent bg-accent/15 px-3 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-cormorant text-white font-semibold text-[clamp(32px,5vw,56px)] leading-snug mb-3">
            {pkg.title}
          </h1>

          <div className="flex flex-wrap gap-6 text-sm mt-4">
            <div className="flex items-center gap-2 text-white/70">
              <Icon name="clock" size={15} color="#C8A951" />
              {formatDuration(pkg)}
            </div>
            {locations.length > 0 && (
              <div className="flex items-center gap-2 text-white/70">
                <Icon name="map" size={15} color="#C8A951" />
                {locations.join(' → ')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Image */}
      {pkg.image_url && (
        <div className="px-6 md:px-20 -mt-8">
          <div className="max-w-screen-lg mx-auto">
            <img src={pkg.image_url} alt={pkg.title} className="w-full h-[280px] md:h-[420px] object-cover rounded-[24px] shadow-lg" />
          </div>
        </div>
      )}

      {/* Body */}
      <div className="px-6 md:px-20 py-16">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: detail */}
          <div className="lg:col-span-2 space-y-10">
            {/* About */}
            <section>
              <h2 className="font-cormorant text-navy font-semibold text-2xl mb-4">About This Journey</h2>
              <p className="text-slate-600 leading-relaxed whitespace-pre-line">{pkg.description}</p>
            </section>

            {/* Upcoming group departures */}
            {groups.length > 0 && (
              <section>
                <h2 className="font-cormorant text-navy font-semibold text-2xl mb-4">Upcoming Departures</h2>
                <div className="space-y-3">
                  {groups.map(g => {
                    const badge = seatsBadge(g)
                    return (
                      <div key={g.id} className="flex items-center justify-between gap-4 bg-white border border-slate-100 rounded-2xl shadow-sm p-4">
                        <div>
                          <p className="font-semibold text-navy">{g.group_name || 'Group Departure'}</p>
                          <p className="text-sm text-slate-500">
                            Departure: {formatDate(g.departure_date)}
                            {g.return_date ? ` · Return: ${formatDate(g.return_date)}` : ''}
                          </p>
                        </div>
                        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${badge.cls}`}>
                          {badge.text}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Locations */}
            {locations.length > 0 && (
              <section>
                <h2 className="font-cormorant text-navy font-semibold text-2xl mb-4">Cities &amp; Sites Visited</h2>
                <div className="flex flex-wrap gap-2">
                  {locations.map(loc => (
                    <span key={loc} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-700 shadow-sm">
                      {loc}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Included / Excluded */}
            {(included.length > 0 || excluded.length > 0) && (
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {included.length > 0 && (
                  <div>
                    <h3 className="font-cormorant text-navy font-semibold text-xl mb-3">What's Included</h3>
                    <ul className="space-y-2">
                      {included.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                          <Icon name="check" size={14} color="#C8A951" className="flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {excluded.length > 0 && (
                  <div>
                    <h3 className="font-cormorant text-navy font-semibold text-xl mb-3">Not Included</h3>
                    <ul className="space-y-2">
                      {excluded.map(item => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                          <span className="text-slate-300 mt-0.5">✕</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            )}

            {/* Itinerary */}
            {itinerary.length > 0 && (
              <section>
                <h2 className="font-cormorant text-navy font-semibold text-2xl mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-4">
                  {itinerary.map(({ day, title, description }, i) => (
                    <div key={i} className="flex gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold font-cormorant text-lg flex-shrink-0">
                        {day}
                      </div>
                      <div>
                        {title && <p className="font-semibold text-navy mb-1">{title}</p>}
                        {description && <p className="text-sm text-slate-500">{description}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right: booking card */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white rounded-[24px] shadow-[0_8px_40px_rgba(0,0,0,0.1)] border border-slate-100 p-7">
              <p className="text-sm text-slate-400 mb-1">From</p>
              <p className="font-cormorant text-[36px] font-bold text-navy leading-none mb-1">
                {formatPrice(pkg.price)}
                <span className="text-base font-normal text-slate-400"> /person</span>
              </p>
              <p className="text-sm text-slate-500 mt-2 mb-6">{formatDuration(pkg)}</p>

              <button
                onClick={() => navigate(`/booking/${pkg.id}`)}
                className="btn btn-gold w-full mb-4"
              >
                Book This Package
              </button>

              <a
                href="https://wa.me/923357111133"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-600 text-sm font-medium py-3 rounded-xl hover:border-accent hover:text-accent transition-all duration-200 no-underline"
              >
                <Icon name="phone" size={14} color="currentColor" />
                Ask a Question
              </a>

              {included.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {included.slice(0, 8).map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <Icon name="check" size={14} color="#C8A951" className="flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
