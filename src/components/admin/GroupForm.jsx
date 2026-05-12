import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const EMPTY = {
  package_id: '',
  group_name: '',
  departure_date: '',
  return_date: '',
  total_seats: '',
  available_seats: '',
  status: 'open',
  notes: '',
  is_active: true,
}

export default function GroupForm({ initial, packages = [], onSubmit, submitting }) {
  const isEdit = Boolean(initial)
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: EMPTY })

  useEffect(() => {
    if (!initial) return
    reset({
      package_id: initial.package_id ?? '',
      group_name: initial.group_name ?? '',
      departure_date: initial.departure_date ?? '',
      return_date: initial.return_date ?? '',
      total_seats: initial.total_seats ?? '',
      available_seats: initial.available_seats ?? '',
      status: initial.status ?? 'open',
      notes: initial.notes ?? '',
      is_active: initial.is_active ?? true,
    })
  }, [initial, reset])

  const submit = v =>
    onSubmit({
      package_id: v.package_id || null,
      group_name: v.group_name.trim(),
      departure_date: v.departure_date || null,
      return_date: v.return_date || null,
      total_seats: v.total_seats === '' ? null : Number(v.total_seats),
      available_seats: v.available_seats === '' ? null : Number(v.available_seats),
      status: v.status,
      notes: v.notes.trim(),
      is_active: Boolean(v.is_active),
    })

  const input = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent transition-colors'
  const label = 'block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1'

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <div>
        <label className={label}>Package *</label>
        <select className={input} {...register('package_id', { required: 'Choose a package' })}>
          <option value="">— Select a package —</option>
          {packages.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
        {errors.package_id && <p className="text-xs text-red-500 mt-1">{errors.package_id.message}</p>}
      </div>

      <div>
        <label className={label}>Group Name *</label>
        <input className={input} placeholder="e.g. Vaisakhi Special Group" {...register('group_name', { required: 'Group name is required' })} />
        {errors.group_name && <p className="text-xs text-red-500 mt-1">{errors.group_name.message}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={label}>Departure Date *</label>
          <input type="date" className={input} {...register('departure_date', { required: 'Departure date is required' })} />
          {errors.departure_date && <p className="text-xs text-red-500 mt-1">{errors.departure_date.message}</p>}
        </div>
        <div>
          <label className={label}>Return Date</label>
          <input type="date" className={input} {...register('return_date')} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label className={label}>Total Seats</label>
          <input type="number" min="0" className={input} {...register('total_seats')} />
        </div>
        <div>
          <label className={label}>Available Seats</label>
          <input type="number" min="0" className={input} {...register('available_seats')} />
        </div>
        <div>
          <label className={label}>Status</label>
          <select className={input} {...register('status')}>
            <option value="open">Open</option>
            <option value="filling">Filling Fast</option>
            <option value="full">Full</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div>
        <label className={label}>Notes</label>
        <textarea rows={3} className={input} placeholder="Anything special about this departure…" {...register('notes')} />
      </div>

      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" className="rounded border-slate-300" {...register('is_active')} />
        Active (visible to customers)
      </label>

      <button
        type="submit"
        disabled={submitting}
        className="bg-gold-gradient text-navy font-semibold text-sm px-6 py-2.5 rounded-lg shadow-gold disabled:opacity-60"
      >
        {submitting ? 'Saving…' : isEdit ? 'Update Group' : 'Create Group'}
      </button>
    </form>
  )
}
