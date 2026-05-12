import { Link } from 'react-router-dom'
import logoLight from '../assets/logo-light.png'

const footerLinks = [
  {
    title: 'Destinations',
    links: ['Kartarpur Sahib', 'Nankana Sahib', 'Panja Sahib', 'Sacha Sauda', 'Lahore Gurdwaras'],
  },
  {
    title: 'Packages',
    links: ['Grand Yatra (10 days)', 'Kartarpur Corridor', 'Nankana Express', 'Custom Groups', 'Vaisakhi Special'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Blog', 'Press', 'Careers', 'Contact'],
  },
]

const badges = [
  { label: 'ATOL #12345' },
  { label: 'IATA Certified' },
  { label: 'PTDC Approved' },
]

const legalLinks = ['Privacy Policy', 'Terms of Service', 'Cookie Policy']

export default function Footer() {
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
            <div className="flex gap-3 flex-wrap">
              {badges.map(({ label }) => (
                <span
                  key={label}
                  className="px-3 py-1.5 border border-white/15 rounded-lg text-[11px] tracking-wide text-white/50"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map(({ title, links }) => (
            <div key={title}>
              <p className="text-white text-xs font-semibold tracking-[0.08em] uppercase mb-5">{title}</p>
              <ul className="flex flex-col gap-3 list-none p-0 m-0">
                {links.map(link => (
                  <li key={link}>
                    <Link
                      to="#"
                      className="text-sm text-white/50 hover:text-accent transition-colors duration-200 no-underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">© 2026 Kartarpur Journey Ltd. All rights reserved.</p>
          <div className="flex gap-6 items-center">
            {legalLinks.map(l => (
              <Link
                key={l}
                to="#"
                className="text-xs text-white/40 hover:text-accent transition-colors no-underline"
              >
                {l}
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
    </footer>
  )
}
