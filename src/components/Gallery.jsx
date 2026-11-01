import PhotoCard from './PhotoCard'

export function GallerySkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-label="Loading photos">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#17171c]">
          <div className="dark-skeleton aspect-[4/3]" />
          <div className="space-y-3 p-4">
            <div className="dark-skeleton h-4 w-2/3 rounded" />
            <div className="dark-skeleton h-3 w-1/3 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

function Gallery({ photos, favourites, onToggleFavourite, emptyMessage, removingIds = [] }) {
  if (photos.length === 0) {
    return (
      <div className="fade-in rounded-3xl border border-dashed border-white/10 bg-[#15151a] px-6 py-20 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-300">
          <svg aria-hidden="true" className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16.5V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8.5M4 16.5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M4 16.5l4.5-4.5 3.5 3.5 2.5-2.5 5.5 5.5" />
          </svg>
        </div>
        <p className="mt-5 text-lg font-semibold text-zinc-100">Nothing here yet</p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-zinc-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {photos.map((photo, index) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favourites.some((favourite) => favourite.id === photo.id)}
          onToggleFavourite={onToggleFavourite}
          isRemoving={removingIds.includes(photo.id)}
          style={{ animationDelay: `${Math.min(index, 7) * 55}ms` }}
        />
      ))}
    </div>
  )
}

export default Gallery
