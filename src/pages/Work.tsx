import { projects } from '../data/projects'
import { ProjectCard } from '../components/ProjectCard'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function Work() {
  return (
    <section className="section section--top">
      <div className="shell">
        <Reveal>
          <p className="eyebrow">{projects.length} projets</p>
        </Reveal>
        <AnimatedTitle text="Projets" className="page__title display" delay={0.1} />
        <Reveal delay={0.35}>
          <p className="page__lead">
            Des outils autour de la mesure carbone et de la mobilité électrique,
            et quelques projets personnels.
          </p>
        </Reveal>

        <StaggerGroup className="grid">
          {projects.map((p) => (
            <Stagger key={p.slug}>
              <ProjectCard project={p} />
            </Stagger>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
