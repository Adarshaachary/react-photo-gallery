import { useCallback, useEffect, useRef, useState } from 'react'

const PHOTOS_PER_PAGE = 200
const API_URL = '/api/photos'

function normalizePhoto(photo) {
  return {
    id: String(photo.id),
    imageUrl: photo.webformatURL,
    largeImageUrl: photo.largeImageURL,
    author: photo.user,
    photographerId: photo.user_id,
    photographerImageUrl: photo.userImageURL,
    photoUrl: photo.pageURL,
    source: 'pixabay',
  }
}

function getErrorMessage(response, payload) {
  if (payload?.error) {
    return payload.error
  }

  return `Pixabay request failed with status ${response.status}.`
}

export default function useFetchPhotos() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalHits, setTotalHits] = useState(0)
  const activeUsername = useRef('')

  const fetchPage = useCallback(async (pageNumber, append = false) => {
    if (append) {
      setLoadingMore(true)
    } else {
      setLoading(true)
    }
    setError('')

    try {
      const params = new URLSearchParams({
        image_type: 'photo',
        safesearch: 'true',
        per_page: String(PHOTOS_PER_PAGE),
        page: String(pageNumber),
        order: 'popular',
      })
      if (activeUsername.current) {
        params.set('username', activeUsername.current)
      }

      const response = await fetch(`${API_URL}?${params}`)
      const responseText = await response.text()
      let payload

      try {
        payload = responseText ? JSON.parse(responseText) : {}
      } catch {
        throw new Error(`The photo service returned an invalid response (HTTP ${response.status}).`)
      }

      if (!response.ok) {
        throw new Error(getErrorMessage(response, payload))
      }

      const nextPhotos = payload.hits.map(normalizePhoto)
      setPhotos((currentPhotos) => {
        const existingIds = new Set(currentPhotos.map((photo) => photo.id))
        const uniquePhotos = nextPhotos.filter((photo) => !existingIds.has(photo.id))
        return append ? [...currentPhotos, ...uniquePhotos] : uniquePhotos
      })
      setTotalHits(payload.totalHits || 0)
      setPage(pageNumber)
    } catch (requestError) {
      setError(
        requestError instanceof TypeError
          ? 'The photo service is unavailable. Start the Express backend with "npm start" and try again.'
          : requestError.message || 'We could not load photos. Please try again.',
      )
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [])

  useEffect(() => {
    fetchPage(1)
  }, [fetchPage])

  const loadMore = useCallback(() => {
    if (!loadingMore && photos.length < totalHits) {
      fetchPage(page + 1, true)
    }
  }, [fetchPage, loadingMore, page, photos.length, totalHits])

  const searchPhotos = useCallback((username) => {
    activeUsername.current = username.trim()
    fetchPage(1)
  }, [fetchPage])

  const clearSearch = useCallback(() => {
    activeUsername.current = ''
    fetchPage(1)
  }, [fetchPage])

  return {
    photos,
    loading,
    loadingMore,
    error,
    hasMore: photos.length < totalHits,
    loadMore,
    searchPhotos,
    clearSearch,
    retry: () => fetchPage(1),
  }
}
