// Reusable statistics block. The numeral is set in Playfair Display at the
// original card scale — the typeface is the upgrade, not the size.
//
// Props:
//   value    — string|number (the headline number, e.g. "12,000+", "98%")
//   label    — string         (the quieter caption, e.g. "Pilgrims Served")
//   variant  — 'dark' | 'light'  (chrome to use; default 'light')

export default function Stat({ value, label, variant = 'light' }) {
  const card = variant === 'dark' ? 'stat-card-dark' : 'stat-card-light'
  const labelCls = variant === 'dark' ? 'stat-label-light' : 'stat-label-dark'

  return (
    <div className={card}>
      <div className="stat-value">{value}</div>
      <div className={`stat-label ${labelCls}`}>{label}</div>
    </div>
  )
}
