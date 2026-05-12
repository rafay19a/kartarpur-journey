// Elegant fallback shown in package cards when `image_url` is null/empty.
// Dark navy gradient + subtle golden glow + faint Gurdwara silhouette. No Khanda.
// Fills its parent, so the card keeps its own dimensions / rounded corners / overlays.
export default function PackageImagePlaceholder({ className = '' }) {
  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#162847] to-[#0a1423] ${className}`}
      aria-hidden="true"
    >
      {/* Warm golden glow rising from the horizon */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-12 w-3/4 h-40 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse at center, rgba(200,169,81,0.40), rgba(200,169,81,0) 70%)' }}
      />
      {/* Soft top-corner accent */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(200,169,81,0.18), rgba(200,169,81,0) 70%)' }}
      />

      {/* Faint Gurdwara silhouette, anchored to the bottom */}
      <svg
        viewBox="0 0 400 220"
        preserveAspectRatio="xMidYMax slice"
        className="absolute inset-0 w-full h-full"
      >
        {/* still-water reflection line */}
        <line x1="0" y1="201" x2="400" y2="201" stroke="#C8A951" strokeOpacity="0.14" strokeWidth="1" />

        {/* left chattri */}
        <g fill="#C8A951" fillOpacity="0.12">
          <rect x="118" y="172" width="30" height="30" rx="2" />
          <ellipse cx="133" cy="170" rx="15" ry="12" />
          <rect x="131" y="150" width="4" height="12" />
          <circle cx="133" cy="147" r="3.5" />
        </g>

        {/* right chattri */}
        <g fill="#C8A951" fillOpacity="0.12">
          <rect x="252" y="172" width="30" height="30" rx="2" />
          <ellipse cx="267" cy="170" rx="15" ry="12" />
          <rect x="265" y="150" width="4" height="12" />
          <circle cx="267" cy="147" r="3.5" />
        </g>

        {/* central shrine */}
        <g fill="#C8A951" fillOpacity="0.18">
          <rect x="158" y="148" width="84" height="54" rx="3" />
          {/* arched doorway */}
          <path d="M188 202 v-26 a12 12 0 0 1 24 0 v26 z" fill="#0a1423" fillOpacity="0.5" />
          {/* upper tier */}
          <rect x="170" y="120" width="60" height="30" rx="3" />
          {/* main onion dome */}
          <ellipse cx="200" cy="118" rx="34" ry="26" />
          <ellipse cx="200" cy="108" rx="20" ry="18" />
          {/* kalash / finial */}
          <rect x="197" y="78" width="6" height="22" />
          <circle cx="200" cy="74" r="6" />
          <rect x="198.5" y="60" width="3" height="14" />
        </g>
      </svg>

      {/* subtle vignette so card text/overlays stay readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/15" />
    </div>
  )
}
