import { useEffect, useState, useCallback } from 'react'
import { getPackages, getFeaturedPackages, getPackageById } from '../lib/packagesApi'

// Full list (used by the /packages page and the admin list).
export function usePackagesList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(() => {
    setLoading(true)
    setError(null)
    getPackages()
      .then(setData)
      .catch(e => setError(e.message || 'Failed to load packages'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(reload, [reload])

  return { data, loading, error, reload }
}

// Featured packages for the homepage. Falls back to the newest packages
// if none are flagged as featured yet.
export function useFeaturedPackages(limit = 3) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    getFeaturedPackages(limit)
      .then(async featured => {
        if (featured && featured.length) return featured
        const all = await getPackages()
        return all.slice(0, limit)
      })
      .then(rows => { if (active) setData(rows) })
      .catch(e => { if (active) setError(e.message || 'Failed to load packages') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [limit])

  return { data, loading, error }
}

// Single package by id (used by package details + booking).
export function usePackage(id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return
    let active = true
    setLoading(true)
    setError(null)
    getPackageById(id)
      .then(row => { if (active) setData(row) })
      .catch(e => { if (active) setError(e.message || 'Package not found') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id])

  return { data, loading, error }
}
