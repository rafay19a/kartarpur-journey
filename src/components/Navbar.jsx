import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from './Icon'
import logoDark from '../assets/logo-dark.png'

const navLinks = [
  { label: 'Destinations', to: '/#destinations' },
  { label: 'Packages', to: '/packages' },
  { label: 'About Us', to: '/about' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="flex items-center justify-between h-[72px] px-6 md:px-12 max-w-screen-xl mx-auto">

        {/* Logo */}
        <Link to="/" className="flex items-center no-underline flex-shrink-0">
          <img
            src={logoDark}
            alt="Kartarpur Journey"
            className="h-12 md:h-14 lg:h-16 w-auto object-contain mr-4"
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
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
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
