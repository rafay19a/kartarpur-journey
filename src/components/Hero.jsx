import { useNavigate } from 'react-router-dom'
import GurdwaraBg from './GurdwaraBg'
import Icon from './Icon'
import Stat from './Stat'
import logoLight from '../assets/logo-light.png'
import { whatsappUrl } from '../lib/contact'

// ─────────────────────────────────────────────────────────────────────────────
// Hero background image
// Drop your custom image at:  src/assets/hero/hero-background.jpg
// (also accepts .jpeg / .png / .webp with the same filename stem).
// Vite picks it up automatically on the next dev reload / build — no code
// change required. If the file is missing, the hero falls back to the
// animated <GurdwaraBg /> so the build never breaks.
// ─────────────────────────────────────────────────────────────────────────────
const heroBgModules = import.meta.glob(
  '../assets/hero/hero-background.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
)
const heroBackground = Object.values(heroBgModules)[0]

const stats = [
  { value: '12,000+', label: 'Pilgrims Served' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '14+', label: 'Years Experience' },
  { value: '4.9★', label: 'Average Rating' },
]

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-28 md:pt-32 lg:pt-36 pb-16">
      {/* Background — custom hero image if present, else animated SVG fallback */}
      {heroBackground ? (
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${heroBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      ) : (
        <GurdwaraBg />
      )}

      {/* Overlay — darkened for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[860px] px-6 md:px-10 w-full">

        {/* Logo — responsive width, always sits cleanly below the fixed navbar */}
        <img
          src={logoLight}
          alt="Kartarpur Journey"
          className="w-48 md:w-72 lg:w-96 h-auto object-contain mx-auto mb-8 drop-shadow-[0_0_25px_rgba(255,215,0,0.25)]"
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
            className="btn btn-gold"
          >
            Explore Packages
          </button>

          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <Icon name="phone" size={16} color="white" />
            Contact on WhatsApp
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-4 justify-center flex-wrap">
          {stats.map(({ value, label }) => (
            <Stat key={label} value={value} label={label} variant="dark" />
          ))}
        </div>
      </div>

    </section>
  )
}
