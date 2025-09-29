import { useState, useEffect } from 'react'

/**
 * Custom hook for fetching data from an API
 * Provides loading, error, and data states
 * 
 * @param {string} url - The URL to fetch data from
 * @param {object} options - Additional fetch options
 * @returns {object} - { data, loading, error, refetch }
 */
export function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (url) {
      fetchData()
    }
  }, [url])

  const refetch = () => {
    fetchData()
  }

  return { data, loading, error, refetch }
}
