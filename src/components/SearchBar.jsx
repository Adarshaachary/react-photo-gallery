function SearchBar({ value, onChange, onSubmit, onClear }) {
  return (
    <form className="relative block w-full" onSubmit={onSubmit}>
      <label htmlFor="photo-search" className="sr-only">Search photos by photographer</label>
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m2.1-5.4a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
      </svg>
      <input
        id="photo-search"
        type="search"
        value={value}
        onChange={onChange}
        placeholder="Search by photographer..."
        className="w-full rounded-2xl border border-white/10 bg-white/[0.06] py-3.5 pl-12 pr-12 text-sm text-white shadow-2xl shadow-black/10 outline-none transition placeholder:text-zinc-500 [appearance:textfield] focus:border-violet-400/70 focus:bg-white/[0.08] focus:ring-4 focus:ring-violet-500/10 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          aria-label="Clear photographer search"
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-zinc-500 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.2 5.2a.75.75 0 0 1 1.06 0L10 8.94l3.74-3.74a.75.75 0 1 1 1.06 1.06L11.06 10l3.74 3.74a.75.75 0 1 1-1.06 1.06L10 11.06l-3.74 3.74a.75.75 0 1 1-1.06-1.06L8.94 10 5.2 6.26a.75.75 0 0 1 0-1.06Z" />
          </svg>
        </button>
      )}
    </form>
  )
}

export default SearchBar
