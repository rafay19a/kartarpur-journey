import { useEffect, useState, useCallback } from 'react'
import { getGroupsForPackage, getAllGroups } from '../lib/groupsApi'

export function useGroupsForPackage(packageId) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!packageId) { setData([]); setLoading(false); return }
    let active = true
    setLoading(true)
    setError(null)
    getGroupsForPackage(packageId)
      .then(rows => { if (active) setData(rows) })
      .catch(e => { if (active) setError(e.message || 'Failed to load departures') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [packageId])

  return { data, loading, error }
}

export function useAllGroups() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(() => {
    setLoading(true)
    setError(null)
    getAllGroups()
      .then(setData)
      .catch(e => setError(e.message || 'Failed to load groups'))
      .finally(() => setLoading(false))
  }, [])

  useEffect(reload, [reload])

  return { data, loading, error, reload }
}
