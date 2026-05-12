import { useState } from 'react'
import Icon from './Icon'

export default function DestinationCard({ dest, featured = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-[20px] overflow-hidden cursor-pointer transition-all duration-300 ${
        featured ? 'row-span-2' : ''
      } ${hovered ? 'shadow-[0_20px_60px_rgba(0,0,0,0.3)] scale-[1.02]' : 'shadow-[0_4px_20px_rgba(0,0,0,0.1)] scale-100'}`}
      style={{ height: featured ? '460px' : '220px' }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(160deg, ${dest.color1} 0%, ${dest.color2}22 100%)` }}
      >
        <svg width="100%" height="100%" viewBox="0 0 400 460" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <circle cx="200" cy="160" r="100" fill={dest.color2} opacity="0.08" />
          <circle cx="200" cy="160" r="60" fill={dest.color2} opacity="0.1" />
          <rect x="170" y="180" width="60" height="70" fill={dest.color2} opacity="0.2" rx="2" />
          <polygon points="200,130 165,180 235,180" fill={dest.color2} opacity="0.25" />
          <rect x="190" y="110" width="20" height="22" fill={dest.color2} opacity="0.3" rx="10" />
          <rect x="197" y="95" width="6" height="17" fill={dest.color2} opacity="0.4" />
        </svg>
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(to top, rgba(10,18,35,0.9) 0%, rgba(10,18,35,0.1) 60%)',
          opacity: hovered ? 1 : 0.85,
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-1.5 mb-1.5">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: dest.color2, boxShadow: `0 0 8px ${dest.color2}` }}
          />
          <span className="text-white/60 text-[11px] tracking-[0.1em] uppercase">{dest.country}</span>
        </div>

        <h3
          className="font-cormorant font-semibold text-white leading-snug mb-1.5"
          style={{ fontSize: featured ? '26px' : '18px' }}
        >
          {dest.name}
        </h3>

        {featured && (
          <p className="text-white/65 text-[13px] mb-3">{dest.tagline}</p>
        )}

        <div className="flex items-center justify-between">
          <span
            className="text-[11px] px-2.5 py-1 rounded-full border"
            style={{
              color: dest.color2,
              background: `${dest.color2}22`,
              borderColor: `${dest.color2}44`,
            }}
          >
            {dest.pilgrims} pilgrims
          </span>

          <div
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
            style={{
              background: hovered ? dest.color2 : 'rgba(255,255,255,0.15)',
            }}
          >
            <Icon name="arrow" size={14} color={hovered ? '#0F172A' : 'white'} />
          </div>
        </div>
      </div>
    </div>
  )
}
