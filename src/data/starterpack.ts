/** Starter pack : neuf objets qui me représentent. x / y = position sur la photo, en %. */
export type PackItem = { id: string; name: string; x: number; y: number; what: string; why: string }

export const starterPack: PackItem[] = [
  {
    id: 'casque', name: 'Le casque de chantier blanc', x: 20, y: 27,
    what: 'Un casque de sécurité réglementaire, celui qu’on enfile avant d’entrer sur un site industriel.',
    why: "Il dit ma façon de travailler : sur le terrain. Je construis mes indicateurs avec les opérateurs, que ce soit sur des centrales nucléaires (EDF), sur le réseau électrique (Enedis) ou sur des infrastructures à l'international (ONEE, au Maroc). Un indicateur que le terrain ne reconnaît pas ne sert à rien.",
  },
  {
    id: 'voiture', name: 'La petite voiture électrique verte', x: 58, y: 18,
    what: 'Une miniature de véhicule électrique, avec un éclair sur le toit.',
    why: "Elle résume mon terrain de jeu : l'énergie et le transport bas-carbone. Double cursus tourné vers la production durable et les transitions énergétiques, puis des missions très concrètes d'électrification de flottes et de trajectoires de décarbonation, comme chez Enedis.",
  },
  {
    id: 'clavier', name: 'Le clavier mécanique sans fil', x: 84, y: 40,
    what: 'Un clavier compact et minimaliste, sans un fil ni une touche de trop.',
    why: "C'est l'outil central de ma boîte à outils de Data Scientist : Python, machine learning, SQL, modélisation économétrique, Power BI. Sa sobriété ressemble à ma méthode : agile, structurée, sans superflu.",
  },
  {
    id: 'sceau', name: 'Le sceau-cylindre mésopotamien', x: 48, y: 35,
    what: "Un cylindre de pierre gravé et son empreinte dans l'argile : l'un des tout premiers systèmes de traçabilité et de stockage de données de l'histoire.",
    why: "Il illustre ce que je fais des systèmes d'information complexes : les structurer, les fiabiliser, les gouverner. PMO, rapprochement comptable d'actifs, assainissement de données financières : la rigueur de gestion au service de la donnée.",
  },
  {
    id: 'sabre', name: 'Le sabre laser vert', x: 47, y: 50,
    what: "L'arme des maîtres et des érudits de Star Wars, associée à la sagesse et à la transmission.",
    why: "Il symbolise mon rôle de mentor. Encadrer une équipe projet, passer une méthode aux équipes opérationnelles, accompagner des profils plus juniors : je privilégie la transmission et un leadership bienveillant.",
  },
  {
    id: 'ceinture', name: 'La ceinture de judo verte', x: 16, y: 73,
    what: "Une ceinture d'arts martiaux en coton tressé, nouée à la manière traditionnelle.",
    why: "Je pratique le judo régulièrement. Au-delà de l'effort, j'y trouve des valeurs utiles en conseil comme en management : discipline, résilience, respect et maîtrise de soi.",
  },
  {
    id: 'livre', name: 'Le livre The Planiverse', x: 45, y: 77,
    what: "Un roman d'A. K. Dewdney qui modélise, avec une vraie rigueur physique et informatique, la vie dans un univers à deux dimensions.",
    why: "Il témoigne de ma curiosité et de mon goût pour l'apprentissage continu, que je nourris aussi par des certifications en ligne. J'aime explorer un système complexe sous un angle inattendu.",
  },
  {
    id: 'tesseract', name: 'Le tesseract', x: 66, y: 83,
    what: "La projection translucide d'un cube en quatre dimensions.",
    why: "La rencontre entre la rigueur mathématique de l'ingénieur et la créativité. Manipuler des modèles abstraits et multidimensionnels (IA, algorithmes prédictifs) pour résoudre des problèmes stratégiques bien réels.",
  },
  {
    id: 'lapin', name: 'Le bébé lapin en peluche', x: 85, y: 82,
    what: 'Une petite peluche de jeune lapin.',
    why: "Mon engagement pour la cause animale et le vivant : bénévolat de soins aux animaux sauvages à l'école vétérinaire d'Alfort, co-fondation de l'association Cœur d'Artichaud (maraudes pour les animaux de ville) et réflexions sur l'impact des énergies renouvelables sur la biodiversité.",
  },
]
