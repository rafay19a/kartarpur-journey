import { useState } from 'react'
import Icon from './Icon'

export default function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden shadow-sm transition-all duration-300 ${
        open ? 'border border-accent/25' : 'border border-slate-100'
      }`}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between gap-3 px-6 py-[18px] text-left text-sm font-semibold text-navy font-sans bg-transparent border-none cursor-pointer"
      >
        {q}
        <span
          className={`flex-shrink-0 transition-transform duration-300 ${open ? 'rotate-180' : 'rotate-0'}`}
          style={{ color: open ? '#C8A951' : '#94A3B8' }}
        >
          <Icon name="chevronDown" size={18} color="currentColor" />
        </span>
      </button>

      {open && (
        <div className="px-6 pb-5 pt-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100">
          {a}
        </div>
      )}
    </div>
  )
}
