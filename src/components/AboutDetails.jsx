import './AboutDetails.css'

export default function AboutDetails({ emailHref, linkedinHref }) {
  return (
    <div className="about-details" id="background">
      <section className="about-details-row" aria-labelledby="about-background">
        <h2 id="about-background">background</h2>
        <p>Background text goes here.</p>
      </section>

      <section className="about-details-row" aria-labelledby="about-focus">
        <h2 id="about-focus">focus</h2>
        <p>Focus text goes here.</p>
      </section>

      <section className="about-details-row" id="contact" aria-labelledby="about-contact">
        <h2 id="about-contact">contact</h2>
        <ul className="about-details-links">
          <li><a href={emailHref}>email <span aria-hidden="true">↗</span></a></li>
          <li><a href={linkedinHref}>linkedin <span aria-hidden="true">↗</span></a></li>
        </ul>
      </section>
    </div>
  )
}
