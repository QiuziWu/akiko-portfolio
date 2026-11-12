import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SiteHeader from './components/SiteHeader'
import FilmPlayer from './components/FilmPlayer'
import { films } from './data/films'
import './index.css'
import './App.css'
import './selected-films.css'

export default function SelectedFilmsPage() {
  const [selectedFilm, setSelectedFilm] = useState(films[0])
  const [playingFilm, setPlayingFilm] = useState(null)

  function openFilm(film) {
    setSelectedFilm(film)
    setPlayingFilm(film)
  }

  return (
    <main className="films-page">
      <div className="page-grid" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <SiteHeader isProject />

      <section className="films-content" aria-labelledby="films-title">
        <h1 id="films-title">selected films</h1>

        <div className="films-layout">
          <ol className="film-gallery" aria-label="Films">
            {films.map((film, index) => (
              <li key={film.id} className="film-gallery-item">
                <span className="film-number" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="film-gallery-entry">
                  <button
                    type="button"
                    className="film-thumbnail"
                    aria-label={`Play ${film.title}`}
                    aria-haspopup="dialog"
                    aria-controls="film-player"
                    aria-pressed={selectedFilm.id === film.id}
                    onMouseEnter={() => setSelectedFilm(film)}
                    onFocus={() => setSelectedFilm(film)}
                    onClick={() => openFilm(film)}
                  >
                    <img src={film.thumbnail} width="800" height="450" alt="" />
                  </button>
                  <div className="film-caption">
                    <span>{film.year}</span>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <aside className="film-information" aria-label="Selected film information" aria-live="polite" aria-atomic="true">
            <div className="film-information-copy" key={selectedFilm.id}>
              <h2 className={selectedFilm.subtitle ? 'film-title--with-subtitle' : undefined}>{selectedFilm.title}</h2>
              {selectedFilm.subtitle && <p className="film-information-subtitle">{selectedFilm.subtitle}</p>}
              <dl>
                <dt>ROLE</dt>
                <dd>{selectedFilm.role}</dd>
                <dt>ABOUT</dt>
                <dd>
                  {selectedFilm.description.split('\n\n').map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </dd>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <FilmPlayer film={playingFilm} onClose={() => setPlayingFilm(null)} />
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SelectedFilmsPage />
  </StrictMode>,
)
