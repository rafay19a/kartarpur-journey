import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import PackageCard from '../components/PackageCard'
import DestinationCard from '../components/DestinationCard'
import TestimonialCard from '../components/TestimonialCard'
import FAQItem from '../components/FAQItem'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Icon from '../components/Icon'
import { useFeaturedPackages } from '../hooks/usePackages'
import { destinations } from '../data/destinations'
import { testimonials } from '../data/testimonials'

const faqItems = [
  {
    q: 'Is the Kartarpur Corridor open for UK citizens?',
    a: 'Yes — UK, Canadian and US passport holders can visit via the Kartarpur Corridor. We handle all documentation.',
  },
  {
    q: 'What is included in the visa service?',
    a: 'We provide full documentation support, PEMRA clearance, and liaise with the Pakistan High Commission on your behalf.',
  },
  {
    q: 'Are there separate accommodation options?',
    a: 'We offer Gurdwara langar stays for a traditional experience, or 4–5 star hotels for those requiring more comfort.',
  },
]

const aboutStats = [
  { value: '12K+', label: 'Pilgrims' },
  { value: '14', label: 'Years' },
  { value: '8', label: 'Sacred Sites' },
]

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  const { data: featuredPackages, loading: packagesLoading, error: packagesError } = useFeaturedPackages(3)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar scrolled={scrolled} />

      <Hero />

      <Features />

      {/* Packages section */}
      <section className="py-24 px-6 md:px-20 bg-surface">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">Our Packages</p>
            <h2 className="font-cormorant text-navy font-semibold text-[clamp(32px,4vw,48px)] leading-snug">
              Curated Sacred Journeys
            </h2>
            <p className="text-slate-500 text-base mt-4 max-w-md mx-auto">
              Each itinerary crafted with deep reverence for Sikh heritage and your personal comfort
            </p>
          </div>

          {packagesLoading ? (
            <div className="text-center text-slate-400 py-12">Loading packages…</div>
          ) : packagesError ? (
            <div className="text-center text-red-500 py-12">{packagesError}</div>
          ) : featuredPackages.length === 0 ? (
            <div className="text-center text-slate-400 py-12">No packages available yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {featuredPackages.map(pkg => (
                <PackageCard key={pkg.id} pkg={pkg} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/packages')}
              className="inline-flex items-center gap-2.5 border-2 border-accent text-accent font-semibold text-[15px] px-10 py-3.5 rounded-[14px] tracking-wide hover:bg-accent hover:text-navy transition-all duration-200"
            >
              View All Packages
              <Icon name="arrow" size={16} color="currentColor" />
            </button>
          </div>
        </div>
      </section>

      {/* Destinations section */}
      <section id="destinations" className="py-24 px-6 md:px-20 bg-navy">
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">Sacred Sites</p>
              <h2 className="font-cormorant text-white font-semibold text-[clamp(32px,4vw,48px)] leading-snug">
                Destinations in Pakistan
              </h2>
            </div>
            <button className="flex items-center gap-2 border border-white/20 text-white/70 hover:border-accent hover:text-accent text-sm px-6 py-3 rounded-xl transition-all duration-200 flex-shrink-0">
              Explore All
              <Icon name="arrow" size={14} color="currentColor" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Featured (tall) */}
            <div className="flex flex-col gap-5">
              <DestinationCard dest={destinations[0]} featured />
            </div>
            {/* Three smaller */}
            <div className="flex flex-col gap-5">
              {destinations.slice(1).map(d => (
                <DestinationCard key={d.name} dest={d} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About + FAQ strip */}
      <section
        className="py-20 px-6 md:px-20"
        style={{ background: 'linear-gradient(135deg, rgba(200,169,81,0.1) 0%, white 60%)' }}
      >
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          {/* Left */}
          <div className="flex-1">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">About Us</p>
            <h2 className="font-cormorant text-navy font-semibold text-[clamp(28px,3.5vw,42px)] leading-snug mb-6">
              Journeys Rooted in<br />Faith &amp; Service
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-4">
              Since 2012, Sikh Heritage Journeys has been the most trusted operator for Sikh religious tourism to Pakistan.
              We are committed to the spirit of <em>Seva</em> — selfless service — in everything we do.
            </p>
            <p className="text-slate-500 text-base leading-relaxed mb-9">
              Our team includes Sikh scholars, experienced guides, and a Pakistan-based operations crew who ensure every pilgrim
              experiences these sacred sites with depth, dignity and joy.
            </p>

            <div className="flex gap-4 flex-wrap">
              {aboutStats.map(({ value, label }) => (
                <div key={label} className="text-center px-8 py-5 bg-white rounded-2xl shadow-sm">
                  <p className="font-cormorant text-[32px] font-bold text-accent leading-none">{value}</p>
                  <p className="text-xs text-slate-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: FAQ */}
          <div className="flex-1 flex flex-col gap-4 w-full">
            {faqItems.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-20 bg-surface">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">Testimonials</p>
            <h2 className="font-cormorant text-navy font-semibold text-[clamp(32px,4vw,48px)] leading-snug">
              Words from the Sangat
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  )
}
