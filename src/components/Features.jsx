import Icon from './Icon'
import { features } from '../data/features'

export default function Features() {
  return (
    <section className="bg-surface px-6 md:px-20 pb-16 pt-10">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map(({ icon, title, desc }) => (
          <div
            key={title}
            className="flex items-start gap-4 p-6 bg-white rounded-[20px] shadow-sm border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(15,23,42,0.08)] hover:border-accent/30"
          >
            <div className="w-12 h-12 rounded-[14px] bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Icon name={icon} size={22} color="#C8A951" />
            </div>
            <div>
              <p className="text-[15px] font-semibold text-navy mb-1.5 leading-snug">{title}</p>
              <p className="text-[13px] text-slate-500 leading-[1.7]">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
