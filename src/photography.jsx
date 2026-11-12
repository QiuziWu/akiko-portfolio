import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SiteHeader from './components/SiteHeader'
import PhotoLightbox from './components/PhotoLightbox'
import { photographs } from './data/photography'
import './index.css'
import './App.css'
import './photography.css'

export default function PhotographyPage() {
  const [activeIndex, setActiveIndex] = useState(null)

  function navigatePhoto(direction) {
    setActiveIndex((index) => (index + direction + photographs.length) % photographs.length)
  }

  return (
    <main className="photography-page">
      <div className="page-grid" aria-hidden="true">
        <span /><span /><span /><span />
      </div>
      <SiteHeader isProject />

      <section className="photography-intro" aria-labelledby="photography-title">
        <h1 id="photography-title">Photography</h1>
        <div className="photography-intro-copy">
          <p>A collection of moments I’ve captured along the way.</p>
          <p>Different places, different people, and little details that <span className="photography-intro-ending">caught my eye.</span></p>
        </div>
      </section>

      <ul className="photography-gallery" aria-label="Photography archive">
        {photographs.map((photo, index) => (
          <li key={photo.filename} className="photography-gallery-item">
            <button
              type="button"
              className="photography-thumbnail"
              aria-label={`Open photograph ${photo.filename}`}
              aria-haspopup="dialog"
              aria-controls="photography-lightbox"
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                decoding="async"
              />
            </button>
            <p className="photography-filename">{photo.filename}</p>
          </li>
        ))}
      </ul>

      <PhotoLightbox
        photos={photographs}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={navigatePhoto}
      />
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PhotographyPage />
  </StrictMode>,
)
