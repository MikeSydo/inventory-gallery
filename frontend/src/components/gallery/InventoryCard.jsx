import { getImageUrl } from '../../services/inventoryApi'

function InventoryCard({ item, onOpen, isFavorite, onToggleFavorite }) {
  const imageUrl = getImageUrl(item.photo_url)

  return (
    <article className="galleryCard">
      <button
        className={`favoriteToggle ${isFavorite ? 'favoriteToggleActive' : ''}`}
        type="button"
        onClick={() => onToggleFavorite(item)}
        aria-pressed={isFavorite}
        aria-label={
          isFavorite
            ? `Видалити ${item.inventory_name} з улюблених`
            : `Додати ${item.inventory_name} в улюблені`
        }
      >
        <span aria-hidden="true">♥</span>
      </button>

      <button
        className="galleryCardButton"
        type="button"
        onClick={() => onOpen(item)}
        aria-label={`Відкрити ${item.inventory_name}`}
      >
        <div className="galleryCardMedia">
          {imageUrl ? (
            <img className="galleryCardImage" src={imageUrl} alt={item.inventory_name} />
          ) : (
            <div className="galleryCardPlaceholder">Немає зображення</div>
          )}
        </div>

        <div className="galleryCardContent">
          <p className="galleryCardEyebrow">Елемент інвентарю</p>
          <h2>{item.inventory_name}</h2>
        </div>
      </button>
    </article>
  )
}

export default InventoryCard
