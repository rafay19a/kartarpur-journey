import { useNavigate } from 'react-router-dom'
import GurdwaraBg from './GurdwaraBg'
import Icon from './Icon'
import logoLight from '../assets/logo-light.png'

const stats = [
  { value: '12,000+', label: 'Pilgrims Served' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '14+', label: 'Years Experience' },
  { value: '4.9★', label: 'Average Rating' },
]

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <GurdwaraBg />

      {/* Overlay — darkened for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[860px] px-6 md:px-10">

        {/* Logo */}
        <img
          src={logoLight}
          alt="Kartarpur Journey"
          className="h-24 md:h-28 lg:h-32 w-auto object-contain mx-auto mb-8 mt-10 drop-shadow-[0_0_25px_rgba(255,215,0,0.25)]"
        />

        <h1
          className="font-cormorant font-semibold text-white leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(42px, 6vw, 76px)', textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
        >
          Experience the<br />
          <span className="text-accent">Sacred Heritage</span> of Sikhism
        </h1>

        <p className="text-white/90 text-lg leading-relaxed max-w-[620px] mx-auto mb-10 font-light">
          Embark on a soul-enriching journey to revered Sikh destinations in Pakistan with comfort, care, and respect.
        </p>

        {/* CTA buttons */}
        <div className="flex gap-4 justify-center mb-14 flex-wrap">
          <button
            onClick={() => navigate('/packages')}
            className="bg-gold-gradient text-navy font-semibold text-[15px] px-9 py-4 rounded-[14px] shadow-gold-lg hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(200,169,81,0.7)] transition-all duration-200"
          >
            Explore Packages
          </button>

          <a
            href="https://wa.me/923357111133"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-white/8 backdrop-blur-sm text-white border border-white/35 text-[15px] font-medium px-9 py-4 rounded-[14px] hover:bg-white/15 hover:border-white/60 transition-all duration-200 no-underline"
          >
            <Icon name="phone" size={16} color="white" />
            Contact on WhatsApp
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center flex-wrap">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white/8 backdrop-blur-sm border border-accent/20 rounded-2xl px-7 py-4 text-center"
            >
              <div className="text-accent text-[28px] font-bold font-cormorant leading-none">{value}</div>
              <div className="text-white/60 text-xs mt-1 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
