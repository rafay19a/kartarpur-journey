import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getGurdwaraById, gurdwaras } from '../data/gurdwaras'
import DestinationCard from '../components/DestinationCard'

export default function DestinationDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  const dest = getGurdwaraById(id)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    setImgLoaded(false)
  }, [id])

  if (!dest) {
    return (
      <div className="min-h-screen bg-surface">
        <Navbar scrolled={scrolled} />
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
          <p className="text-lg text-slate-500">Destination not found.</p>
          <Link to="/destinations" className="text-accent hover:underline">Back to destinations</Link>
        </div>
        <Footer />
      </div>
    )
  }

  const others = gurdwaras.filter(g => g.id !== dest.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-surface">
      <Navbar scrolled={scrolled} />

      {/* Hero image */}
      <div className="relative pt-[72px]">
        <div
          className="relative w-full h-[55vh] min-h-[380px] overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${dest.color1} 0%, ${dest.color2}33 100%)` }}
        >
          {dest.image && (
            <img
              src={dest.image}
              alt={dest.name}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(false)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/40 to-navy/20" />

          <div className="absolute inset-x-0 bottom-0 px-6 md:px-20 pb-12">
            <div className="max-w-screen-xl mx-auto">
              <button
                onClick={() => navigate('/destinations')}
                className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12,5 5,12 12,19" />
                </svg>
                Back to Destinations
              </button>

              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: dest.color2, boxShadow: `0 0 8px ${dest.color2}` }}
                />
                <span className="text-white/70 text-[11px] tracking-[0.2em] uppercase">{dest.location}</span>
              </div>
              <h1 className="font-cormorant text-white font-semibold text-[clamp(36px,5vw,60px)] leading-tight">
                {dest.name}
              </h1>
              <p className="text-white/70 text-base md:text-lg mt-3 max-w-2xl">{dest.shortDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Body — long-form reading */}
      <article className="px-6 md:px-20 py-20">
        <div className="max-w-[680px] mx-auto">
          {/* Lead / hero paragraph */}
          {dest.hero && (
            <>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-4">An Introduction</p>
              <p className="font-cormorant text-navy text-[clamp(22px,2.4vw,28px)] leading-[1.45] italic font-medium mb-12">
                {dest.hero}
              </p>
              <div className="w-16 h-px bg-accent/40 mb-14" />
            </>
          )}

          {/* Sectioned long-form */}
          {Array.isArray(dest.sections) && dest.sections.length > 0 ? (
            <div className="flex flex-col gap-14">
              {dest.sections.map((section, i) => (
                <section key={section.title}>
                  <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">
                    {String(i + 1).padStart(2, '0')} · Chapter
                  </p>
                  <h2 className="font-cormorant text-navy font-semibold text-[clamp(26px,3vw,34px)] leading-snug mb-6">
                    {section.title}
                  </h2>
                  {section.body.split('\n\n').map((para, p) => (
                    <p
                      key={p}
                      className="text-slate-600 text-[17px] md:text-[18px] leading-[1.85] mb-5 last:mb-0"
                    >
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 text-[17px] leading-[1.85] whitespace-pre-line">
              {dest.fullDescription}
            </p>
          )}

          {/* Closing CTAs */}
          <div className="mt-20 pt-10 border-t border-slate-200/70 flex flex-wrap gap-4">
            <Link
              to="/packages"
              className="inline-flex items-center gap-2 bg-gold-gradient text-navy font-semibold text-sm px-6 py-3 rounded-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
            >
              View Pilgrimage Packages
            </Link>
            <Link
              to="/destinations"
              className="inline-flex items-center gap-2 border-2 border-accent text-accent font-semibold text-sm px-6 py-3 rounded-lg hover:bg-accent hover:text-navy transition-all duration-200 no-underline"
            >
              Explore Other Sacred Sites
            </Link>
          </div>
        </div>
      </article>

      {/* More destinations */}
      {others.length > 0 && (
        <div className="px-6 md:px-20 py-16 bg-navy">
          <div className="max-w-screen-xl mx-auto">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">More Sacred Sites</p>
            <h2 className="font-cormorant text-white font-semibold text-[clamp(26px,3vw,36px)] leading-snug mb-8">
              Continue your journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {others.map(g => (
                <DestinationCard key={g.id} dest={g} />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
