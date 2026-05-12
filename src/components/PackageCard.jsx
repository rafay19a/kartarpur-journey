import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
import PackageImagePlaceholder from './PackageImagePlaceholder'
import { toArray, formatPrice, formatDuration } from '../lib/packages'

export default function PackageCard({ pkg }) {
  const [hovered, setHovered] = useState(false)
  const navigate = useNavigate()

  const locations = toArray(pkg.locations)
  const highlights = toArray(pkg.highlights)
  const goToDetails = () => navigate(`/packages/${pkg.id}`)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-[24px] overflow-hidden bg-white flex flex-col transition-all duration-300 ${
        hovered
          ? 'shadow-[0_32px_80px_rgba(0,0,0,0.18)] -translate-y-2'
          : 'shadow-[0_8px_40px_rgba(0,0,0,0.08)] translate-y-0'
      }`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.34,1.56,0.64,1)' }}
    >
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden bg-navy">
        {pkg.image_url ? (
          <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover" />
        ) : (
          <PackageImagePlaceholder />
        )}

        {pkg.featured && (
          <span className="absolute top-4 left-4 text-[11px] font-bold px-3 py-1.5 rounded-full tracking-[0.06em] uppercase bg-gold-gradient text-navy">
            Featured
          </span>
        )}

        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
          <Icon name="clock" size={12} color="white" />
          {formatDuration(pkg)}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-cormorant text-xl font-semibold text-navy leading-snug mb-3">{pkg.title}</h3>

        {locations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {locations.slice(0, 5).map(loc => (
              <span key={loc} className="text-[11px] text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                {loc}
              </span>
            ))}
          </div>
        )}

        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {highlights.slice(0, 4).map(tag => (
              <span
                key={tag}
                className="flex items-center gap-1 text-[11px] text-accent bg-accent/8 font-medium px-2.5 py-1 rounded-full"
              >
                <Icon name="check" size={10} color="#C8A951" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price row */}
        <div className="flex items-end justify-between pt-4 border-t border-slate-100 mt-auto">
          <div>
            <p className="text-[11px] text-slate-400 mb-0.5">From</p>
            <p className="font-cormorant text-[26px] font-bold text-navy leading-none">
              {formatPrice(pkg.price)}
              <span className="text-[13px] font-normal text-slate-400"> /person</span>
            </p>
          </div>
          <p className="text-sm text-slate-500 text-right max-w-[45%]">{formatDuration(pkg)}</p>
        </div>

        {/* CTA */}
        <button
          onClick={goToDetails}
          className={`w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold border transition-all duration-300 ${
            hovered
              ? 'bg-gold-gradient text-navy border-accent shadow-gold'
              : 'bg-surface text-slate-500 border-slate-200'
          }`}
        >
          View Details
          <Icon name="arrow" size={16} color={hovered ? '#0F172A' : '#475569'} />
        </button>
      </div>
    </div>
  )
}
