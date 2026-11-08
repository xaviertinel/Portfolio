import type { IconName } from '../design-system/icons'

// ────────────────────────────────────────────────────────────────
//  AJOUTER UN PROJET
//  Duplique un bloc, change les valeurs. La grille, la page /projets
//  et la fiche détaillée /projets/<slug> se génèrent automatiquement.
// ────────────────────────────────────────────────────────────────

export type Project = {
  /** Identifiant unique en kebab-case : sert d'URL : /projets/<slug> */
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
  /** Contexte / commanditaire : optionnel */
  context?: string
  /** Paragraphe d'intro sur la fiche détaillée */
  intro: string
  /** Points clés : ce que fait le projet, ce que tu as construit */
  highlights: string[]
  /** Technos / mots-clés */
  tags: string[]
  liveUrl?: string
  repoUrl?: string
  /** Image dans public/projects/ : ex: "/projects/mei-pulse.png" */
  image?: string
  /** Entreprise cliente (affichée avec son logo) */
  client: string
  /** Logo dans public/logos/ : ex: "/logos/edf.svg". Sans logo, le nom du client s'affiche. */
  logo?: string
  /** Icône du visuel quand il n'y a pas d'image (voir design-system/icons.ts) */
  icon: IconName
  /** Chiffre clé affiché en bas de carte : valeur courte + libellé */
  impact?: { value: string; label: string }
  /** Remonte le projet en tête de liste */
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'edf-maintenance-cnpe',
    client: 'EDF',
    title: "Tableau de bord de la maintenance des CNPE",
    tagline: "Piloter la maintenance des centrales nucléaires de production d'électricité.",
    year: '',
    role: 'Design produit',
    type: 'Tableau de bord',
    context: 'EDF',
    intro:
      "Un tableau de bord pour suivre la maintenance des CNPE d'EDF : avancement des opérations, alertes et indicateurs clés réunis dans une lecture claire.",
    highlights: [
      "Indicateurs de maintenance consolidés sur une même vue",
      "Lecture rapide des écarts et des priorités",
    ],
    tags: ['Data viz', 'Dashboard', 'Nucléaire'],
    icon: 'chart-line-up',
    featured: true,
  },
  {
    slug: 'enedis-veille-mobilite',
    client: 'Enedis',
    title: "Veille sur la mobilité électrique",
    tagline: "Suivre les évolutions de la mobilité électrique et leurs effets sur le réseau.",
    year: '',
    role: 'Design produit',
    type: 'Veille',
    context: 'Enedis',
    intro:
      "Un dispositif de veille pour Enedis sur la mobilité électrique : marché, usages, infrastructures de recharge et signaux utiles au réseau de distribution.",
    highlights: [
      "Collecte et structuration des sources de veille",
      "Synthèses lisibles pour les équipes",
    ],
    tags: ['Mobilité électrique', 'Veille', 'Data'],
    icon: 'bolt',
    featured: true,
  },
  {
    slug: 'cre-dgec-monte-carlo-irve',
    client: 'CRE & DGEC',
    title: "Simulations Monte Carlo d'IRVE",
    tagline: "Simuler le déploiement des infrastructures de recharge pour véhicules électriques.",
    year: '',
    role: 'Design produit',
    type: 'Simulation',
    context: 'CRE & DGEC',
    intro:
      "Des simulations Monte Carlo pour la CRE et la DGEC afin d'estimer les besoins et les effets du déploiement des IRVE selon différents scénarios.",
    highlights: [
      "Modélisation probabiliste de scénarios de recharge",
      "Restitution des résultats pour éclairer la décision",
    ],
    tags: ['Monte Carlo', 'IRVE', 'Simulation'],
    icon: 'chart-line-up',
  },
  {
    slug: 'edf-ps-prediction-eolien',
    client: 'EDF Power Solutions',
    title: "Prédiction ML de la production des parcs éoliens",
    tagline: "Anticiper la production des parcs éoliens grâce au machine learning.",
    year: '',
    role: 'Design produit',
    type: 'Machine learning',
    context: 'EDF Power Solutions',
    intro:
      "Un modèle de machine learning pour EDF Power Solutions qui prévoit la production des parcs éoliens à partir des données météo et d'exploitation.",
    highlights: [
      "Prévision de production à partir des données météo",
      "Suivi de la qualité des prédictions",
    ],
    tags: ['Machine learning', 'Éolien', 'Prévision'],
    icon: 'brain-circuit',
  },
  {
    slug: 'onee-rapprochement-inventaire',
    client: 'ONEE',
    title: "Rapprochement inventaire physique et comptable par IA",
    tagline: "Réconcilier l'inventaire physique et l'inventaire comptable avec l'IA.",
    year: '',
    role: 'Design produit',
    type: 'IA',
    context: 'ONEE',
    intro:
      "Un outil d'IA pour l'ONEE qui rapproche l'inventaire physique des immobilisations et l'inventaire comptable, et met en évidence les écarts à traiter.",
    highlights: [
      "Appariement automatique des lignes physiques et comptables",
      "Mise en évidence des écarts à analyser",
    ],
    tags: ['IA', 'Inventaire', 'Finance'],
    icon: 'sparkles',
  },
]

export const getProject = (slug?: string) =>
  projects.find((p) => p.slug === slug)
