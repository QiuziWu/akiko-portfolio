import { useEffect, useRef } from 'react'
import './ProjectsSection.css'

// TODO: Add real project destinations after the detail pages are ready.
// Replace each preview button with an anchor when its destination exists.
const projects = [
  { number: '01', title: 'Movify', category: 'Digital Experience' },
  { number: '02', title: 'Portraits', category: 'Photography' },
  { number: '03', title: 'Selected Films', category: 'Film & Storytelling' },
  { number: '04', title: 'Editorial Works', category: 'Content Creation' },
]

export default function ProjectsSection() {
  const introRef = useRef(null)

  useEffect(() => {
    const intro = introRef.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches || !window.IntersectionObserver || !intro.animate) return

    let animations = []
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return

      observer.disconnect()
      // Animate only after entry. Base styles always leave the content visible,
      // including when observation or animation is unavailable.
      animations = Array.from(intro.querySelectorAll('[data-reveal]'), (statement, index) => (
        statement.animate(
          [
            { opacity: 0, transform: 'translateY(8px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 600,
            delay: index * 160,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'backwards',
          },
        )
      ))
    }, { rootMargin: '0px 0px -8% 0px' })

    function stopMotion() {
      if (!motion.matches) return
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
    }

    observer.observe(intro.querySelector('.projects-statement'))
    motion.addEventListener('change', stopMotion)

    return () => {
      observer.disconnect()
      animations.forEach((animation) => animation.cancel())
      motion.removeEventListener('change', stopMotion)
    }
  }, [])

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title">
      <div className="page-grid projects-grid" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      <div ref={introRef} className="projects-intro">
        <div className="projects-eyebrow">
          <p>SELECTED WORKS</p>
          <p>2022—2026</p>
        </div>

        <h2 id="projects-title" className="projects-statement" data-reveal>
          I question, explore, and create.
        </h2>

        <p className="projects-intention" data-reveal>
          To make ideas seen, felt, and understood.
        </p>
      </div>

      <p id="projects-preview-note" className="projects-sr-only">
        Project details are not available in this layout prototype.
      </p>
      <ol className="project-index" aria-label="Selected projects">
        {projects.map((project, index) => (
          <li key={project.number} className={index % 2 ? 'project-item project-item--right' : 'project-item'}>
            {/* TODO: Add project thumbnail after layout approval. */}
            <button
              type="button"
              className="project-entry"
              aria-disabled="true"
              aria-describedby="projects-preview-note"
            >
              <span className="project-number">{project.number}</span>
              <span className="project-copy">
                <span className="project-title">{project.title}</span>
                <span className="project-category">{project.category}</span>
              </span>
              <span className="project-arrow" aria-hidden="true">{index % 2 ? '↖' : '↗'}</span>
            </button>
          </li>
        ))}
      </ol>
    </section>
  )
}
