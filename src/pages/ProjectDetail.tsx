import { Link, useParams, Navigate } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <Navigate to="/projets" replace />

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  const facts = [
    { label: 'Année', value: project.year },
    { label: 'Rôle', value: project.role },
    { label: 'Type', value: project.type },
    ...(project.context ? [{ label: 'Contexte', value: project.context }] : []),
  ]

  return (
    <article className="section section--top">
      <div className="shell">
        <Reveal>
          <Link to="/projets" className="backlink">
            ← Projets
          </Link>
        </Reveal>

        <AnimatedTitle
          text={project.title}
          className="page__title display"
          delay={0.1}
        />
        <Reveal delay={0.35}>
          <p className="page__lead">{project.tagline}</p>
        </Reveal>

        <StaggerGroup className="facts" gap={0.07}>
          {facts.map((f) => (
            <Stagger key={f.label}>
              <div className="fact">
                <p className="fact__label">{f.label}</p>
                <p className="fact__value">{f.value}</p>
              </div>
            </Stagger>
          ))}
        </StaggerGroup>

        <Reveal>
          <div
            className="banner"
            style={
              { '--accent': project.accent ?? '#2f4bd8' } as React.CSSProperties
            }
          >
            {project.image ? (
              <img src={project.image} alt={project.title} />
            ) : (
              <span className="banner__glyph" aria-hidden="true">
                {project.title.charAt(0)}
              </span>
            )}
          </div>
        </Reveal>

        <div className="prose">
          <Reveal>
            <p className="prose__intro">{project.intro}</p>
          </Reveal>

          <Reveal>
            <h2 className="prose__heading display">Ce que fait le projet</h2>
          </Reveal>
          <StaggerGroup gap={0.08}>
            {project.highlights.map((h, i) => (
              <Stagger key={i}>
                <p className="bullet">
                  <span className="bullet__index">{String(i + 1).padStart(2, '0')}</span>
                  {h}
                </p>
              </Stagger>
            ))}
          </StaggerGroup>

          <Reveal>
            <ul className="taglist">
              {project.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>

          {(project.liveUrl || project.repoUrl) && (
            <Reveal>
              <div className="btn-row">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--primary"
                  >
                    Voir en ligne →
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn--ghost"
                  >
                    Code source
                  </a>
                )}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal>
          <Link to={`/projets/${next.slug}`} className="nextlink">
            <span className="nextlink__label">Projet suivant</span>
            <span className="nextlink__title display">{next.title}</span>
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
