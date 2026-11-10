import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import portrait from './assets/selfie.JPG'
import AboutCharacter from './components/AboutCharacter'
import AboutDetails, { AboutContact } from './components/AboutDetails'
import SiteHeader from './components/SiteHeader'
import './index.css'
import './App.css'
import './about.css'

function AboutPage() {
  const [activeStory, setActiveStory] = useState(null)

  function toggleStory(story) {
    setActiveStory((current) => current === story ? null : story)
  }

  return (
    <main className="about-page">
      <div className="page-grid" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="about-opening">
        <SiteHeader isAbout />

        <section className="about-hero" data-story={activeStory} aria-labelledby="about-title">
          <AboutCharacter activeStory={activeStory} onToggle={toggleStory} />

          <div className="about-intro">
            <h1 id="about-title">Hi, I’m Qiuzi.</h1>
            <p>I was born in autumn, and named after it.</p>
          </div>

          <div className="about-story" id="about-story" aria-live="polite">
            {activeStory && <AboutDetails key={activeStory} story={activeStory} />}
          </div>
        </section>
      </div>

      <section className="about-portrait-section" aria-label="Portrait">
        <div className="about-portrait-content">
          <img className="about-portrait" src={portrait} alt="Portrait of Qiuzi Wu" width="4024" height="4024" loading="lazy" />
          <AboutContact />
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>,
)
