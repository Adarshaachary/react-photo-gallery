function HeartIcon({ filled }) {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill={filled ? 'currentColor' : 'none'}
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  )
}

function PhotoCard({ photo, isFavourite, onToggleFavourite, isRemoving, style }) {
  return (
    <article
      style={style}
      className={`card-enter group overflow-hidden rounded-2xl border border-white/[0.08] bg-[#17171c] shadow-xl shadow-black/10 transition duration-500 hover:-translate-y-1 hover:border-violet-400/30 hover:shadow-2xl hover:shadow-violet-950/20 ${
        isRemoving ? 'pointer-events-none scale-95 opacity-0' : ''
      }`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#202027]">
        <a href={photo.photoUrl} target="_blank" rel="noreferrer" aria-label={`View ${photo.author}'s photo on Pixabay`}>
          <img
            src={photo.imageUrl}
            alt={`Photograph by ${photo.author}`}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
          />
        </a>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <button
          type="button"
          aria-label={isFavourite ? `Remove ${photo.author} from saved` : `Add ${photo.author} to saved`}
          aria-pressed={isFavourite}
          onClick={() => onToggleFavourite(photo)}
          className={`absolute right-3 top-3 rounded-full border p-2.5 backdrop-blur-md transition duration-200 hover:scale-110 active:scale-125 focus:outline-none focus:ring-4 focus:ring-violet-400/30 ${
            isFavourite
              ? 'border-violet-300/50 bg-violet-500 text-white shadow-lg shadow-violet-950/40'
              : 'border-white/20 bg-black/35 text-white/85 hover:border-violet-300/50 hover:text-violet-200'
          }`}
        >
          <HeartIcon filled={isFavourite} />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-zinc-100">{photo.author}</p>
          <p className="mt-1 text-xs text-zinc-500">Photographer · #{photo.id}</p>
        </div>
        {isFavourite && (
          <span className="shrink-0 rounded-full border border-violet-400/20 bg-violet-400/10 px-2.5 py-1 text-[11px] font-semibold text-violet-300">
            Saved
          </span>
        )}
      </div>
    </article>
  )
}

export default PhotoCard
