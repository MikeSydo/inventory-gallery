import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoritesBar from '../components/gallery/FavoritesBar'
import InventoryGallery from '../components/gallery/InventoryGallery'
import InventoryQuickView from '../components/gallery/InventoryQuickView'
import { useFavorites } from '../hooks/useFavorites'
import { fetchInventoryList } from '../services/inventoryApi'

function FavoritesSkeleton() {
  return (
    <section className="galleryGrid" aria-label="Завантаження улюблених">
      {Array.from({ length: 3 }, (_, index) => (
        <article key={index} className="galleryCard galleryCardSkeleton" aria-hidden="true">
          <div className="galleryCardMedia skeletonBlock" />
          <div className="galleryCardContent">
            <div className="skeletonLine skeletonLineShort" />
            <div className="skeletonLine" />
          </div>
        </article>
      ))}
    </section>
  )
}

function FavoritesPage() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)
  const { favoriteIds, favoriteCount, toggleFavorite } = useFavorites()

  useEffect(() => {
    const loadItems = async () => {
      setIsLoading(true)
      setError('')

      try {
        const data = await fetchInventoryList()
        setItems(data)
      } catch (loadError) {
        setError(loadError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadItems()
  }, [])

  const favoriteItems = useMemo(
    () => items.filter((item) => favoriteIds.includes(item.id)),
    [favoriteIds, items],
  )

  const isEmpty = !isLoading && !error && favoriteItems.length === 0

  return (
    <main className="galleryPageShell">
      <section className="galleryHero">
        <div className="galleryHeroTopbar">
          <div>
            <p className="galleryKicker">Персональна добірка</p>
            <h1>Улюблений інвентар</h1>
          </div>

          <Link className="galleryAdminLink" to="/admin/inventory">
            Відкрити адмін-панель
          </Link>
        </div>

        <div className="galleryHeroBody">
          <div className="galleryHeroCopy">
            <p className="galleryLead">
              Тут зібрані позиції, які ти позначив як улюблені. Їх можна швидко
              переглядати та прибирати з добірки просто з картки.
            </p>
          </div>

          <div className="galleryHeroStats">
            <div className="galleryStatCard">
              <span className="galleryStatValue">{favoriteCount}</span>
              <span className="galleryStatLabel">позицій в обраному</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gallerySection">
        <FavoritesBar favoriteCount={favoriteCount} isFavoritesPage />

        {isLoading && <FavoritesSkeleton />}

        {error && (
          <div className="galleryMessage galleryMessageError">
            <h2>Не вдалося завантажити обране</h2>
            <p>{error}</p>
          </div>
        )}

        {isEmpty && (
          <div className="galleryMessage">
            <h2>Список улюблених порожній</h2>
            <p>Додай позиції з галереї через кнопку ♥, і вони з’являться тут.</p>
          </div>
        )}

        {!isLoading && !error && favoriteItems.length > 0 && (
          <InventoryGallery
            items={favoriteItems}
            onOpen={setSelectedItem}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </section>

      {selectedItem && (
        <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </main>
  )
}

export default FavoritesPage
