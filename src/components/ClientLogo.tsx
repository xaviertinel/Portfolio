import type { Project } from '../data/projects'

/** Logo du client ; sans fichier logo, affiche le nom en wordmark. */
export function ClientLogo({ project, className = '' }: { project: Project; className?: string }) {
  return project.logo ? (
    <img src={project.logo} alt={project.client} className={`client-logo ${className}`} />
  ) : (
    <span className={`client-logo client-logo--text ${className}`}>{project.client}</span>
  )
}
