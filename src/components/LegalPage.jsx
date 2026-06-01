import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

// Shared chrome for the Privacy / Terms / Cookie pages.
// Pass `title`, `eyebrow`, `updated`, and the page content as children.
export default function LegalPage({ eyebrow = 'Legal', title, updated, children }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { window.scrollTo(0, 0) }, [title])

  return (
    <div className="min-h-screen bg-surface">
      <Navbar scrolled={scrolled} />

      {/* Page header */}
      <div className="bg-navy pt-32 pb-16 px-6 md:px-20 text-center">
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">{eyebrow}</p>
        <h1 className="font-cormorant text-white font-semibold text-[clamp(36px,5vw,60px)] leading-snug mb-3">
          {title}
        </h1>
        {updated && (
          <p className="text-white/55 text-sm">Last updated · {updated}</p>
        )}
      </div>

      {/* Body */}
      <article className="px-6 md:px-20 py-16">
        <div className="max-w-[760px] mx-auto legal-prose">
          {children}
        </div>
      </article>

      <Footer />
    </div>
  )
}

// Section heading helper for use inside LegalPage children.
export function LegalSection({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="font-cormorant text-navy font-semibold text-[clamp(22px,2.5vw,30px)] leading-snug mb-4">
        {title}
      </h2>
      <div className="text-slate-600 text-[16px] leading-[1.8] space-y-4">
        {children}
      </div>
    </section>
  )
}
