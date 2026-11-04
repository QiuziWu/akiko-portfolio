import { useLayoutEffect, useState } from 'react'
import InteractivePixelMap from './components/InteractivePixelMap'
import ProjectsSection from './components/ProjectsSection'
import SiteHeader from './components/SiteHeader'
import { pixelMaps } from './data/pixelMaps'
import './App.css'

function App() {
  const [heroFont, setHeroFont] = useState('Array')

  useLayoutEffect(() => {
    if (window.location.hash === '#projects') {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'instant' })
    }
  }, [])

  return (
    <main>
      <div className="homepage">
        <div className="page-grid" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        <SiteHeader />

        <div className="font-switcher">
          <label htmlFor="hero-font">hero font</label>
          <select
            id="hero-font"
            value={heroFont}
            onChange={(event) => setHeroFont(event.target.value)}
          >
            <option value="Array">Array</option>
            <option value="FontA">FontA</option>
            <option value="FontC">FontC</option>
            <option value="FontD">FontD</option>
          </select>
        </div>

        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-artwork" aria-hidden="true">
            <InteractivePixelMap map={pixelMaps.china} className="pixel-map--china" />
            <InteractivePixelMap map={pixelMaps.canada} className="pixel-map--canada" />
          </div>
          <div className="hero-content">
            <h1 id="hero-title" style={{ fontFamily: `"${heroFont}", 'Geist', sans-serif` }}>
              <span>between</span>{' '}
              <span>storytelling</span>{' '}
              <span>and software.</span>
            </h1>
          </div>

          <footer className="hero-footer">
            <p className="location">vancouver, bc</p>
            <a className="selected-work" href="#projects">
              selected work <span aria-hidden="true">↓</span>
            </a>
          </footer>
        </section>
      </div>

      <ProjectsSection />
    </main>
  )
}

export default App
