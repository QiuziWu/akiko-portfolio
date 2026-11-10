// Follow the joins in this font's 秋 so the same outlines can move apart.
const seam = '440 -850 440 -560 453 -497 405 -468 418 -425 463 -372 458 -305 449 -250 420 -193 399 -139 300 -89 265 170'

const parts = [
  {
    id: 'grain',
    label: '禾 — hé, grain. Background',
    viewBox: '-12 -850 510 1020',
    clip: `${seam} -12 170 -12 -850`,
  },
  {
    id: 'fire',
    label: '火 — huǒ, fire. Focus',
    viewBox: '498 -850 510 1020',
    clip: `${seam} 1008 170 1008 -850`,
  },
]

export default function AboutCharacter({ activeStory, onToggle }) {
  return parts.map(({ id, label, viewBox, clip }) => (
    <button
      key={id}
      type="button"
      className={`about-character-part about-character-part--${id}`}
      aria-label={label}
      aria-pressed={activeStory === id}
      aria-controls="about-story"
      onClick={() => onToggle(id)}
    >
      <svg viewBox={viewBox} aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={`about-glyph-${id}`}>
            <polygon points={clip} />
          </clipPath>
        </defs>
        <text lang="zh-Hans" fontSize="1000" clipPath={`url(#about-glyph-${id})`}>秋</text>
      </svg>
    </button>
  ))
}
