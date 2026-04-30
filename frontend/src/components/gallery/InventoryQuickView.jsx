import { useEffect } from 'react'
import { getImageUrl } from '../../services/inventoryApi'

function InventoryQuickView({ item, onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const imageUrl = getImageUrl(item.photo_url)

  return (
    <div
      className="quickViewBackdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-view-title"
    >
      <button
        className="quickViewScrim"
        type="button"
        aria-label="Закрити швидкий перегляд"
        onClick={onClose}
      />
      <div className="quickViewCard">
        <button className="quickViewClose" type="button" onClick={onClose} aria-label="Закрити">
          ×
        </button>

        <div className="quickViewMedia">
          {imageUrl ? (
            <img className="quickViewImage" src={imageUrl} alt={item.inventory_name} />
          ) : (
            <div className="quickViewPlaceholder">Зображення відсутнє</div>
          )}
        </div>

        <div className="quickViewContent">
          <p className="quickViewEyebrow">Швидкий перегляд</p>
          <h2 id="quick-view-title">{item.inventory_name}</h2>
          <p className="quickViewDescription">
            {item.description || 'Опис для цього інвентарю поки що відсутній.'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InventoryQuickView
