import type { IconName } from '../design-system/icons'

// ────────────────────────────────────────────────────────────────
//  AJOUTER UN PROJET
//  Dupliquez un bloc et changez les valeurs. `demo` désigne la démo
//  interactive (voir src/demos/index.tsx). Jamais de nom de client.
// ────────────────────────────────────────────────────────────────

export type DemoKey = 'bi' | 'tco' | 'matching' | 'wind' | 'forecast' | 'trajectory' | 'math'

export type Project = {
  /** Identifiant en kebab-case, sert d'URL : /projets/<slug> */
  slug: string
  title: string
  tagline: string
  year: string
  role: string
  /** Secteur générique, jamais de nom de client */
  sector: string
  /** Qualité mise en avant pour un recruteur */
  quality: string
  intro: string
  /** Démarche : ce que j'ai fait, étape par étape */
  highlights: string[]
  tags: string[]
  icon: IconName
  /** Chiffre clé : valeur courte + libellé */
  impact?: { value: string; label: string }
  demo: DemoKey
  /** Une phrase qui explique ce que montre la démo */
  demoNote: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    slug: 'pilotage-maintenance',
    title: 'Piloter la maintenance de sites industriels',
    tagline: 'Un tableau de bord décisionnel bâti avec les opérateurs de terrain.',
    year: '2025 · 2026',
    role: 'Data Scientist',
    sector: 'Production nucléaire',
    quality: 'Visualisation BI',
    intro:
      "La direction des opérations voulait une vision stratégique de la maintenance de ses sites. J'ai défini les indicateurs avec les équipes de terrain, fiabilisé des bases volumineuses à fort enjeu de sûreté, puis conçu le tableau de bord qui sert aujourd'hui aux arbitrages.",
    highlights: [
      'Ateliers avec les opérateurs pour définir plus de 50 indicateurs métiers',
      'Traitement et contrôle qualité de bases de données volumineuses',
      'Modèle de données et tableau de bord décisionnel sous Power BI',
      "Lecture en trois niveaux : direction, site, équipe d'intervention",
    ],
    tags: ['Power BI', 'SQL', 'Python', 'Indicateurs', 'Sûreté'],
    icon: 'chart-line-up',
    impact: { value: '50+', label: 'indicateurs définis avec le terrain' },
    demo: 'bi',
    demoNote: 'Filtrez par site et par indicateur : les chiffres, le classement et la tendance se recalculent.',
    featured: true,
  },
  {
    slug: 'electrification-flotte',
    title: 'Électrifier une flotte de véhicules',
    tagline: 'Répartir un budget annuel et objectiver chaque remplacement par le TCO.',
    year: '2025 · 2026',
    role: 'Data Scientist',
    sector: 'Réseau de distribution',
    quality: 'Modélisation économique',
    intro:
      "Objectif : 100 % de véhicules électriques à horizon 2030. J'ai construit le modèle qui répartit le budget annuel sur le territoire, calcule le coût total de possession de chaque remplacement et anticipe l'impact sur les activités.",
    highlights: [
      'Répartition territoriale du budget annuel de 75 M€',
      'Calcul de TCO sur 10 ans, véhicule par véhicule',
      "Analyses prédictives de l'usage réel des véhicules",
      'Trajectoire bas-carbone et jalons annuels',
    ],
    tags: ['TCO', 'Python', 'Analyse prédictive', 'Mobilité électrique'],
    icon: 'bolt',
    impact: { value: '75 M€', label: 'de budget annuel réparti' },
    demo: 'tco',
    demoNote: 'Déplacez les curseurs : le point de bascule entre thermique et électrique se déplace en direct.',
    featured: true,
  },
  {
    slug: 'rapprochement-actifs',
    title: 'Rapprocher des actifs comptables par IA',
    tagline: "Fiabiliser un patrimoine en reliant l'inventaire technique à la comptabilité.",
    year: '2023 · 2024',
    role: 'Conseiller, direction financière',
    sector: "Opérateur national d'électricité",
    quality: 'Traitement de données',
    intro:
      "Deux référentiels décrivaient les mêmes actifs avec des libellés différents. J'ai conçu un outil de rapprochement qui normalise les libellés, calcule une similarité et propose les paires à valider, ce qui a permis d'assainir des encours anciens.",
    highlights: [
      'Normalisation des libellés : casse, abréviations, unités',
      'Score de similarité textuelle et règles de cohérence sur les montants',
      'File de validation pour les cas ambigus',
      'Plus de 100 M€ d’encours anciens résorbés',
    ],
    tags: ['Python', 'NLP', 'Qualité de données', 'Finance'],
    icon: 'database',
    impact: { value: '100 M€+', label: "d'encours anciens résorbés" },
    demo: 'matching',
    demoNote: 'Réglez le seuil de similarité : précision et rappel se recalculent sur les deux registres.',
    featured: true,
  },
  {
    slug: 'prevision-eolien',
    title: 'Prévoir la production de parcs éoliens',
    tagline: 'Un modèle de machine learning alimenté par la météo.',
    year: '2021 · 2022',
    role: 'Data Scientist R&D',
    sector: 'Énergies renouvelables',
    quality: 'Machine Learning',
    intro:
      "Pour anticiper la production de parcs éoliens, j'ai développé un modèle prospectif sous Python : récupération des données météo par API, préparation en SQL, entraînement, puis restitution des résultats aux équipes d'exploitation.",
    highlights: [
      'Collecte automatisée des données météo par API',
      'Préparation et contrôle des données en SQL',
      'Comparaison de plusieurs familles de modèles',
      'Restitution des KPI sous Tableau et passation aux équipes',
    ],
    tags: ['Python', 'Machine Learning', 'SQL', 'API', 'Tableau'],
    icon: 'brain-circuit',
    demo: 'wind',
    demoNote: "Changez de modèle : la courbe s'ajuste et l'erreur sur les données de test se met à jour.",
  },
  {
    slug: 'prevision-consommation',
    title: "Prévoir la consommation d'électricité à 2030",
    tagline: 'Des scénarios chiffrés, avec leur marge d’incertitude.',
    year: '2022 · 2023',
    role: 'Analyste',
    sector: "Acteurs publics de l'énergie",
    quality: 'Statistiques',
    intro:
      "Quelle consommation attendre en 2030 sur un territoire ? J'ai combiné machine learning et modélisation économétrique pour produire des scénarios, puis dimensionné le plan à moyen terme qui en découle.",
    highlights: [
      'Prévision de la consommation à horizon 2030',
      'Modélisation économétrique des activités (200 M€, 800 agents)',
      "Scénarios et intervalles d'incertitude",
      'Dimensionnement du plan à moyen terme',
    ],
    tags: ['Économétrie', 'Machine Learning', 'Python', 'Scénarios'],
    icon: 'calendar',
    demo: 'forecast',
    demoNote: "Modifiez les hypothèses : 400 simulations dessinent la médiane et l'intervalle P10 · P90.",
  },
  {
    slug: 'trajectoire-carbone',
    title: 'Construire une trajectoire bas-carbone',
    tagline: 'Du bilan aux leviers, classés par coût et par impact.',
    year: '2025',
    role: 'Conception et développement',
    sector: 'Outil personnel',
    quality: 'Synthèse stratégique',
    intro:
      "Un outil de bilan gaz à effet de serre sur les scopes 1, 2 et 3, qui ne se contente pas de mesurer : il projette une trajectoire de réduction et classe les leviers. Aucune donnée ne quitte le navigateur.",
    highlights: [
      'Bilan GES sur les scopes 1, 2 et 3',
      "Facteurs d'émission de la Base Empreinte de l'ADEME",
      'Leviers classés par coût de la tonne évitée',
      'Fonctionne entièrement en local',
    ],
    tags: ['React', 'TypeScript', 'Carbone', 'Local-first'],
    icon: 'leaf',
    impact: { value: '3 scopes', label: 'couverts par le bilan GES' },
    demo: 'trajectory',
    demoNote: "Activez les leviers : la trajectoire se rapproche de la cible et le coût s'additionne.",
  },
  {
    slug: 'mathware',
    title: 'MathWare',
    tagline: 'Des mini-jeux de calcul mental, pour le plaisir.',
    year: '2025',
    role: 'Projet personnel',
    sector: 'Jeu web',
    quality: "Sens du produit",
    intro:
      "Une série de mini-jeux courts autour du calcul mental, pensés pour être pris en main en quelques secondes et rejoués sans friction.",
    highlights: ['Boucle de jeu immédiate, sans écran de configuration', 'Plusieurs modes de jeu courts'],
    tags: ['React', 'Jeu', 'Interaction'],
    icon: 'sparkles',
    demo: 'math',
    demoNote: 'Trente secondes, un maximum de bonnes réponses.',
  },
]

export const getProject = (slug?: string) => projects.find((p) => p.slug === slug)
