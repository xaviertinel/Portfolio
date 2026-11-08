import { Link, useParams, Navigate } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import { Icon } from '../design-system/Icon'
import { Button, KpiStat, Tag } from '../components/ui'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  if (!project) return <Navigate to="/projets" replace />

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]

  const facts = [
    { label: 'Client', value: project.client },
    ...(project.year ? [{ label: 'Année', value: project.year }] : []),
    { label: 'Rôle', value: project.role },
    { label: 'Type', value: project.type },
  ]

  return (
    <article className="section section--top">
      <div className="shell">
        <Reveal>
          <Link to="/projets" className="xt-btn xt-btn--ghost backlink">
            <Icon name="angle-small-right" size="sm" className="flip" />
            Projets
          </Link>
        </Reveal>

        <AnimatedTitle
          text={project.title}
          className="xt-h1 page__title"
          delay={0.1}
        />
        <Reveal delay={0.35}>
          <p className="xt-lead page__lead">{project.tagline}</p>
        </Reveal>

        <StaggerGroup className="facts" gap={0.07}>
          {facts.map((f) => (
            <Stagger key={f.label}>
              <div className="fact">
                <p className="xt-eyebrow">{f.label}</p>
                <p className="fact__value">{f.value}</p>
              </div>
            </Stagger>
          ))}
        </StaggerGroup>

        <Reveal>
          <div className="banner">
            {project.image ? (
              <img src={project.image} alt={project.title} />
            ) : (
              <Icon name={project.icon} className="banner__icon" />
            )}
          </div>
        </Reveal>

        <div className="prose">
          <Reveal>
            <p className="prose__intro">{project.intro}</p>
          </Reveal>

          {project.impact && (
            <Reveal>
              <div className="prose__kpi">
                <KpiStat value={project.impact.value} label={project.impact.label} />
              </div>
            </Reveal>
          )}

          <Reveal>
            <h2 className="xt-h2 prose__heading">Ce que fait le projet</h2>
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
            <div className="taglist">
              {project.tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </div>
          </Reveal>

          {(project.liveUrl || project.repoUrl) && (
            <Reveal>
              <div className="btn-row">
                {project.liveUrl && (
                  <Button variant="primary" href={project.liveUrl} icon="arrow-up-right">
                    Voir en ligne
                  </Button>
                )}
                {project.repoUrl && (
                  <Button variant="secondary" href={project.repoUrl} iconLeft="github">
                    Code source
                  </Button>
                )}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal>
          <Link to={`/projets/${next.slug}`} className="nextlink">
            <span className="xt-eyebrow">Projet suivant</span>
            <span className="xt-h2 nextlink__title">{next.title}</span>
          </Link>
        </Reveal>
      </div>
    </article>
  )
}
