import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { books } from '../../data/books'
import { site } from '../../data/site'
import { BookCard } from './BookCard'

export default function Bibliotheque() {
  const [genre, setGenre] = useState<string | null>(null)

  // Genres présents dans les données, triés par fréquence.
  const genres = useMemo(() => {
    const count = new Map<string, number>()
    for (const b of books) for (const g of b.genres) count.set(g, (count.get(g) ?? 0) + 1)
    return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([g]) => g)
  }, [])

  const shown = genre ? books.filter((b) => b.genres.includes(genre)) : books

  return (
    <div className="page">
      <header className="nav">
        <Link className="nav__brand" to="/">
          {site.name}
        </Link>
        <nav className="nav__links">
          <Link to="/">Accueil</Link>
          <Link to="/#projects">Projets</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <p className="hero__role">Bibliothèque</p>
          <h1 className="hero__title">Mes recommandations</h1>
          <p className="hero__intro">
            Les livres que j'ai envie de faire passer — un peu de tout, choisis
            pour ce qu'ils m'ont laissé. À picorer selon l'envie.
          </p>
        </section>

        <section className="library" id="livres">
          <div className="section__head">
            <h2>Livres</h2>
            <span className="section__count">{shown.length}</span>
          </div>

          <div className="filters" role="tablist" aria-label="Filtrer par genre">
            <button
              className={`pill${genre === null ? ' pill--active' : ''}`}
              onClick={() => setGenre(null)}
            >
              Tous
            </button>
            {genres.map((g) => (
              <button
                key={g}
                className={`pill${genre === g ? ' pill--active' : ''}`}
                onClick={() => setGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>

          {shown.length > 0 ? (
            <div className="grid">
              {shown.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          ) : (
            <p className="library__empty">Aucun livre dans ce genre pour l'instant.</p>
          )}
        </section>
      </main>

      <footer className="footer" id="contact">
        <h2 className="footer__title">Une reco à me faire ?</h2>
        <a className="footer__email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <p className="footer__copy">
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </div>
  )
}
