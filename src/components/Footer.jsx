import { useState } from 'react'
import { Link } from 'react-router-dom'
import logoLight from '../assets/logo-light.png'
import { gurdwaras } from '../data/gurdwaras'
import { usePackagesList } from '../hooks/usePackages'
import { CONTACT_EMAIL, MAILTO_URL, WHATSAPP_DISPLAY, whatsappUrl } from '../lib/contact'
import ContactModal from './ContactModal'

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms of Service', to: '/terms-of-service' },
  { label: 'Cookie Policy', to: '/cookie-policy' },
]

export default function Footer() {
  const { data: packages, loading: packagesLoading } = usePackagesList()
  const [contactOpen, setContactOpen] = useState(false)

  // Show at most 5 package titles in the footer column.
  const footerPackages = packages.slice(0, 5)

  return (
    <footer className="bg-[#070D1A] pt-16 pb-10 px-6 md:px-20 text-white/60">
      <div className="max-w-screen-xl mx-auto">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <img
                src={logoLight}
                alt="Kartarpur Journey"
                className="h-14 md:h-16 w-auto object-contain mb-4 opacity-90 drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]"
              />
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              Pakistan's most trusted Sikh religious tourism specialist. Serving the global Sikh community with seva and sincerity.
            </p>

            {/* Direct contact lines — replaces the old certification badges */}
            <div className="flex flex-col gap-2 text-sm">
              <a
                href={MAILTO_URL}
                className="text-white/55 hover:text-accent transition-colors no-underline"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/55 hover:text-accent transition-colors no-underline"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <p className="text-white text-xs font-semibold tracking-[0.08em] uppercase mb-5">Destinations</p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {gurdwaras.map(g => (
                <li key={g.id}>
                  <Link
                    to={`/destinations/${g.id}`}
                    className="text-sm text-white/50 hover:text-accent transition-colors duration-200 no-underline"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Packages — live from Supabase */}
          <div>
            <p className="text-white text-xs font-semibold tracking-[0.08em] uppercase mb-5">Packages</p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {packagesLoading && footerPackages.length === 0 ? (
                <li className="text-sm text-white/30">Loading…</li>
              ) : footerPackages.length === 0 ? (
                <li>
                  <Link
                    to="/packages"
                    className="text-sm text-white/50 hover:text-accent transition-colors duration-200 no-underline"
                  >
                    Browse all packages
                  </Link>
                </li>
              ) : (
                <>
                  {footerPackages.map(pkg => (
                    <li key={pkg.id}>
                      <Link
                        to={`/packages/${pkg.id}`}
                        className="text-sm text-white/50 hover:text-accent transition-colors duration-200 no-underline"
                      >
                        {pkg.title}
                      </Link>
                    </li>
                  ))}
                  {packages.length > footerPackages.length && (
                    <li>
                      <Link
                        to="/packages"
                        className="text-sm text-accent/80 hover:text-accent transition-colors duration-200 no-underline"
                      >
                        View all →
                      </Link>
                    </li>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-white text-xs font-semibold tracking-[0.08em] uppercase mb-5">Company</p>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-white/50 hover:text-accent transition-colors duration-200 no-underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="text-sm text-white/50 hover:text-accent transition-colors duration-200 bg-transparent border-0 p-0 cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2026 Kartarpur Journey Ltd. All rights reserved.</p>
          <div className="flex gap-6 items-center flex-wrap justify-center">
            {legalLinks.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-xs text-white/40 hover:text-accent transition-colors no-underline"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-[11px] text-white/15 hover:text-white/40 transition-colors no-underline"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>

      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </footer>
  )
}
