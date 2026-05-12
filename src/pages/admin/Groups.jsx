import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import AdminNav from '../../components/admin/AdminNav'
import GroupForm from '../../components/admin/GroupForm'
import { useAllGroups } from '../../hooks/useGroups'
import { usePackagesList } from '../../hooks/usePackages'
import { createGroup, updateGroup, deleteGroup } from '../../lib/groupsApi'
import { formatDate } from '../../lib/format'

const statusBadge = {
  open: 'bg-emerald-100 text-emerald-700',
  filling: 'bg-amber-100 text-amber-700',
  full: 'bg-red-100 text-red-600',
  closed: 'bg-slate-100 text-slate-500',
}

export default function Groups() {
  const { data: groups, loading, error, reload } = useAllGroups()
  const { data: packages } = usePackagesList()
  const [editing, setEditing] = useState(undefined) // undefined=closed, null=new, object=edit
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [actionError, setActionError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)

  const pkgName = id => packages.find(p => p.id === id)?.title || '—'

  const openNew = () => { setEditing(null); setFormError(null) }
  const openEdit = g => { setEditing(g); setFormError(null) }
  const close = () => { setEditing(undefined); setFormError(null) }

  const handleSubmit = async payload => {
    setSubmitting(true)
    setFormError(null)
    try {
      if (editing) await updateGroup(editing.id, payload)
      else await createGroup(payload)
      close()
      reload()
    } catch (e) {
      setFormError(e.message || 'Failed to save group')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async g => {
    if (!window.confirm(`Delete "${g.group_name}"? This cannot be undone.`)) return
    setDeletingId(g.id)
    setActionError(null)
    try {
      await deleteGroup(g.id)
      reload()
    } catch (e) {
      setActionError(e.message || 'Failed to delete group')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <div className="bg-navy pt-28 pb-12 px-6 md:px-20">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-accent text-[11px] tracking-[0.2em] uppercase font-bold mb-2">Admin</p>
            <h1 className="font-cormorant text-white text-[clamp(28px,4vw,44px)] font-semibold">Group Departures</h1>
          </div>
          <button
            onClick={openNew}
            className="bg-gold-gradient text-navy font-semibold text-sm px-5 py-2.5 rounded-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-200 self-start sm:self-auto"
          >
            + Add Group
          </button>
        </div>
      </div>

      <AdminNav />

      <div className="px-6 md:px-20 py-12">
        <div className="max-w-screen-xl mx-auto">
          {actionError && <p className="text-red-500 text-sm mb-4">{actionError}</p>}

          {loading ? (
            <div className="text-center py-24 text-slate-400">Loading groups…</div>
          ) : error ? (
            <div className="text-center py-24 text-red-500">{error}</div>
          ) : groups.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-lg mb-2">No group departures yet</p>
              <button onClick={openNew} className="text-accent hover:underline">Create your first group</button>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-500 text-left">
                  <tr>
                    <th className="px-4 py-3 font-medium">Group</th>
                    <th className="px-4 py-3 font-medium">Package</th>
                    <th className="px-4 py-3 font-medium">Departure</th>
                    <th className="px-4 py-3 font-medium">Return</th>
                    <th className="px-4 py-3 font-medium">Seats</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Active</th>
                    <th className="px-4 py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {groups.map(g => (
                    <tr key={g.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium text-slate-700">{g.group_name}</td>
                      <td className="px-4 py-3 text-slate-600">{pkgName(g.package_id)}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{formatDate(g.departure_date)}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{g.return_date ? formatDate(g.return_date) : '—'}</td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        {g.available_seats ?? '—'}{g.total_seats ? ` / ${g.total_seats}` : ''}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${statusBadge[g.status] || 'bg-slate-100 text-slate-500'}`}>
                          {g.status || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {g.is_active ? <span className="text-xs text-emerald-600">Yes</span> : <span className="text-xs text-slate-400">No</span>}
                      </td>
                      <td className="px-4 py-3 text-right space-x-4 whitespace-nowrap">
                        <button onClick={() => openEdit(g)} className="text-accent hover:underline">Edit</button>
                        <button
                          onClick={() => handleDelete(g)}
                          disabled={deletingId === g.id}
                          className="text-red-500 hover:underline disabled:opacity-50"
                        >
                          {deletingId === g.id ? 'Deleting…' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {editing !== undefined && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-8">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <h2 className="font-cormorant text-xl font-semibold text-navy">{editing ? 'Edit Group' : 'Add Group'}</h2>
              <button onClick={close} aria-label="Close" className="text-slate-400 hover:text-slate-700 text-2xl leading-none px-2">&times;</button>
            </div>
            <div className="p-6">
              {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
              <GroupForm
                key={editing ? editing.id : 'new'}
                initial={editing || undefined}
                packages={packages}
                onSubmit={handleSubmit}
                submitting={submitting}
              />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
