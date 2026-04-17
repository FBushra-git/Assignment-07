import { useState, useEffect } from 'react'

const STORAGE_KEY = 'kinkeeper_timeline'

export function useTimeline() {
  const [entries, setEntries] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  }, [entries])

  const addEntry = (entry) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      ...entry,
    }
    setEntries(prev => [newEntry, ...prev])
    return newEntry
  }

  const clearAll = () => setEntries([])

  return { entries, addEntry, clearAll }
}
