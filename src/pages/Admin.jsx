import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AdminNav from '../components/admin/AdminNav'
import AdminPackageCard from '../components/admin/AdminPackageCard'
import PackageForm from '../components/admin/PackageForm'
import { usePackagesList } from '../hooks/usePackages'
import { createPackage, updatePackage, deletePackage } from '../lib/packagesApi'

// `editing` states:
//   undefined → modal closed
//   null      → modal open, creating a new package
//   object    → modal open, editing that package
export default function Admin() {
  const { data: packages, loading, error, reload } = usePackagesList()
  const [editing, setEditing] = useState(undefined)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [actionError, setActionError] = useState(null)

  const openNew = () => { setEditing(null); setFormError(null) }
  const openEdit = pkg => { setEditing(pkg); setFormError(null) }
  const closeForm = () => { setEditing(undefined); setFormError(null) }

  const handleSubmit = async payload => {
    setSubmitting(true)
    setFormError(null)
    try {
      if (editing) await updatePackage(editing.id, payload)
      else await createPackage(payload)
      closeForm()
      reload()
    } catch (e) {
      setFormError(e.message || 'Failed to save package')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async pkg => {
    if (!window.confirm(`Delete "${pkg.title}"? This cannot be undone.`)) return
    setDeletingId(pkg.id)
    setActionError(null)
    try {
      await deletePackage(pkg.id)
      reload()
    } catch (e) {
      setActionError(e.message || 'Failed to delete package')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      {/* Page header */}
      <div className="bg-navy pt-28 pb-12 px-6 md:px-20">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-accent text-[11px] tracking-[0.2em] uppercase font-bold mb-2">Admin</p>
            <h1 className="font-cormorant text-white text-[clamp(28px,4vw,44px)] font-semibold">Package Management</h1>
          </div>
          <button
            onClick={openNew}
            className="bg-gold-gradient text-navy font-semibold text-sm px-5 py-2.5 rounded-lg shadow-gold hover:shadow-gold-lg hover:-translate-y-0.5 transition-all duration-200 self-start sm:self-auto"
          >
            + Add Package
          </button>
        </div>
      </div>

      <AdminNav />

      {/* Content */}
      <div className="px-6 md:px-20 py-12">
        <div className="max-w-screen-xl mx-auto">
          {actionError && <p className="text-red-500 text-sm mb-4">{actionError}</p>}

          {loading ? (
            <div className="text-center py-24 text-slate-400">Loading packages…</div>
          ) : error ? (
            <div className="text-center py-24 text-red-500">{error}</div>
          ) : packages.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <p className="text-lg mb-2">No packages yet</p>
              <button onClick={openNew} className="text-accent hover:underline">Add your first package</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {packages.map(pkg => (
                <AdminPackageCard
                  key={pkg.id}
                  pkg={pkg}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                  deleting={deletingId === pkg.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit modal */}
      {editing !== undefined && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-8">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl my-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 sticky top-0 bg-white rounded-t-2xl z-10">
              <h2 className="font-cormorant text-xl font-semibold text-navy">
                {editing ? 'Edit Package' : 'Add Package'}
              </h2>
              <button
                onClick={closeForm}
                aria-label="Close"
                className="text-slate-400 hover:text-slate-700 text-2xl leading-none px-2"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              {formError && <p className="text-red-500 text-sm mb-4">{formError}</p>}
              <PackageForm
                key={editing ? editing.id : 'new'}
                initial={editing || undefined}
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
