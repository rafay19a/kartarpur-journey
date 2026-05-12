import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'

const destinations = [
  'All Sacred Sites',
  'Nankana Sahib, Pakistan',
  'Kartarpur Sahib, Pakistan',
  'Panja Sahib, Pakistan',
  'Sacha Sauda, Pakistan',
]

const guestOptions = ['1 Adult', '2 Adults', 'Family (4)', 'Group (8+)']

export default function SearchBar() {
  const navigate = useNavigate()
  const [location, setLocation] = useState('')
  const [checkin, setCheckin] = useState('')
  const [checkout, setCheckout] = useState('')
  const [guests, setGuests] = useState('2 Adults')
  const [focused, setFocused] = useState(null)

  const fieldClass = (field) =>
    `flex-1 px-6 py-4 border-r border-navy/10 cursor-pointer transition-colors duration-200 ${
      focused === field ? 'bg-accent/5' : 'bg-transparent'
    } ${field === 'location' ? 'flex-[2] rounded-l-[20px]' : ''} ${
      field === 'guests' ? 'border-r-0 rounded-r-none' : ''
    }`

  const labelClass = 'block text-[10px] font-semibold tracking-[0.1em] uppercase text-slate-500 mb-1'
  const inputClass =
    'w-full bg-transparent border-none outline-none text-navy text-sm font-sans appearance-none cursor-pointer'

  return (
    <div className="flex items-center bg-white/97 backdrop-blur-xl rounded-[20px] overflow-hidden max-w-[860px] w-full shadow-[0_25px_80px_rgba(0,0,0,0.35),0_0_0_1px_rgba(200,169,81,0.2)]">
      {/* Destination */}
      <div
        className={fieldClass('location')}
        onFocus={() => setFocused('location')}
        onBlur={() => setFocused(null)}
      >
        <span className={labelClass}>Destination</span>
        <div className="flex items-center gap-2">
          <Icon name="map" size={14} color="#C8A951" />
          <select
            value={location}
            onChange={e => setLocation(e.target.value)}
            className={inputClass}
            onFocus={() => setFocused('location')}
            onBlur={() => setFocused(null)}
          >
            {destinations.map(d => (
              <option key={d} value={d === 'All Sacred Sites' ? '' : d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Check-in */}
      <div
        className={fieldClass('checkin')}
        onFocus={() => setFocused('checkin')}
        onBlur={() => setFocused(null)}
      >
        <span className={labelClass}>Check-in</span>
        <div className="flex items-center gap-2">
          <Icon name="calendar" size={14} color="#C8A951" />
          <input
            type="date"
            value={checkin}
            onChange={e => setCheckin(e.target.value)}
            className={inputClass}
            onFocus={() => setFocused('checkin')}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      {/* Check-out */}
      <div
        className={fieldClass('checkout')}
        onFocus={() => setFocused('checkout')}
        onBlur={() => setFocused(null)}
      >
        <span className={labelClass}>Check-out</span>
        <div className="flex items-center gap-2">
          <Icon name="calendar" size={14} color="#C8A951" />
          <input
            type="date"
            value={checkout}
            onChange={e => setCheckout(e.target.value)}
            className={inputClass}
            onFocus={() => setFocused('checkout')}
            onBlur={() => setFocused(null)}
          />
        </div>
      </div>

      {/* Guests */}
      <div
        className={`px-6 py-4 cursor-pointer transition-colors duration-200 ${focused === 'guests' ? 'bg-accent/5' : ''}`}
        onFocus={() => setFocused('guests')}
        onBlur={() => setFocused(null)}
      >
        <span className={labelClass}>Guests</span>
        <div className="flex items-center gap-2">
          <Icon name="users" size={14} color="#C8A951" />
          <select
            value={guests}
            onChange={e => setGuests(e.target.value)}
            className={inputClass}
            onFocus={() => setFocused('guests')}
            onBlur={() => setFocused(null)}
          >
            {guestOptions.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      {/* Search button */}
      <button
        onClick={() => navigate('/packages')}
        className="m-2 bg-gold-gradient text-navy font-semibold text-sm px-7 py-4 rounded-[14px] flex items-center gap-2.5 whitespace-nowrap shadow-gold hover:scale-[1.03] hover:shadow-gold-lg transition-all duration-200 flex-shrink-0"
      >
        <Icon name="search" size={16} color="#0F172A" />
        Search
      </button>
    </div>
  )
}
