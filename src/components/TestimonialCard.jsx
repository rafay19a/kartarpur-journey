import Icon from './Icon'

export default function TestimonialCard({ testimonial }) {
  const { name, location, text, rating, trip, initials } = testimonial

  return (
    <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col">
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: rating }).map((_, i) => (
          <Icon key={i} name="star" size={16} color="#C8A951" />
        ))}
      </div>

      {/* Quote */}
      <p className="font-cormorant italic text-[15px] text-slate-700 leading-[1.75] flex-1 mb-6">
        "{text}"
      </p>

      {/* Author */}
      <div className="flex items-center justify-between pt-5 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-accent/15 border-2 border-accent/20 flex items-center justify-center text-sm font-bold text-accent flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-navy">{name}</p>
            <p className="text-xs text-slate-400">{location}</p>
          </div>
        </div>
        <span className="text-[11px] text-accent bg-accent/10 px-2.5 py-1 rounded-full hidden sm:block">
          {trip}
        </span>
      </div>
    </div>
  )
}
