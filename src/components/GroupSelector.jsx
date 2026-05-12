import { formatDate } from '../lib/format'

export function seatsBadge(group) {
  const left = group.available_seats ?? 0
  if (group.status === 'full' || left <= 0) return { text: 'Full', cls: 'bg-red-100 text-red-600' }
  if (left <= 5) return { text: `${left} seats left`, cls: 'bg-amber-100 text-amber-700' }
  return { text: `${left} seats left`, cls: 'bg-emerald-100 text-emerald-700' }
}

export default function GroupSelector({ groups, selectedId, onSelect, loading, error }) {
  if (loading) return <p className="text-sm text-slate-400">Loading available departures…</p>
  if (error) return <p className="text-sm text-red-500">{error}</p>

  if (!groups.length) {
    return (
      <p className="text-sm text-slate-500 bg-surface border border-slate-200 rounded-xl p-4">
        No scheduled group departures right now — send your enquiry and our team will share the next available dates.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {groups.map(g => {
        const badge = seatsBadge(g)
        const disabled = (g.available_seats ?? 0) <= 0 || g.status === 'full' || g.status === 'closed'
        const selected = selectedId === g.id
        return (
          <button
            type="button"
            key={g.id}
            onClick={() => !disabled && onSelect(g)}
            disabled={disabled}
            className={`w-full text-left flex items-start gap-3 rounded-xl border p-4 transition-all duration-200 ${
              selected ? 'border-accent bg-accent/5 ring-1 ring-accent' : 'border-slate-200 hover:border-accent/50'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span
              className={`mt-0.5 w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                selected ? 'border-accent bg-accent' : 'border-slate-300 bg-white'
              }`}
            />
            <span className="flex-1 min-w-0">
              <span className="flex items-center justify-between gap-3">
                <span className="font-semibold text-navy">{g.group_name || 'Group Departure'}</span>
                <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${badge.cls}`}>
                  {badge.text}
                </span>
              </span>
              <span className="block text-sm text-slate-500 mt-0.5">
                Departure: {formatDate(g.departure_date)}
                {g.return_date ? ` · Return: ${formatDate(g.return_date)}` : ''}
              </span>
              {g.notes && <span className="block text-xs text-slate-400 mt-1">{g.notes}</span>}
            </span>
          </button>
        )
      })}
    </div>
  )
}
