export function getInitialFavourites() {
  try {
    const savedFavourites = localStorage.getItem('photo-gallery-favourites')

    if (!savedFavourites) {
      return []
    }

    const parsedFavourites = JSON.parse(savedFavourites)
    return Array.isArray(parsedFavourites) ? parsedFavourites : []
  } catch {
    return []
  }
}

export default function favouritesReducer(state, action) {
  switch (action.type) {
    case 'toggle':
      return state.some((photo) => photo.id === action.payload.id)
        ? state.filter((photo) => photo.id !== action.payload.id)
        : [...state, action.payload]
    default:
      return state
  }
}
