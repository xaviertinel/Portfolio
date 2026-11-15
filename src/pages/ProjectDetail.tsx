import { Link, useParams, Navigate } from 'react-router-dom'
import { getProject, projects } from '../data/projects'
import { demos } from '../demos'
import { Icon } from '../design-system/Icon'
import { KpiStat, Tag } from '../components/ui'
import { AnimatedTitle, Reveal, Stagger, StaggerGroup } from '../components/motion'
import { Kwh } from '../game/Game'

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <Navigate to="/projets" replace />

  const index = projects.findIndex((p) => p.slug === project.slug)
  const next = projects[(index + 1) % projects.length]
  const Demo = demos[project.demo]
  const facts = [
    { label: 'Période', value: project.year },
    { label: 'Rôle', value: project.role },
    { label: 'Secteur', value: project.sector },
    { label: 'Compétence clé', value: project.quality },
  ]

  return (
    <article className="section section--top" key={project.slug}>
      <div className="shell rel">
        <Kwh id={`projet-${project.slug}`} style={{ top: 64, right: '5%' }} />
        <Reveal>
          <Link to="/projets" className="xt-btn xt-btn--ghost backlink">
            <Icon name="angle-small-right" size="sm" className="flip" />Projets
          </Link>
        </Reveal>
        <AnimatedTitle text={project.title} className="xt-h1 page__title" delay={0.1} />
        <Reveal delay={0.3}><p className="xt-lead page__lead">{project.tagline}</p></Reveal>

        <StaggerGroup className="facts" gap={0.07}>
          {facts.map((f) => (
            <Stagger key={f.label}>
              <p className="xt-eyebrow">{f.label}</p>
              <p className="fact__value">{f.value}</p>
            </Stagger>
          ))}
        </StaggerGroup>

        <Reveal>
          <section className="demo-frame beam" aria-label="Démonstration interactive">
            <header className="demo-frame__head">
              <div>
                <p className="xt-eyebrow">Démo interactive · {project.quality}</p>
                <p>{project.demoNote}</p>
              </div>
              <span className="xt-badge xt-badge--outline"><Icon name="lock" size="sm" />Données synthétiques</span>
            </header>
            <Demo />
            <p className="xt-small demo-frame__note">
              Démonstration anonymisée : les données sont générées pour l'exemple et ne proviennent d'aucun client. Elle illustre la méthode, pas les résultats réels de la mission.
            </p>
          </section>
        </Reveal>

        <div className="about subsection">
          <div className="prose">
            <Reveal><p className="prose__intro">{project.intro}</p></Reveal>
            <Reveal><h2 className="xt-h2 prose__heading">Ma démarche</h2></Reveal>
            <StaggerGroup gap={0.08}>
              {project.highlights.map((h, i) => (
                <Stagger key={h}>
                  <p className="bullet"><span className="bullet__index">{String(i + 1).padStart(2, '0')}</span>{h}</p>
                </Stagger>
              ))}
            </StaggerGroup>
          </div>
          <aside>
            {project.impact && <Reveal><div className="prose__kpi"><KpiStat value={project.impact.value} label={project.impact.label} /></div></Reveal>}
            <Reveal>
              <p className="xt-eyebrow">Outils et méthodes</p>
              <div className="taglist taglist--tight">{project.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
            </Reveal>
          </aside>
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
