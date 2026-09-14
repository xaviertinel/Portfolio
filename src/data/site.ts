// Infos personnelles affichées partout sur le site — modifie librement.
export const site = {
  name: 'Xavier Tinel',
  /** Affiché en petit dans l'en-tête */
  shortName: 'Xavier Tinel',
  role: 'Designer & Développeur',
  /** ⚠️ À corriger : ta ville et ton fuseau horaire */
  city: 'Paris, FR',
  timeZone: 'Europe/Paris',

  /** Phrase d'accroche de la page d'accueil (titre animé) */
  headline: "Je conçois et développe des produits web.",
  /** Paragraphe sous le titre */
  intro:
    "Du design à la mise en ligne, je construis des outils clairs — souvent autour de la transition énergétique et de la mesure carbone. Français-espagnol bilingue.",

  /** Page À propos */
  about: [
    "Je travaille à la frontière du design et du développement : je conçois l'interface, puis je l'implémente moi-même. Ça évite les allers-retours et ça garde le produit cohérent, de la première maquette à la mise en production.",
    "Une bonne partie de mes projets tourne autour de la décarbonation : bilans carbone, trajectoires de réduction, transition d'une flotte vers l'électrique. Des sujets où la donnée est dense et où tout l'enjeu est de la rendre lisible et actionnable.",
    "Je suis français-espagnol bilingue, et j'aime les outils qui vont droit au but : pas de configuration inutile, pas d'écran superflu.",
  ],

  /** Compétences affichées sur la page À propos */
  skills: [
    { label: 'Design produit', items: ['Interfaces', 'Design systems', 'Prototypage'] },
    { label: 'Développement', items: ['React', 'TypeScript', 'Vite', 'CSS'] },
    { label: 'Domaines', items: ['Bilan carbone', 'Mobilité électrique', 'Data viz'] },
  ],

  /** Défilement du bandeau sur la page d'accueil */
  marquee: [
    'Design produit',
    'React',
    'TypeScript',
    'Bilan carbone',
    'Design systems',
    'Mobilité électrique',
    'Data viz',
    'Vite',
  ],

  email: 'tejada.xavier@gmail.com',
  links: [
    { label: 'GitHub', url: 'https://github.com/xaviertinel' },
    // { label: 'LinkedIn', url: 'https://linkedin.com/in/...' },
  ],
}
