import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AboutDetails from './components/AboutDetails'
import SiteHeader from './components/SiteHeader'
import './index.css'
import './App.css'
import './about.css'

function AboutPage() {
  return (
    <main className="about-page">
      <div className="page-grid" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div className="about-opening">
        <SiteHeader isAbout />

        <section className="about-hero" aria-labelledby="about-title">
          <div className="about-portrait">portrait placeholder</div>

          <div className="about-intro">
            <h1 id="about-title">Somewhere between storytelling and technology.</h1>
            <a className="about-scroll" href="#background">
              SCROLL TO EXPLORE <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
      </div>

      <AboutDetails />
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AboutPage />
  </StrictMode>,
)
