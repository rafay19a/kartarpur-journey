import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import logoDark from '../assets/logo-dark.png'

const navLinks = [
  { label: 'Destinations', to: '/destinations' },
  { label: 'Packages', to: '/packages' },
  { label: 'About Us', to: '/about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="glass-nav fixed top-3 inset-x-3 md:inset-x-6 z-50 max-w-screen-xl mx-auto">
      <div className="glass-smoke" aria-hidden="true"><span /><span /></div>
      {/* 60px tall + 12px offset keeps the existing top-[72px] sticky bars aligned */}
      <div className="relative flex items-center justify-between h-[60px] px-5 md:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center no-underline flex-shrink-0">
          <img
            src={logoDark}
            alt="Kartarpur Journey"
            className="h-11 md:h-12 w-auto object-contain mr-4"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="text-gray-800 hover:text-accent text-sm tracking-wide font-medium transition-colors duration-200 no-underline"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/about" className="text-gray-700 hover:text-gray-900 text-sm transition-colors no-underline">
            Sign In
          </Link>
          <Link
            to="/packages"
            className="bg-gold-gradient text-navy font-semibold text-sm px-5 py-2.5 rounded-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-200 no-underline"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-gray-800 p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <Icon name={menuOpen ? 'x' : 'menu'} size={24} color="#1f2937" />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="relative md:hidden border-t border-white/50 px-5 py-4 flex flex-col gap-4">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="text-gray-800 hover:text-accent text-base py-1 transition-colors no-underline font-medium"
            >
              {label}
            </Link>
          ))}
          <Link
            to="/packages"
            onClick={() => setMenuOpen(false)}
            className="bg-gold-gradient text-navy font-semibold text-sm px-5 py-3 rounded-lg text-center mt-2 no-underline"
          >
            Book Now
          </Link>
        </div>
      )}
    </nav>
  )
}
