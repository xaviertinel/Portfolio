import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'
import { Icon } from '../design-system/Icon'
import { Tag } from './ui'

/** Carte projet Morpho irisé : toute la carte est le lien (un seul arrêt de tabulation). */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projets/${project.slug}`} className="xt-card project-card">
      <div className="xt-card__media">
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" />
        ) : (
          <Icon name={project.icon} size="lg" />
        )}
      </div>

      <div className="xt-card__meta">
        <span className="xt-eyebrow">
          {project.type} · {project.year}
        </span>
      </div>

      <h3 className="xt-h3">{project.title}</h3>
      <p className="xt-small">{project.tagline}</p>

      <div className="xt-card__tags">
        {project.tags.slice(0, 5).map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
      </div>

      {project.impact ? (
        <div className="xt-card__impact">
          <strong>{project.impact.value}</strong>
          <span className="xt-small">{project.impact.label}</span>
        </div>
      ) : (
        <span className="project-card__cta">
          Voir le projet <Icon name="arrow-right" size="sm" />
        </span>
      )}
    </Link>
  )
}
