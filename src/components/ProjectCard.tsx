import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { Icon } from '../design-system/Icon'
import { Tag } from './ui'
import { spot } from './effects'

/** Carte projet : toute la carte est le lien. Halo qui suit la souris. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projets/${project.slug}`} className="xt-card project-card spot" onMouseMove={spot}>
      <div className="xt-card__media">
        <Icon name={project.icon} size="lg" />
        <span className="project-card__quality">{project.quality}</span>
      </div>
      <div className="xt-card__meta">
        <span className="xt-eyebrow">{project.sector} · {project.year}</span>
      </div>
      <h3 className="xt-h3">{project.title}</h3>
      <p className="xt-small">{project.tagline}</p>
      <div className="xt-card__tags">
        {project.tags.slice(0, 4).map((t) => <Tag key={t}>{t}</Tag>)}
      </div>
      {project.impact ? (
        <div className="xt-card__impact">
          <strong>{project.impact.value}</strong>
          <span className="xt-small">{project.impact.label}</span>
        </div>
      ) : (
        <span className="project-card__cta">Essayer la démo <Icon name="arrow-right" size="sm" /></span>
      )}
    </Link>
  )
}
