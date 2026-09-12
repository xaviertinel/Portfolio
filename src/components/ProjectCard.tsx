import type { Project } from '../data/projects'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={`card${project.featured ? ' card--featured' : ''}`}>
      <div className="card__media">
        {project.image ? (
          <img src={project.image} alt={project.title} loading="lazy" />
        ) : (
          <div className="card__placeholder" aria-hidden="true">
            {project.title.charAt(0)}
          </div>
        )}
      </div>

      <div className="card__body">
        <div className="card__head">
          <h3 className="card__title">{project.title}</h3>
          <span className="card__year">{project.year}</span>
        </div>
        <p className="card__tagline">{project.tagline}</p>
        <p className="card__desc">{project.description}</p>

        <ul className="card__tags">
          {project.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="card__actions">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn--primary">
              Voir le projet →
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer" className="btn btn--ghost">
              Code
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
