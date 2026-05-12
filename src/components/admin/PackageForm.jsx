import { useEffect, useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { uploadPackageImage } from '../../lib/packagesApi'
import { toArray, normaliseItinerary } from '../../lib/packages'

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const linesToArray = str => (str || '').split('\n').map(s => s.trim()).filter(Boolean)
const arrayToLines = arr => toArray(arr).join('\n')

const EMPTY_DEFAULTS = {
  title: '',
  slug: '',
  description: '',
  price: '',
  duration: '',
  nights: '',
  locations: '',
  highlights: '',
  included: '',
  excluded: '',
  image_url: '',
  featured: false,
  itinerary: [{ day: 1, title: '', description: '' }],
}

export default function PackageForm({ initial, onSubmit, submitting }) {
  const isEdit = Boolean(initial)
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: EMPTY_DEFAULTS })

  const { fields, append, remove } = useFieldArray({ control, name: 'itinerary' })
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState(null)

  const imageUrl = watch('image_url')
  const titleValue = watch('title')

  // Populate when editing
  useEffect(() => {
    if (!initial) return
    const itinerary = normaliseItinerary(initial.itinerary)
    reset({
      title: initial.title ?? '',
      slug: initial.slug ?? '',
      description: initial.description ?? '',
      price: initial.price ?? '',
      duration: initial.duration ?? '',
      nights: initial.nights ?? '',
      locations: arrayToLines(initial.locations),
      highlights: arrayToLines(initial.highlights),
      included: arrayToLines(initial.included),
      excluded: arrayToLines(initial.excluded),
      image_url: initial.image_url ?? '',
      featured: Boolean(initial.featured),
      itinerary: itinerary.length ? itinerary : [{ day: 1, title: '', description: '' }],
    })
  }, [initial, reset])

  // Auto-fill slug from title when creating a new package
  useEffect(() => {
    if (!isEdit) setValue('slug', slugify(titleValue))
  }, [titleValue, isEdit, setValue])

  const handleImage = async e => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setUploadError(null)
    try {
      const url = await uploadPackageImage(file)
      setValue('image_url', url, { shouldDirty: true })
    } catch (err) {
      setUploadError(err.message || 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const submit = values => {
    const payload = {
      title: values.title.trim(),
      slug: (values.slug || '').trim() || slugify(values.title),
      description: values.description.trim(),
      price: values.price === '' ? null : Number(values.price),
      duration: values.duration === '' ? null : Number(values.duration),
      nights: values.nights === '' ? null : Number(values.nights),
      locations: linesToArray(values.locations),
      highlights: linesToArray(values.highlights),
      included: linesToArray(values.included),
      excluded: linesToArray(values.excluded),
      image_url: values.image_url || null,
      featured: Boolean(values.featured),
      itinerary: values.itinerary
        .filter(it => (it.title && it.title.trim()) || (it.description && it.description.trim()))
        .map((it, i) => ({
          day: Number(it.day) || i + 1,
          title: (it.title || '').trim(),
          description: (it.description || '').trim(),
        })),
    }
    onSubmit(payload)
  }

  const input = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-accent transition-colors'
  const label = 'block text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1'

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-6 max-w-3xl">
      {/* Title + slug */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label}>Title *</label>
          <input className={input} {...register('title', { required: 'Title is required' })} />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
        </div>
        <div>
          <label className={label}>Slug *</label>
          <input className={input} {...register('slug', { required: 'Slug is required' })} />
          {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug.message}</p>}
        </div>
      </div>

      {/* Description */}
      <div>
        <label className={label}>Description *</label>
        <textarea rows={4} className={input} {...register('description', { required: 'Description is required' })} />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      {/* Price / duration / nights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label className={label}>Price (£) *</label>
          <input type="number" step="0.01" className={input} {...register('price', { required: 'Price is required' })} />
          {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price.message}</p>}
        </div>
        <div>
          <label className={label}>Duration (days)</label>
          <input type="number" className={input} {...register('duration')} />
        </div>
        <div>
          <label className={label}>Nights</label>
          <input type="number" className={input} {...register('nights')} />
        </div>
      </div>

      {/* Image */}
      <div>
        <label className={label}>Package Image</label>
        <div className="flex items-center gap-4">
          {imageUrl ? (
            <img src={imageUrl} alt="" className="w-28 h-20 object-cover rounded-lg border border-slate-200" />
          ) : (
            <div className="w-28 h-20 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-400">
              No image
            </div>
          )}
          <div>
            <input type="file" accept="image/*" onChange={handleImage} className="text-sm" />
            {uploading && <p className="text-xs text-slate-400 mt-1">Uploading…</p>}
            {uploadError && <p className="text-xs text-red-500 mt-1">{uploadError}</p>}
          </div>
        </div>
        <input type="hidden" {...register('image_url')} />
      </div>

      {/* List fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={label}>Locations (one per line)</label>
          <textarea rows={4} className={input} placeholder={'Nankana Sahib\nKartarpur Sahib\nLahore'} {...register('locations')} />
        </div>
        <div>
          <label className={label}>Highlights (one per line)</label>
          <textarea rows={4} className={input} placeholder={'Visa support\nGuided tour\nFull board meals'} {...register('highlights')} />
        </div>
        <div>
          <label className={label}>Included (one per line)</label>
          <textarea rows={4} className={input} placeholder={'Hotel stay\nAll transfers\nLangar at Gurdwaras'} {...register('included')} />
        </div>
        <div>
          <label className={label}>Excluded (one per line)</label>
          <textarea rows={4} className={input} placeholder={'International flights\nPersonal expenses'} {...register('excluded')} />
        </div>
      </div>

      {/* Itinerary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className={label + ' mb-0'}>Itinerary</span>
          <button
            type="button"
            onClick={() => append({ day: fields.length + 1, title: '', description: '' })}
            className="text-xs text-accent hover:underline"
          >
            + Add day
          </button>
        </div>
        <div className="space-y-3">
          {fields.map((field, i) => (
            <div key={field.id} className="border border-slate-200 rounded-lg p-3 grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-3 items-start">
              <input type="number" placeholder="Day" className={input} {...register(`itinerary.${i}.day`)} />
              <div className="space-y-2">
                <input placeholder="Title" className={input} {...register(`itinerary.${i}.title`)} />
                <textarea rows={2} placeholder="Description" className={input} {...register(`itinerary.${i}.description`)} />
              </div>
              <button type="button" onClick={() => remove(i)} className="text-red-500 text-xs hover:underline mt-2">
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Featured */}
      <label className="flex items-center gap-2 text-sm text-slate-700">
        <input type="checkbox" {...register('featured')} className="rounded border-slate-300" />
        Show on homepage (featured)
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting || uploading}
          className="bg-gold-gradient text-navy font-semibold text-sm px-6 py-2.5 rounded-lg shadow-gold disabled:opacity-60"
        >
          {submitting ? 'Saving…' : isEdit ? 'Update Package' : 'Create Package'}
        </button>
      </div>
    </form>
  )
}
