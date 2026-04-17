import { useState, useEffect } from 'react'
import friendsData from '../data/friends.json'

export function useFriends() {
  const [friends, setFriends] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        setFriends(friendsData)
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }, 900) // Simulated network delay

    return () => clearTimeout(timer)
  }, [])

  const getFriendById = (id) => friends.find(f => f.id === parseInt(id))

  return { friends, loading, error, getFriendById }
}
