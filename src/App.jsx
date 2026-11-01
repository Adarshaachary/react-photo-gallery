import { useEffect, useMemo, useState } from 'react'
import './App.css'

const PIXABAY_API_URL = 'https://pixabay.com/api/'
const DEFAULT_QUERY = 'nature'

function App() {
  const apiKey = import.meta.env.VITE_PIXABAY_API_KEY
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!apiKey) {
      setError('Missing VITE_PIXABAY_API_KEY. Add it to your environment to load photos.')
      setPhotos([])
      return
    }

    const controller = new AbortController()

    const loadPhotos = async () => {
      setIsLoading(true)
      setError('')

      try {
        const response = await fetch(
          `${PIXABAY_API_URL}?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(query)}&image_type=photo&per_page=24&safesearch=true`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Unable to fetch photos from Pixabay right now.')
        }

        const data = await response.json()
        setPhotos(data.hits ?? [])
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError('Unable to fetch photos from Pixabay right now.')
          setPhotos([])
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadPhotos()

    return () => controller.abort()
  }, [apiKey, query])

  const hasPhotos = useMemo(() => photos.length > 0, [photos])

  return (
    <main className="gallery-page">
      <header className="gallery-header">
        <h1>React Photo Gallery</h1>
        <p>Responsive gallery powered by React + Pixabay API</p>
      </header>

      <section className="search-panel" aria-label="Photo search">
        <label htmlFor="photo-search">Search photos</label>
        <input
          id="photo-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try: mountains, ocean, city"
        />
      </section>

      {isLoading && <p className="status-message">Loading photos…</p>}
      {!isLoading && error && <p className="status-message error">{error}</p>}
      {!isLoading && !error && !hasPhotos && (
        <p className="status-message">No photos found. Try a different search.</p>
      )}

      {hasPhotos && (
        <section className="gallery-grid" aria-label="Photo results">
          {photos.map((photo) => (
            <article key={photo.id} className="photo-card">
              <img src={photo.webformatURL} alt={photo.tags || 'Pixabay photo'} loading="lazy" />
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
