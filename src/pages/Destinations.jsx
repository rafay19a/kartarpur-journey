import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DestinationCard from '../components/DestinationCard'
import { gurdwaras } from '../data/gurdwaras'

export default function Destinations() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen bg-surface">
      <Navbar scrolled={scrolled} />

      {/* Page header */}
      <div className="bg-navy pt-32 pb-16 px-6 md:px-20 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">Sacred Sites</p>
        <h1 className="font-cormorant text-white font-semibold text-[clamp(36px,5vw,60px)] leading-snug mb-4">
          Gurdwaras in Pakistan
        </h1>
        <p className="text-white/60 text-base max-w-xl mx-auto">
          Discover the sacred shrines that mark the life and journeys of Guru Nanak Dev Ji and the Sikh Gurus
        </p>
      </div>

      {/* Grid */}
      <div className="px-6 md:px-20 py-16 bg-navy">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gurdwaras.map(g => (
            <DestinationCard key={g.id} dest={g} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
