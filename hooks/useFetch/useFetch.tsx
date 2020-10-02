import { useState, useEffect } from "react"

const useFetch = (url, options = {}) => {
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options)
        const json = await res.json()
        setResponse(json)
      } catch (err) {
        setError(err)
      }
    }
    fetchData()
  }, [options, url])

  return [response, error]
}

export default useFetch
