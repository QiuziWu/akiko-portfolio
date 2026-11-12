import { useEffect, useRef } from 'react'

export default function FilmPlayer({ film, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (film) {
      dialog.showModal()
      const previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = previousOverflow
      }
    }

    dialog.close()
  }, [film])

  return (
    <dialog
      ref={dialogRef}
      className="film-player"
      id="film-player"
      aria-labelledby="film-player-title"
      onClose={onClose}
      onCancel={onClose}
    >
      {film && (
        <>
          <div className="film-player-header">
            <h2 id="film-player-title">{film.title}</h2>
            <button type="button" onClick={onClose} aria-label="Close video player">
              close <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="film-player-screen">
            {film.youtubeVideoId ? (
              <iframe
                key={film.id}
                src={`https://www.youtube.com/embed/${encodeURIComponent(film.youtubeVideoId)}?autoplay=1&playsinline=1`}
                title={`${film.title} — video player`}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <p>Video coming soon.</p>
            )}
          </div>
        </>
      )}
    </dialog>
  )
}
