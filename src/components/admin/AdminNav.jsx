import { NavLink } from 'react-router-dom'

const tabs = [
  { to: '/admin', label: 'Packages', end: true },
  { to: '/admin/groups', label: 'Group Departures', end: false },
  { to: '/admin/enquiries', label: 'Enquiries', end: false },
]

export default function AdminNav() {
  return (
    <div className="bg-white border-b border-slate-200 px-6 md:px-20 sticky top-[72px] z-30">
      <div className="max-w-screen-xl mx-auto flex gap-1 overflow-x-auto">
        {tabs.map(({ to, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive ? 'border-accent text-accent' : 'border-transparent text-slate-500 hover:text-navy'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </div>
  )
}
