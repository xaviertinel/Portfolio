// ────────────────────────────────────────────────────────────────
//  AJOUTER UN PROJET
//  Copie un bloc ci-dessous, change les valeurs, et c'est en ligne.
//  Rien d'autre à toucher : la grille se met à jour automatiquement.
// ────────────────────────────────────────────────────────────────

export type Project = {
  /** Identifiant unique en kebab-case (sert aussi d'ancre/URL) */
  slug: string
  title: string
  /** Une phrase courte qui résume le projet */
  tagline: string
  /** Description plus longue affichée au survol / sur la fiche */
  description: string
  /** Technos / mots-clés */
  tags: string[]
  /** Année ou période */
  year: string
  /** Lien vers le projet en ligne (optionnel) */
  liveUrl?: string
  /** Lien vers le code source (optionnel) */
  repoUrl?: string
  /** Chemin d'une image dans /public (optionnel). Ex: "/projects/mon-projet.png" */
  image?: string
  /** Mettre à true pour mettre en avant le projet en haut de la grille */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'exemple-projet',
    title: 'Projet exemple',
    tagline: 'Remplace-moi par ton premier vrai projet.',
    description:
      "Ceci est une fiche de démonstration. Duplique ce bloc dans src/data/projects.ts pour ajouter un nouveau projet au portfolio.",
    tags: ['React', 'Vite', 'Design'],
    year: '2026',
    featured: true,
  },
]
