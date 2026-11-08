import { site } from '../data/site'
import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { Marquee } from '../components/Marquee'
import { Button } from '../components/ui'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function Home() {
  const featured = projects.filter((p) => p.featured).slice(0, 2)
  const rest = projects.filter((p) => !p.featured)

  return (
    <>
      <section className="hero">
        <div className="shell">
          <Reveal>
            <p className="xt-eyebrow">{site.role}</p>
          </Reveal>
          <AnimatedTitle
            text={site.headline}
            className="xt-display hero__title"
            delay={0.15}
          />
          <Reveal delay={0.5}>
            <p className="xt-lead hero__intro">{site.intro}</p>
          </Reveal>
          <Reveal delay={0.62}>
            <div className="btn-row">
              <Button variant="primary" to="/projets" icon="arrow-right">
                Voir les projets
              </Button>
              <Button variant="secondary" href={`mailto:${site.email}`} iconLeft="envelope">
                Me contacter
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Marquee items={site.marquee} />

      <section className="section">
        <div className="shell">
          <Reveal>
            <div className="section__head">
              <h2 className="xt-h2">Sélection</h2>
              <Button variant="ghost" to="/projets" icon="arrow-right">
                Tous les projets ({projects.length})
              </Button>
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
