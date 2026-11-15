// Infos personnelles affichées partout sur le site. Modifiez librement.
export const site = {
  name: 'Xavier Tinel',
  shortName: 'Xavier Tinel',
  role: "Ingénieur · Conseil en stratégie et data, secteur de l'énergie",
  city: 'Paris',
  timeZone: 'Europe/Paris',

  /** Titre tapé lettre par lettre sur l'accueil */
  hello: 'Bonjour, Xavier ici.',
  headline: 'Je mets la data au service de la transition énergétique.',
  intro:
    "Ingénieur CentraleSupélec et diplômé de l'ESCP, je suis consultant en stratégie et Data Scientist dans l'énergie. Du terrain au comité de direction : je construis les indicateurs, les modèles et les synthèses qui aident à décider. Français-espagnol bilingue.",

  kpis: [
    { value: 11, suffix: '', label: 'missions de conseil menées' },
    { value: 7, suffix: '', label: "acteurs de l'énergie accompagnés" },
    { value: 50, suffix: '+', label: 'indicateurs stratégiques définis avec le terrain' },
    { value: 5, suffix: ' ans', label: "d'expérience data et stratégie" },
  ],

  about: [
    "Je travaille là où la stratégie rencontre la donnée. Mon métier : transformer des bases volumineuses et des questions floues en décisions claires, pour des directions des opérations, de la stratégie ou des finances.",
    "Ma méthode tient en trois temps. D'abord le terrain : je construis les indicateurs avec celles et ceux qui les utiliseront. Ensuite le modèle : Python, SQL, machine learning ou économétrie, selon le besoin. Enfin la synthèse : un tableau de bord ou une note qui tient en une page.",
    "En dehors des missions, je m'engage pour la cause animale et j'écris sur les liens entre énergie et vivant.",
  ],

  skills: [
    { label: 'Data & IA', items: ['Python', 'Machine Learning', 'SQL', 'Modélisation économétrique', 'Statistiques'] },
    { label: 'Visualisation', items: ['Power BI', 'Tableau', 'Excel avancé', 'Data storytelling'] },
    { label: 'Stratégie', items: ['TCO', 'Trajectoires bas-carbone', "Plans d'investissement", 'Veille sectorielle'] },
    { label: 'Management', items: ['Équipes projet de 5 à 10 personnes', 'PMO', 'Encadrement'] },
  ],

  /** Parcours antichronologique */
  experience: [
    {
      tab: 'BearingPoint',
      title: 'Consultant en stratégie',
      org: 'BearingPoint',
      date: '09/2022 · aujourd’hui',
      place: 'Paris, La Défense',
      current: true,
      points: [
        "11 missions chez 7 acteurs de l'énergie",
        'Veille sectorielle et rédaction de la newsletter hebdomadaire « Sustainability in utilities »',
        'Élaboration du livre blanc « Impact des EnR sur le vivant »',
      ],
    },
    {
      tab: 'EDF',
      title: 'Data Scientist, direction des opérations',
      org: 'EDF, nucléaire (mission de conseil)',
      date: '11/2025 · aujourd’hui',
      place: 'Île-de-France',
      current: true,
      points: [
        'Vision stratégique de la maintenance des CNPE',
        'Plus de 50 indicateurs stratégiques définis avec les opérateurs de terrain',
        'Traitement de bases de données volumineuses à fort enjeu de sûreté',
        'Conception du tableau de bord décisionnel sous Power BI',
      ],
    },
    {
      tab: 'Enedis',
      title: 'Data Scientist, direction stratégique',
      org: 'Enedis (mission de conseil)',
      date: '02/2025 · aujourd’hui',
      place: 'Paris, La Défense',
      current: true,
      points: [
        "Préparation de l'électrification de la flotte de véhicules interne",
        'Répartition territoriale du budget annuel (75 M€)',
        'Déploiement de la trajectoire bas-carbone : 100 % de véhicules électriques à horizon 2030',
        "Analyses prédictives sur l'usage des véhicules et l'impact sur les activités",
      ],
    },
    {
      tab: 'ONEE',
      title: 'Conseiller auprès de la direction financière',
      org: "Office national de l'électricité du Maroc (mission de conseil)",
      date: '02/2023 · 02/2024',
      place: 'Casablanca, Maroc',
      points: [
        "Outil de rapprochement comptable fiabilisant les actifs grâce à l'IA",
        'Plus de 100 M€ d’encours anciens résorbés',
        "Plan d'investissement stratégique résilient aux aléas climatiques",
      ],
    },
    {
      tab: 'DGEC / CRE',
      title: 'Analyste, domaine opérations',
      org: 'DGEC / CRE (mission de conseil)',
      date: '09/2022 · 09/2023',
      place: 'Hauts-de-France',
      points: [
        "Prévision de la consommation d'électricité à horizon 2030 par machine learning",
        'Modélisation économétrique des activités régionales (200 M€, 800 agents)',
        "Dimensionnement d'un plan à moyen terme",
      ],
    },
    {
      tab: 'EDF Power Solutions',
      title: 'Data Scientist, R&D direction des opérations',
      org: 'EDF Power Solutions (ex EDF Renouvelables)',
      date: '09/2021 · 09/2022',
      place: 'Montpellier',
      points: [
        "Prédiction de la production d'électricité de parcs éoliens",
        'Modèle prospectif par machine learning sous Python',
        'Données météo récupérées par API, préparées en SQL',
        'Restitution des KPI sous Tableau, mode opératoire et passation aux équipes',
      ],
    },
  ],

  education: [
    { title: 'Ingénieur Centrale Paris', org: 'CentraleSupélec', date: '2017 · 2020', note: 'Spécialité production durable, avec AgroParisTech' },
    { title: 'Master in Management', org: 'ESCP Business School', date: '2018 · 2020', note: 'Transitions énergétiques et durabilité, double diplôme (Turin, Londres)' },
  ],

  certifications: [
    "Politique et économie de l'énergie internationale · Sciences Po",
    "L'énergie au 21ᵉ siècle · École des Mines de Paris",
    'Modèles graphiques probabilistes · Stanford University',
    "Excel TCD, cas réels tirés de l'industrie · Microsoft",
    'Altruisme efficace · Princeton University',
  ],

  languages: ['Français et espagnol : langues maternelles (double nationalité)', 'Anglais : courant professionnel'],

  passions: [
    "Cause animale : soins aux animaux sauvages à l'école vétérinaire d'Alfort, co-fondateur de l'association Cœur d'Artichaud (maraudes pour les animaux de ville)",
    'Judo et renforcement musculaire',
    'Jeux de stratégie',
    'Guitare',
  ],

  marquee: ['Python', 'Machine Learning', 'Power BI', 'SQL', 'Économétrie', 'TCO', 'Trajectoires bas-carbone', 'Stratégie énergie', 'Data storytelling', 'PMO'],

  email: 'tejada.xavier@gmail.com',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/xavier-tinel/' },
    { label: 'GitHub', url: 'https://github.com/xaviertinel' },
  ],
}
