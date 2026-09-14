// ────────────────────────────────────────────────────────────────
//  AJOUTER UN PROJET
//  Duplique un bloc, change les valeurs. La grille, la page /projets
//  et la fiche détaillée /projets/<slug> se génèrent automatiquement.
// ────────────────────────────────────────────────────────────────

export type Project = {
  /** Identifiant unique en kebab-case — sert d'URL : /projets/<slug> */
  slug: string
  title: string
  /** Une phrase courte, affichée sous le titre */
  tagline: string
  /** Année ou période */
  year: string
  /** Ton rôle sur le projet */
  role: string
  /** Nature du projet (Produit, Outil interne, Démonstrateur…) */
  type: string
  /** Contexte / commanditaire — optionnel */
  context?: string
  /** Paragraphe d'intro sur la fiche détaillée */
  intro: string
  /** Points clés : ce que fait le projet, ce que tu as construit */
  highlights: string[]
  /** Technos / mots-clés */
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  /** Image dans public/projects/ — ex: "/projects/mei-pulse.png" */
  image?: string
  /** Couleur d'accent de la fiche (dégradé de la vignette) */
  accent?: string
  /** Remonte le projet en tête de liste */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'mei-pulse',
    title: 'MEi Pulse',
    tagline: "Application mobile de mobilité électrique intelligente.",
    year: '2025',
    role: 'Design produit & développement',
    type: 'Application mobile',
    context: 'Concept Enedis',
    intro:
      "Une application mobile pensée pour piloter la mobilité électrique au quotidien : suivi de charge, planification des trajets et lecture claire de la consommation. Conçue à partir d'un comp de design, puis implémentée intégralement en React.",
    highlights: [
      "Interface mobile complète, du comp de design au code de production",
      "Respect strict d'un design system existant (charte « énergie électrifiée »)",
      "Composants réutilisables et états d'interface soignés",
    ],
    tags: ['React', 'Vite', 'Design system', 'Mobile'],
    accent: '#2f4bd8',
    featured: true,
  },
  {
    slug: 'e-quivalent',
    title: 'E-quivalent',
    tagline: "Comparateur de transition électrique pour une flotte de véhicules.",
    year: '2025',
    role: 'Conception & développement',
    type: 'Démonstrateur',
    context: 'Augmented Consultant Award',
    intro:
      "Pour chaque véhicule thermique d'une flotte, trouver l'équivalent électrique optimal — et surtout objectiver la décision. L'outil croise usage réel, coût total de possession et projections d'émissions pour rendre l'arbitrage lisible.",
    highlights: [
      "Matching multicritère entre véhicules thermiques et alternatives électriques",
      "Calcul de TCO sur 10 ans / 180 000 km",
      "Projections d'émissions CO₂ comparées, présentées pour la décision",
    ],
    tags: ['React', 'TypeScript', 'Data', 'TCO'],
    accent: '#0f9d6b',
    featured: true,
  },
  {
    slug: 'trajectoire',
    title: 'Trajectoire',
    tagline: "Bilan carbone et trajectoire de réduction, 100 % local.",
    year: '2025',
    role: 'Conception & développement',
    type: 'Outil métier',
    intro:
      "Un outil de bilan gaz à effet de serre couvrant les scopes 1, 2 et 3, qui ne se contente pas de mesurer : il projette une trajectoire de réduction et déroule un plan d'actions. Aucune donnée ne quitte le navigateur.",
    highlights: [
      "Bilan GES complet sur les scopes 1, 2 et 3",
      "Facteurs d'émission de la Base Empreinte® ADEME embarqués",
      "Trajectoire de réduction et plan d'actions associé",
      "Fonctionne intégralement en local — confidentialité des données",
    ],
    tags: ['React', 'ADEME', 'Carbone', 'Local-first'],
    accent: '#1f7a5c',
  },
  {
    slug: 'empreinte-conseil',
    title: 'Empreinte Conseil',
    tagline: "Calculateur d'empreinte carbone appliqué aux missions de conseil.",
    year: '2025',
    role: 'Design produit & développement',
    type: 'Outil métier',
    intro:
      "Estimer l'empreinte carbone d'une mission de conseil — déplacements, hébergement, matériel — pour la rendre visible et actionnable dès le cadrage. Implémenté depuis un comp de design sur un design system existant.",
    highlights: [
      "Modèle de calcul adapté au déroulé réel d'une mission",
      "Implémentation fidèle à un design system d'entreprise",
      "Restitution graphique pensée pour la présentation client",
    ],
    tags: ['React', 'Design system', 'Carbone'],
    accent: '#c2410c',
  },
  {
    slug: 'pronos-mondial',
    title: 'Pronos Mondial',
    tagline: "Jeu de pronostics football, installable sur mobile.",
    year: '2026',
    role: 'Projet personnel',
    type: 'PWA',
    intro:
      "Une application web progressive installable sur l'écran d'accueil : on pronostique le score des matchs, on marque des points, on grimpe au classement. Pensée en mode solo et entièrement locale — aucun compte, aucun serveur.",
    highlights: [
      "PWA installable, utilisable hors connexion",
      "Système de points et classement",
      "Données structurées pour brancher une vraie API ensuite",
    ],
    tags: ['PWA', 'React', 'Offline', 'Mobile'],
    accent: '#7c3aed',
  },
  {
    slug: 'mathware',
    title: 'MathWare',
    tagline: 'Mini-jeux mathématiques.',
    year: '2025',
    role: 'Projet personnel',
    type: 'Jeu web',
    intro:
      "Une série de mini-jeux courts autour du calcul mental, pensés pour être pris en main en quelques secondes et rejoués sans friction.",
    highlights: [
      'Plusieurs modes de jeu courts',
      'Boucle de jeu immédiate, sans écran de configuration',
    ],
    tags: ['React', 'Jeu', 'Interaction'],
    accent: '#0891b2',
  },
]

export const getProject = (slug?: string) =>
  projects.find((p) => p.slug === slug)
