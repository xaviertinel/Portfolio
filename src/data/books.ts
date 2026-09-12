// ────────────────────────────────────────────────────────────────
//  BIBLIOTHÈQUE — RECOMMANDATIONS DE LECTURE
//  Copie un bloc ci-dessous, change les valeurs, et c'est en ligne.
//  La grille et les filtres par genre se mettent à jour tout seuls.
// ────────────────────────────────────────────────────────────────

export type Book = {
  /** Identifiant unique en kebab-case */
  id: string
  title: string
  author: string
  /** Année de première parution */
  year: number
  /** Genres — servent aussi à générer les filtres */
  genres: string[]
  /** Couverture (Open Library). Laisse vide pour afficher l'initiale. */
  cover?: string
  /** Pourquoi je le recommande */
  note: string
  /** Note sur 5 (0 = non noté) */
  rating: number
}

const cover = (isbn: string) =>
  `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`

export const books: Book[] = [
  {
    id: 'dune',
    title: 'Dune',
    author: 'Frank Herbert',
    year: 1965,
    genres: ['Science-fiction'],
    cover: cover('9780441013593'),
    note: "Le space opera absolu : politique, écologie et mysticisme sur une planète-désert. Dense, mais on n'en ressort pas indemne.",
    rating: 5,
  },
  {
    id: 'the-left-hand-of-darkness',
    title: 'La Main gauche de la nuit',
    author: 'Ursula K. Le Guin',
    year: 1969,
    genres: ['Science-fiction'],
    cover: cover('9780441478125'),
    note: 'Un roman qui repense le genre et l’identité sur un monde glacé. Intelligent, doux, inoubliable.',
    rating: 5,
  },
  {
    id: 'project-hail-mary',
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    year: 2021,
    genres: ['Science-fiction'],
    cover: cover('9780593135204'),
    note: "De la SF joyeuse et bricoleuse, où la science est le moteur du suspense. Impossible à lâcher.",
    rating: 5,
  },
  {
    id: 'the-name-of-the-wind',
    title: 'Le Nom du vent',
    author: 'Patrick Rothfuss',
    year: 2007,
    genres: ['Fantasy'],
    cover: cover('9780756404741'),
    note: "La plus belle prose de la fantasy récente. L'histoire d'un héros racontée par lui-même, entre légende et regret.",
    rating: 5,
  },
  {
    id: 'the-song-of-achilles',
    title: "Le Chant d'Achille",
    author: 'Madeline Miller',
    year: 2011,
    genres: ['Fiction', 'Romance'],
    cover: cover('9780062060624'),
    note: "L'Iliade racontée côté cœur. Une réécriture lumineuse et déchirante du mythe de Patrocle et Achille.",
    rating: 5,
  },
  {
    id: 'klara-and-the-sun',
    title: 'Klara et le Soleil',
    author: 'Kazuo Ishiguro',
    year: 2021,
    genres: ['Fiction'],
    cover: cover('9780571364886'),
    note: "Une intelligence artificielle observe l'amour et la solitude humaines. Tendre, mélancolique, d'une grande finesse.",
    rating: 4,
  },
  {
    id: 'norwegian-wood',
    title: 'La Ballade de l’impossible',
    author: 'Haruki Murakami',
    year: 1987,
    genres: ['Fiction'],
    cover: cover('9780375704024'),
    note: 'Nostalgie, amour et deuil dans le Tokyo des années 60. Le Murakami le plus terre-à-terre, et l’un des plus beaux.',
    rating: 4,
  },
  {
    id: 'sapiens',
    title: 'Sapiens : Une brève histoire de l’humanité',
    author: 'Yuval Noah Harari',
    year: 2011,
    genres: ['Essai'],
    cover: cover('9780062316097'),
    note: "Une relecture vertigineuse de l'histoire humaine. Change durablement la façon dont on regarde notre espèce.",
    rating: 5,
  },
  {
    id: 'educated',
    title: 'Une éducation',
    author: 'Tara Westover',
    year: 2018,
    genres: ['Essai'],
    cover: cover('9780399590504'),
    note: "Le récit d'une femme qui s'arrache à une famille survivaliste pour accéder au savoir. Bouleversant.",
    rating: 5,
  },
  {
    id: 'thinking-fast-and-slow',
    title: 'Système 1 / Système 2',
    author: 'Daniel Kahneman',
    year: 2011,
    genres: ['Essai'],
    cover: cover('9780374533557'),
    note: "Comment on pense, et pourquoi on se trompe. Un classique de la psychologie des décisions, par un prix Nobel.",
    rating: 4,
  },
]
