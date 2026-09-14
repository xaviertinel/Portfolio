import { Link } from 'react-router-dom'
import { site } from '../data/site'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Marquee } from '../components/Marquee'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 2)
  const rest = projects.filter((p) => !p.featured)

  return (
    <>
      <section className="hero">
        <div className="shell">
          <Reveal>
            <p className="eyebrow">{site.role}</p>
          </Reveal>
          <AnimatedTitle
            text={site.headline}
            className="hero__title display"
            delay={0.15}
          />
          <Reveal delay={0.5}>
            <p className="hero__intro">{site.intro}</p>
          </Reveal>
          <Reveal delay={0.62}>
            <div className="btn-row">
              <Link to="/projets" className="btn btn--primary">
                Voir les projets
              </Link>
              <a href={`mailto:${site.email}`} className="btn btn--ghost">
                Me contacter
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={site.marquee} />

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section__head">
              <h2 className="section__title display">Sélection</h2>
              <Link to="/projets" className="section__more">
                Tous les projets ({projects.length}) →
              </Link>
            </div>
          </Reveal>

          <StaggerGroup className="grid grid--wide">
            {featured.map((p) => (
              <Stagger key={p.slug}>
                <ProjectCard project={p} />
              </Stagger>
            ))}
          </StaggerGroup>

          <StaggerGroup className="grid">
            {rest.map((p) => (
              <Stagger key={p.slug}>
                <ProjectCard project={p} />
              </Stagger>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </>
  )
}
