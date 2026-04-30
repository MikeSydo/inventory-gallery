import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import InventoryGallery from '../components/gallery/InventoryGallery'
import InventoryQuickView from '../components/gallery/InventoryQuickView'
import { fetchInventoryList } from '../services/inventoryApi'

function GallerySkeleton() {
  return (
    <section className="galleryGrid" aria-label="Завантаження інвентарю">
      {Array.from({ length: 6 }, (_, index) => (
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

function GalleryPage() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedItem, setSelectedItem] = useState(null)

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

  const isEmpty = useMemo(
    () => !isLoading && !error && items.length === 0,
    [error, isLoading, items.length],
  )

  return (
    <main className="galleryPageShell">
      <section className="galleryHero">
        <div className="galleryHeroTopbar">
          <div>
            <p className="galleryKicker">Вітрина складу</p>
            <h1>Галерея інвентарю</h1>
          </div>

          <Link className="galleryAdminLink" to="/admin/inventory">Відкрити адмін-панель</Link>
        </div>

        <div className="galleryHeroBody">
          <div className="galleryHeroCopy">
            <p className="galleryLead">
              Переглядайте доступний інвентар у візуальній галереї та відкривайте
              будь-яку позицію для детальнішого перегляду.
            </p>
          </div>

          <div className="galleryHeroStats">
            <div className="galleryStatCard">
              <span className="galleryStatValue">{items.length}</span>
              <span className="galleryStatLabel">позицій доступно</span>
            </div>
          </div>
        </div>
      </section>

      <section className="gallerySection">
        {isLoading && <GallerySkeleton />}

        {error && (
          <div className="galleryMessage galleryMessageError">
            <h2>Не вдалося завантажити інвентар</h2>
            <p>{error}</p>
          </div>
        )}

        {isEmpty && (
          <div className="galleryMessage">
            <h2>Інвентар поки порожній</h2>
            <p>Додайте кілька позицій в адмін-панелі, і вони з’являться тут.</p>
          </div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <InventoryGallery items={items} onOpen={setSelectedItem} />
        )}
      </section>

      {selectedItem && (
        <InventoryQuickView item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </main>
  )
}

export default GalleryPage
