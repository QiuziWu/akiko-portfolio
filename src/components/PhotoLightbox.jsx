import { useEffect, useRef } from 'react'

export default function PhotoLightbox({ photos, activeIndex, onClose, onNavigate }) {
  const dialogRef = useRef(null)
  const touchStartRef = useRef(null)
  const swipedRef = useRef(false)
  const isOpen = activeIndex !== null
  const photo = photos[activeIndex]

  useEffect(() => {
    const dialog = dialogRef.current
    if (isOpen) {
      dialog.showModal()
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    dialog.close()
  }, [isOpen])

  function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      onNavigate(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      onNavigate(1)
    }
  }

  function handlePointerDown(event) {
    swipedRef.current = false
    touchStartRef.current = null
    if (event.pointerType === 'touch' && !event.target.closest('button')) {
      touchStartRef.current = { x: event.clientX, y: event.clientY }
    }
  }

  function handlePointerUp(event) {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return

    const distanceX = event.clientX - start.x
    const distanceY = event.clientY - start.y
    if (Math.abs(distanceX) >= 48 && Math.abs(distanceX) > Math.abs(distanceY) * 1.2) {
      swipedRef.current = true
      onNavigate(distanceX < 0 ? 1 : -1)
    }
  }

  function handleBackdropClick(event) {
    if (!swipedRef.current && event.target === event.currentTarget) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      id="photography-lightbox"
      className="photo-lightbox"
      aria-labelledby="photo-lightbox-title"
      onClose={onClose}
      onCancel={onClose}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => { touchStartRef.current = null }}
    >
      {photo && (
        <>
          <div className="photo-lightbox-header">
            <h2 id="photo-lightbox-title">{photo.filename}</h2>
            <button type="button" className="photo-lightbox-close" onClick={onClose} aria-label="Close photograph">
              close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div
            className="photo-lightbox-stage"
            onClick={handleBackdropClick}
          >
            <button
              type="button"
              className="photo-lightbox-arrow photo-lightbox-arrow--previous"
              aria-label="Previous photograph"
              onClick={() => onNavigate(-1)}
            >←</button>
            <img
              key={photo.filename}
              className="photo-lightbox-image"
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              draggable="false"
            />
            <button
              type="button"
              className="photo-lightbox-arrow photo-lightbox-arrow--next"
              aria-label="Next photograph"
              onClick={() => onNavigate(1)}
            >→</button>
          </div>
          <p className="photo-lightbox-counter" aria-live="polite" aria-atomic="true">
            {String(activeIndex + 1).padStart(3, '0')} / {String(photos.length).padStart(3, '0')}
          </p>
        </>
      )}
    </dialog>
  )
}
