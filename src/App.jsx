import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import Gallery, { GallerySkeleton } from './components/Gallery'
import SearchBar from './components/SearchBar'
import useFetchPhotos from './hooks/useFetchPhotos'
import favouritesReducer, { getInitialFavourites } from './reducers/favouritesReducer'

function App() {
  const {
    photos,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    searchPhotos,
    clearSearch,
    retry,
  } = useFetchPhotos()
  const [activeSection, setActiveSection] = useState('explore')
  const [searchTerm, setSearchTerm] = useState('')
  const [submittedSearch, setSubmittedSearch] = useState('')
  const [toast, setToast] = useState('')
  const [removingIds, setRemovingIds] = useState([])
  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites,
  )

  useEffect(() => {
    localStorage.setItem('photo-gallery-favourites', JSON.stringify(favourites))
  }, [favourites])

  useEffect(() => {
    if (!toast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => setToast(''), 2200)
    return () => window.clearTimeout(timeoutId)
  }, [toast])

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value)
  }, [])

  const handleClearSearch = useCallback(() => {
    setSearchTerm('')
    setSubmittedSearch('')
    clearSearch()
  }, [clearSearch])

  const handleSearchSubmit = useCallback((event) => {
    event.preventDefault()
    const username = searchTerm.trim()
    if (!username) {
      handleClearSearch()
      return
    }
    setSubmittedSearch(username)
    searchPhotos(username)
  }, [handleClearSearch, searchPhotos, searchTerm])

  const filteredPhotos = useMemo(() => {
    const normalizedSearch = submittedSearch.toLowerCase()

    if (!normalizedSearch) {
      return photos
    }

    return photos
  }, [photos, submittedSearch])

  const handleToggleFavourite = useCallback((photo) => {
    const isSaved = favourites.some((favourite) => favourite.id === photo.id)
    const isRemovingFromSaved = activeSection === 'saved' && isSaved

    setToast(isSaved ? 'Removed from Saved' : 'Added to Saved')

    if (isRemovingFromSaved) {
      setRemovingIds((currentIds) => [...currentIds, photo.id])
      window.setTimeout(() => {
        dispatch({ type: 'toggle', payload: photo })
        setRemovingIds((currentIds) => currentIds.filter((id) => id !== photo.id))
      }, 240)
      return
    }

    dispatch({ type: 'toggle', payload: photo })
  }, [activeSection, favourites])

  const displayedPhotos = activeSection === 'explore' ? filteredPhotos : favourites
  const isSearching = submittedSearch.length > 0

  return (
    <main className="min-h-screen bg-[#0d0d10] text-zinc-100">
      <section className="mx-auto max-w-7xl px-5 pb-10 pt-10 sm:px-8 sm:pt-14 lg:pt-16">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-violet-300">
              {activeSection === 'explore' ? 'Discover something new' : 'Your personal collection'}
            </p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              {activeSection === 'explore' ? 'Explore Photography' : 'Saved Moments'}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-500 sm:text-base">
              {activeSection === 'explore'
                ? 'A quiet collection of images, refreshed for curious eyes.'
                : 'The photographs you want to come back to, all in one place.'}
            </p>
          </div>
          {activeSection === 'explore' && (
            <div className="w-full max-w-md">
              <SearchBar
                value={searchTerm}
                onChange={handleSearchChange}
                onSubmit={handleSearchSubmit}
                onClear={handleClearSearch}
              />
              <p className="mt-3 text-xs text-zinc-600">
                Search Pixabay by photographer username.
              </p>
            </div>
          )}
        </div>
        <nav
          className="mt-10 flex items-center justify-between border-t border-white/[0.07] pt-5"
          aria-label="Primary navigation"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-600">
            Browse collection
          </p>
          <div className="flex items-center gap-1 rounded-xl border border-white/[0.07] bg-white/[0.03] p-1">
            {[
              { id: 'explore', label: 'Explore' },
              { id: 'saved', label: `Saved${favourites.length ? ` · ${favourites.length}` : ''}` },
            ].map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
                  activeSection === section.id
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-200'
                }`}
                aria-current={activeSection === section.id ? 'page' : undefined}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24">
        {loading && <GallerySkeleton count={8} />}
        {!loading && error && (
          <div role="alert" className="fade-in rounded-3xl border border-red-400/20 bg-red-500/[0.06] px-6 py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
              <span className="text-xl">!</span>
            </div>
            <p className="mt-5 text-lg font-semibold text-white">The gallery is taking a moment</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">{error}</p>
            <button
              type="button"
              onClick={retry}
              className="mt-6 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-violet-100 focus:outline-none focus:ring-4 focus:ring-violet-500/20"
            >
              Try again
            </button>
          </div>
        )}
        {!loading && !error && (
          <div className="fade-in">
            <div className="mb-6 flex items-center justify-between gap-4">
              <p className="text-sm text-zinc-500">
                <span className="font-semibold text-zinc-200">{displayedPhotos.length}</span>{' '}
                {activeSection === 'explore'
                  ? isSearching ? 'matching photos' : 'photos to explore'
                  : displayedPhotos.length === 1 ? 'saved photo' : 'saved photos'}
              </p>
              {activeSection === 'explore' && isSearching && (
                <span className="hidden text-xs text-zinc-600 sm:block">
                  Showing matches for “{submittedSearch}”
                </span>
              )}
            </div>
            <Gallery
              photos={displayedPhotos}
              favourites={favourites}
              onToggleFavourite={handleToggleFavourite}
              removingIds={removingIds}
              emptyMessage={
                activeSection === 'saved'
                  ? 'Save photographs from Explore and they will appear here.'
                  : isSearching
                    ? 'No photos found for this Pixabay username.'
                    : 'Try a different photographer name or clear your search.'
              }
            />
            {activeSection === 'explore' && hasMore && (
              <div className="mt-10 flex flex-col items-center gap-3">
                <button
                  type="button"
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="rounded-xl border border-white/10 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-violet-400/40 hover:bg-violet-500/10 focus:outline-none focus:ring-4 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingMore ? 'Loading more photos...' : 'Load more photos'}
                </button>
                <p className="text-xs text-zinc-600">
                  {photos.length} of the available Pixabay results loaded
                </p>
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="border-t border-white/[0.07] px-5 py-8 text-center text-xs text-zinc-600">
        Photos provided by{' '}
        <a
          href="https://pixabay.com/"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-zinc-400 transition hover:text-violet-300"
        >
          Pixabay
        </a>
      </footer>

      {toast && (
        <div
          role="status"
          className="toast-enter fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-[#202027] px-4 py-3 text-sm font-medium text-white shadow-2xl shadow-black/40"
        >
          <span className={`h-2 w-2 rounded-full ${toast.startsWith('Added') ? 'bg-violet-400' : 'bg-zinc-400'}`} />
          {toast}
        </div>
      )}
    </main>
  )
}

export default App
