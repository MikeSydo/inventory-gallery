import { createContext, createElement, useContext, useEffect, useMemo, useState } from 'react'

const FAVORITES_STORAGE_KEY = 'inventory-gallery-favorites'

const FavoritesContext = createContext(null)

function readFavoriteIds() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const rawValue = window.localStorage.getItem(FAVORITES_STORAGE_KEY)
    if (!rawValue) {
      return []
    }

    const parsedValue = JSON.parse(rawValue)
    if (!Array.isArray(parsedValue)) {
      return []
    }

    return parsedValue.filter((value) => Number.isInteger(value))
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favoriteIds, setFavoriteIds] = useState(readFavoriteIds)

  useEffect(() => {
    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds))
  }, [favoriteIds])

  const value = useMemo(() => {
    const toggleFavorite = (itemOrId) => {
      const favoriteId = typeof itemOrId === 'number' ? itemOrId : itemOrId.id

      setFavoriteIds((currentIds) => (
        currentIds.includes(favoriteId)
          ? currentIds.filter((id) => id !== favoriteId)
          : [...currentIds, favoriteId]
      ))
    }

    const removeFavorite = (favoriteId) => {
      setFavoriteIds((currentIds) => currentIds.filter((id) => id !== favoriteId))
    }

    const isFavorite = (favoriteId) => favoriteIds.includes(favoriteId)

    return {
      favoriteIds,
      favoriteCount: favoriteIds.length,
      isFavorite,
      toggleFavorite,
      removeFavorite,
    }
  }, [favoriteIds])

  return createElement(FavoritesContext.Provider, { value }, children)
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider')
  }

  return context
}
