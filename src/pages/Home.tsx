import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { site } from '../data/site'
import { ProjectCard } from '../components/ProjectCard'

export default function Home() {
  const sorted = [...projects].sort(
    (a, b) => Number(b.featured ?? false) - Number(a.featured ?? false),
  )

  return (
    <div className="page">
      <header className="nav">
        <a className="nav__brand" href="#top">
          {site.name}
        </a>
        <nav className="nav__links">
          <a href="#projects">Projets</a>
          <Link to="/bibliotheque">Bibliothèque</Link>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="top">
          <p className="hero__banner">Hello there !</p>
          <p className="hero__role">{site.role}</p>
          <h1 className="hero__title">{site.name}</h1>
          <p className="hero__intro">{site.intro}</p>
          <div className="hero__cta">
            <a href="#projects" className="btn btn--primary">
              Découvrir les projets
            </a>
            <a href={`mailto:${site.email}`} className="btn btn--ghost">
              Me contacter
            </a>
          </div>
        </section>

        <section className="projects" id="projects">
          <div className="section__head">
            <h2>Projets</h2>
            <span className="section__count">{projects.length}</span>
          </div>
          <div className="grid">
            {sorted.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>

        <section className="projects">
          <div className="section__head">
            <h2>Bibliothèque</h2>
          </div>
          <p className="hero__intro" style={{ marginBottom: 20 }}>
            Les livres que j'ai envie de faire passer.
          </p>
          <Link to="/bibliotheque" className="btn btn--primary">
            Voir mes recommandations →
          </Link>
        </section>
      </main>

      <footer className="footer" id="contact">
        <h2 className="footer__title">Travaillons ensemble.</h2>
        <a className="footer__email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <div className="footer__links">
          {site.links.map((l) => (
            <a key={l.label} href={l.url} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ))}
        </div>
        <p className="footer__copy">
          © {new Date().getFullYear()} {site.name}
        </p>
      </footer>
    </div>
  )
}
