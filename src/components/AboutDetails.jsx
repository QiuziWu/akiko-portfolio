import './AboutDetails.css'

const stories = {
  grain: {
    label: 'hé / grain',
    title: 'Growth, over time.',
    paragraphs: [
      'My journey began in film and media, where I studied Broadcasting and Directing and developed an interest in visual storytelling.',
      'Wanting to explore how technology could bring creative ideas to life, I went on to pursue a Master’s in Computer Science at Northeastern University.',
    ],
  },
  fire: {
    label: 'huǒ / fire',
    title: 'The spark of curiosity.',
    paragraphs: [
      'I’m interested in how storytelling, design, and technology come together to shape the way people experience ideas.',
      'Whether through visual content or digital experiences, I enjoy exploring how to make ideas not only seen, but understood.',
    ],
  },
}

export default function AboutDetails({ story }) {
  const { label, title, paragraphs } = stories[story]

  return (
    <div className="about-story-copy">
      <p className="about-story-label">{label}</p>
      <h2>{title}</h2>
      {paragraphs.map((paragraph) => <p className="about-story-paragraph" key={paragraph}>{paragraph}</p>)}
    </div>
  )
}

export function AboutContact() {
  return (
    <section className="about-contact" id="contact" aria-labelledby="about-contact">
      <h2 id="about-contact">contact</h2>
      <a href="mailto:qiuziwu843@gmail.com">email <span aria-hidden="true">↗</span></a>
    </section>
  )
}
