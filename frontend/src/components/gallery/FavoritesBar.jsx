import { Link } from 'react-router-dom'

function FavoritesBar({ favoriteCount, isFavoritesPage = false }) {
  return (
    <nav className="favoritesBar" aria-label="Навігація обраного">
      <div className="favoritesBarLinks">
        <Link
          className={`favoritesBarLink ${!isFavoritesPage ? 'favoritesBarLinkActive' : ''}`}
          to="/"
        >
          Галерея
        </Link>
        <Link
          className={`favoritesBarLink ${isFavoritesPage ? 'favoritesBarLinkActive' : ''}`}
          to="/favorites"
        >
          Обране
        </Link>
      </div>

      <div className="favoritesBarCount">
        <span className="favoritesBarLabel">Улюблених позицій</span>
        <strong>{favoriteCount}</strong>
      </div>
    </nav>
  )
}

export default FavoritesBar
