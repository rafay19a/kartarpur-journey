import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logoLight from '../assets/logo-light.png'
import Navbar from '../components/Navbar'
import FAQItem from '../components/FAQItem'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import Icon from '../components/Icon'

const values = [
  { icon: 'heart', title: 'Seva (Selfless Service)', desc: 'Every interaction is rooted in the Sikh principle of selfless service to the Sangat.' },
  { icon: 'shield', title: 'Trust & Safety', desc: 'ATOL protected, fully bonded, and Pakistan Tourism authority approved.' },
  { icon: 'users', title: 'Community First', desc: 'We are Sikhs serving Sikhs. Community feedback shapes every tour we run.' },
  { icon: 'star', title: 'Spiritual Depth', desc: 'Our scholar-guides ensure each site is understood with reverence, not just visited.' },
]

const team = [
  { name: 'Harjit Singh Dhaliwal', role: 'Founder & Lead Guide', initials: 'HD', bio: 'Has led pilgrimages to Pakistan since 2009. Fluent in Punjabi, Urdu and English.' },
  { name: 'Paramvir Kaur', role: 'Operations Director', initials: 'PK', bio: 'Based in Lahore, Paramvir manages all on-ground logistics, hotel partnerships and transport.' },
  { name: 'Sukhjinder Bains', role: 'Visa & Documentation Lead', initials: 'SB', bio: 'Former Pakistan High Commission liaison with 100% visa success rate for our clients.' },
]

const faqs = [
  { q: 'Do UK citizens need a visa to visit Pakistan for pilgrimage?', a: 'Yes. UK passport holders require a Pakistani visa. We provide full documentation support and liaise directly with the Pakistan High Commission.' },
  { q: 'Is the Kartarpur Corridor included in all packages?', a: 'The Kartarpur Corridor is included in the Kartarpur Pilgrimage and Grand Yatra packages. The Nankana Express focuses on Lahore and Nankana Sahib.' },
  { q: 'What is the best time of year to travel?', a: 'October–March offers the most comfortable weather. Vaisakhi (April) is spiritually significant but requires early booking due to high demand.' },
  { q: 'Can you arrange trips for large groups or Sangats?', a: 'Yes. We specialise in group bookings of 8+ people with dedicated buses, private gurdwara access arrangements, and group langar coordination.' },
  { q: 'Are the accommodations halal / vegetarian-friendly?', a: 'All meals provided are strictly vegetarian (langar-style). Hotels are selected for cleanliness and proximity to Gurdwaras.' },
]

export default function About() {
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div className="min-h-screen bg-surface">
      <Navbar scrolled={scrolled} />

      {/* Hero */}
      <div className="bg-navy pt-32 pb-20 px-6 text-center">
        <img
          src={logoLight}
          alt="Kartarpur Journey"
          className="h-16 md:h-20 w-auto object-contain mx-auto mb-6 drop-shadow-[0_0_20px_rgba(255,215,0,0.25)]"
        />
        <p className="text-accent text-[11px] tracking-[0.2em] uppercase font-bold mb-3">Our Story</p>
        <h1 className="font-cormorant text-white font-semibold text-[clamp(36px,5vw,60px)] leading-snug mb-4 max-w-2xl mx-auto">
          Journeys Rooted in Faith &amp; Service
        </h1>
        <p className="text-white/60 text-base max-w-xl mx-auto">
          Since 2012, we have guided over 12,000 pilgrims to the most sacred Sikh sites in Pakistan with care, depth, and devotion.
        </p>
      </div>

      {/* Mission */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">Who We Are</p>
            <h2 className="font-cormorant text-navy font-semibold text-[clamp(28px,3.5vw,40px)] leading-snug mb-5">
              Built on Seva, Trusted by the Sangat
            </h2>
            <p className="text-slate-500 text-base leading-relaxed mb-4">
              This is a joint venture of Homeland Group and Roameo Hospitalities, created to provide a seamless, spiritually enriching Sikh pilgrimage experience in Pakistan.
            </p>
            <p className="text-slate-500 text-base leading-relaxed mb-4">
              Backed by the operational strength of Homeland Group and the healthcare excellence of Roameo Hospitalities, we ensure every journey is managed with care, safety, and deep respect for Sikh heritage.
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              Our mission is to offer well-organized, comfortable, and meaningful yatra experiences, connecting pilgrims from around the world to the sacred sites of Sikh history.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '12,000+', label: 'Pilgrims Served' },
              { value: '14', label: 'Years Operating' },
              { value: '98%', label: 'Satisfaction Rate' },
              { value: '8', label: 'Sacred Sites' },
            ].map(({ value, label }) => (
              <div key={label} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center">
                <p className="font-cormorant text-3xl font-bold text-accent mb-1">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">Our Values</p>
            <h2 className="font-cormorant text-navy font-semibold text-[clamp(28px,3.5vw,40px)]">What Guides Us</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon, title, desc }) => (
              <div key={title} className="text-center p-6">
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name={icon} size={24} color="#C8A951" />
                </div>
                <h3 className="font-semibold text-navy text-[15px] mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 md:px-20">
        <div className="max-w-screen-lg mx-auto">
          <div className="text-center mb-12">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">The Team</p>
            <h2 className="font-cormorant text-navy font-semibold text-[clamp(28px,3.5vw,40px)]">The People Behind Your Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {team.map(({ name, role, initials, bio }) => (
              <div key={name} className="bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
                <div className="w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center text-navy font-bold text-lg font-cormorant mb-5">
                  {initials}
                </div>
                <h3 className="font-semibold text-navy text-[16px] mb-0.5">{name}</h3>
                <p className="text-accent text-xs font-medium tracking-wide mb-3">{role}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extended FAQ */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <div className="max-w-screen-md mx-auto">
          <div className="text-center mb-10">
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent mb-3">FAQ</p>
            <h2 className="font-cormorant text-navy font-semibold text-[clamp(28px,3.5vw,40px)]">Common Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  )
}
