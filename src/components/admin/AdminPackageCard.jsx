import PackageImagePlaceholder from '../PackageImagePlaceholder'
import { toArray, formatPrice, formatDuration } from '../../lib/packages'

export default function AdminPackageCard({ pkg, onEdit, onDelete, deleting }) {
  const locations = toArray(pkg.locations)

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-40 bg-navy">
        {pkg.image_url ? (
          <img src={pkg.image_url} alt={pkg.title} className="w-full h-full object-cover" />
        ) : (
          <PackageImagePlaceholder />
        )}
        {pkg.featured && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.06em] bg-gold-gradient text-navy px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-cormorant text-lg font-semibold text-navy leading-snug mb-1">{pkg.title}</h3>
        <p className="text-sm text-slate-500 mb-3">
          {formatPrice(pkg.price)} <span className="text-slate-300">·</span> {formatDuration(pkg)}
        </p>

        {locations.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {locations.slice(0, 4).map(loc => (
              <span key={loc} className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                {loc}
              </span>
            ))}
            {locations.length > 4 && (
              <span className="text-[11px] text-slate-400 px-1 py-0.5">+{locations.length - 4} more</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto flex gap-2 pt-2">
          <button
            onClick={() => onEdit(pkg)}
            className="flex-1 text-sm font-medium text-navy border border-slate-200 rounded-lg py-2 hover:border-accent hover:text-accent transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(pkg)}
            disabled={deleting}
            className="flex-1 text-sm font-medium text-red-600 border border-red-200 rounded-lg py-2 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
