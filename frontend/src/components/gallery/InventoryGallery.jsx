import InventoryCard from './InventoryCard'

function InventoryGallery({ items, onOpen, favoriteIds, onToggleFavorite }) {
  return (
    <section className="galleryGrid" aria-label="Галерея інвентарю">
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          onOpen={onOpen}
          isFavorite={favoriteIds.includes(item.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}

export default InventoryGallery
