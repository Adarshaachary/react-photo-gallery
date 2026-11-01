import 'dotenv/config'
import express from 'express'

const app = express()
const port = process.env.PORT || 3001
const pixabayApiKey = process.env.PIXABAY_API_KEY
const cacheDuration = 24 * 60 * 60 * 1000
const cache = new Map()

function getCacheKey({ page, perPage, order, username }) {
  return `${page}:${perPage}:${order}:${username}`
}

app.get('/api/photos', async (request, response) => {
  const page = Number.parseInt(request.query.page, 10) || 1
  const perPage = Math.min(Number.parseInt(request.query.per_page, 10) || 200, 200)
  const order = request.query.order === 'latest' ? 'latest' : 'popular'
  const username = typeof request.query.username === 'string'
    ? request.query.username.trim()
    : ''

  if (username && !/^[\w.-]+$/.test(username)) {
    return response.status(400).json({
      error: 'Please provide a valid Pixabay username.',
    })
  }

  if (!pixabayApiKey) {
    return response.status(500).json({
      error: 'PIXABAY_API_KEY is not configured on the backend.',
    })
  }

  const cacheKey = getCacheKey({ page, perPage, order, username })
  const cachedResult = cache.get(cacheKey)

  if (cachedResult && Date.now() - cachedResult.createdAt < cacheDuration) {
    return response.json(cachedResult.data)
  }

  try {
    const url = new URL('https://pixabay.com/api/')
    url.searchParams.set('key', pixabayApiKey)
    url.searchParams.set('image_type', 'photo')
    url.searchParams.set('safesearch', 'true')
    url.searchParams.set('per_page', String(perPage))
    url.searchParams.set('page', String(page))
    url.searchParams.set('order', order)
    if (username) {
      url.searchParams.set('q', `user:${username}`)
    }

    const pixabayResponse = await fetch(url)

    if (!pixabayResponse.ok) {
      return response.status(pixabayResponse.status).json({
        error: `Pixabay request failed with status ${pixabayResponse.status}.`,
      })
    }

    const data = await pixabayResponse.json()
    const result = {
      hits: Array.isArray(data.hits) ? data.hits : [],
      totalHits: Number.isFinite(data.totalHits) ? data.totalHits : 0,
    }
    cache.set(cacheKey, { createdAt: Date.now(), data: result })
    return response.json(result)
  } catch {
    return response.status(502).json({
      error: 'The Pixabay service could not be reached. Please try again.',
    })
  }
})

app.listen(port, () => {
  console.log(`Photo Gallery API listening on http://localhost:${port}`)
})
