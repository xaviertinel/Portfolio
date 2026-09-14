import { Link } from 'react-router-dom'
import type { Project } from '../data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projets/${project.slug}`} className="tile">
      <div
        className="tile__media"
        style={{ '--accent': project.accent ?? '#2f4bd8' } as React.CSSProperties}
      >
        {project.image ? (
          <img src={project.image} alt="" loading="lazy" />
        ) : (
          <span className="tile__glyph" aria-hidden="true">
            {project.title.charAt(0)}
          </span>
        )}
      </div>

      <div className="tile__body">
        <div className="tile__row">
          <h3 className="tile__title">{project.title}</h3>
          <span className="tile__year">{project.year}</span>
        </div>
        <p className="tile__tagline">{project.tagline}</p>
        <span className="tile__cta">Voir le projet →</span>
      </div>
    </Link>
  )
}
