import InventoryCard from './InventoryCard'

function InventoryGallery({ items, onOpen }) {
  return (
    <section className="galleryGrid" aria-label="Галерея інвентарю">
      {items.map((item) => (
        <InventoryCard key={item.id} item={item} onOpen={onOpen} />
      ))}
    </section>
  )
}

export default InventoryGallery
