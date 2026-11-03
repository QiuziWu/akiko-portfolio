import { useState } from 'react'
import InteractivePixelMap from './components/InteractivePixelMap'
import ProjectsSection from './components/ProjectsSection'
import { pixelMaps } from './data/pixelMaps'
import './App.css'

function App() {
  const [heroFont, setHeroFont] = useState('Array')

  return (
    <main>
      <div className="homepage">
        <div className="page-grid" aria-hidden="true">
          <span /><span /><span /><span />
        </div>

        <header className="site-header">
          <span className="wordmark">
            qiuzi wu <span className="name-chinese" lang="zh-Hans">秋子</span>
          </span>

          <nav className="site-nav" aria-label="Primary navigation">
            <ul>
              <li><a href="#projects">projects</a></li>
              <li><span aria-disabled="true">about</span></li>
              <li><span aria-disabled="true">contact</span></li>
            </ul>
          </nav>
        </header>

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
