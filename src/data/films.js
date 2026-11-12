import placeholder from '../assets/film-placeholder.svg'

// Replace these placeholders with the film covers and production details.
// Set youtubeVideoId to the ID from each film's YouTube URL when available.
export const films = [
  {
    id: '01',
    title: 'Close',
    originalTitle: '亲密',
    category: 'Narrative Short Film',
    year: '',
    role: 'Writer & Director',
    description: 'A narrative short film exploring the emotional distance that can exist within intimate relationships.\n\nSet during the COVID-19 lockdown, the story follows a couple whose once-busy lives suddenly bring them into constant proximity. As physical distance disappears, emotional tensions begin to surface.\n\nClose explores the paradox of intimacy: being physically close does not always mean feeling emotionally connected.',
    thumbnail: 'https://i.ytimg.com/vi/cgpbwtqXUFQ/hqdefault.jpg',
    youtubeVideoId: 'cgpbwtqXUFQ',
  },
  {
    id: 'film-02',
    title: 'Where I Grew Up',
    subtitle: 'Changsha After Dark',
    category: 'Personal Visual Diary',
    year: '',
    role: 'Filming & Editing',
    description: [
      'A collection of everyday moments from Changsha, the city where I grew up.',
      'Its lively streets, different people, and ever-changing rhythms shaped who I am today:\nsomeone who embraces differences and finds beauty in ordinary life.',
      'A little piece of home, through my eyes.',
    ].join('\n\n'),
    thumbnail: 'https://i.ytimg.com/vi/xkg5ntRb2uY/hqdefault.jpg',
    youtubeVideoId: 'xkg5ntRb2uY',
  },
  {
    id: 'film-03',
    title: 'Film 03',
    year: 'Year to be added',
    role: 'Role to be added.',
    description: 'Film description to be added.',
    thumbnail: placeholder,
    youtubeVideoId: '',
  },
]
