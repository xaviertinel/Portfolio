# Morpho irisé

Le design system du portfolio de Xavier Tinel, consultant senior Data Scientist dans l'énergie. Il sert à construire le site, avec un objectif unique : qu'un recruteur comprenne en 30 secondes qui est Xavier, ce qu'il a livré et comment le contacter.

Le nom vient du papillon morpho : un bleu irisé, précis et lumineux, rehaussé d'une touche d'or rare.

## Principes

1. **Lisible avant d'être beau.** Un recruteur survole : titres explicites, chiffres en avant, paragraphes courts.
2. **Le bleu guide, l'or distingue.** Le bleu porte l'interaction ; l'or ne marque que ce qui mérite d'être remarqué (un prix, un chiffre clé).
3. **Ingénieur et éditorial.** Serif pour la voix (titres), sans-serif pour l'information, monospace pour les chiffres et le code.
4. **Accessible par construction.** Chaque paire couleur/fond respecte WCAG 2.2 AA dans les deux thèmes ; le focus clavier est toujours visible.
5. **Sobre en mouvement.** Des transitions courtes qui confirment une action, jamais un spectacle.

## Architecture des tokens

Les tokens suivent les trois niveaux recommandés par les design systems actuels et le format W3C Design Tokens (version stable 2025.10). Chaque niveau ne référence que le niveau du dessous.

| Niveau | Nommé par | Exemples | Règle |
|---|---|---|---|
| Primitive | sa valeur | `blue-600`, `gold-400`, `navy-900` | Jamais utilisé directement dans un composant |
| Sémantique | son rôle | `text`, `primary`, `surface`, `accent-text` | Ce que le code consomme ; change de valeur selon le thème |
| Composant | élément + rôle | `button-primary-from`, `tag-bg`, `badge-gold-text` | Exceptions locales, sans polluer le niveau sémantique |

Changer de thème ne touche que les sémantiques et composants : les primitives restent fixes. Le mode sombre est donc un simple jeu d'alias, sans CSS à dupliquer.

## Couleurs

### Bleu en priorité

- `primary` (bleu Morpho foncé en clair, cyan en sombre) : liens, bouton secondaire, onglet actif, focus.
- `primary-strong` (bleu Morpho vif) : grands titres de 24px et plus, icônes, bordures actives. Jamais pour du texte courant en clair (3,3:1).
- `secondary` (cobalt) : survol des liens, données de second plan.

### Le dégradé pour le décoratif

Le dégradé Morpho va de `decor-from` (cyan) à `decor-to` (cobalt), en 135°. Il habille le hero, les visuels de carte, le fil de la timeline et la cover. **Jamais de texte courant dessus.** Le bouton principal utilise une variante plus sombre (`button-primary-from` → `button-primary-to`) qui garde un texte lisible.

### L'or en accent

- `accent` (or vif) : pastille, filet sous un KPI. Décoratif uniquement en mode clair (2,1:1 sur blanc).
- `accent-text` (or foncé en clair) : chiffre d'impact, label de distinction.
- `badge-gold-*` : le badge « Lauréat », 1 par carte au maximum.

Règle de dosage : environ 70 % de neutres, 25 % de bleu, 5 % d'or.

### Contrastes vérifiés

| Paire | Clair | Sombre |
|---|---|---|
| `text` / `bg` | 16,5:1 | 14,0:1 |
| `text-muted` / `surface` | 6,9:1 | 7,0:1 |
| `primary` / `surface` | 4,6:1 | 6,0:1 |
| `accent-text` / `surface` | 4,7:1 | 6,9:1 |
| `on-primary` / bouton principal | 5,1:1 mini | 5,0:1 mini |
| `badge-gold-text` / `badge-gold-bg` | 7,9:1 | 7,9:1 |

Seule exception assumée : `accent` sur `bg` en clair (2,1:1), réservé au décor.

## Typographie

| Famille | Rôle | Token |
|---|---|---|
| DM Serif Display | `display`, `h1`, `h2`, citations | `font-display` |
| DM Sans | `h3` et en dessous, texte, UI | `font-body` |
| Fira Code | KPI et code, chiffres tabulaires | `font-code` |

- L'échelle est **fluide** : chaque style a une valeur `clamp()` entre 320 et 1280px (indiquée dans sa note). Le token donne la taille max, sur desktop. Les classes `xt-display`, `xt-h1`… de `bundle.css` appliquent le `clamp()`.
- Le H3 passe en DM Sans 600 : plus net pour survoler une carte.
- Surtitre `eyebrow` en capitales au-dessus des H1 et H2, couleur `primary`.
- Texte courant : 60 à 75 caractères par ligne (`measure`), interlignage 1,7.
- Rien sous 14px.

Les trois familles sont servies par Google Fonts (`bundle.css` les importe). En production, préférer l'auto-hébergement en woff2 avec `font-display: swap`.

## Espacement, formes, élévation

- Grille de 4px : `space-1` (4) à `space-7` (96). Entre sections : `space-6` sur mobile, `space-7` sur desktop.
- Contenu max `container-max` (1200px) ; breakpoints `bp-sm` 640, `bp-md` 1024, `bp-lg` 1280, conçus mobile first.
- Rayons : `radius-sm` 8px (boutons, champs, code), `radius-card` 14px (cartes, images), `radius-pill` (tags, badges).
- Ombres douces teintées de marine : `shadow-sm` au repos, `shadow-md` au survol. Seuls les éléments cliquables s'élèvent.

## Mouvement

- `duration-fast` 150ms (survol, focus), `duration-base` 250ms (élévation de carte), `duration-slow` 400ms (apparition au scroll).
- Courbes : `ease-out` pour les entrées, `ease-in-out` pour les déplacements.
- Animer `transform` et `opacity`, jamais la mise en page.
- `prefers-reduced-motion: reduce` coupe toutes les durées (déjà géré dans `bundle.css`).

## Iconographie

Icônes **Flaticon UIcons, style Regular Rounded** ; style Brands pour LinkedIn et GitHub. Le trait arrondi fait écho aux rayons doux du système.

- SVG inline, classe `xt-icon`, couleur héritée (`currentColor`).
- Tailles `icon-sm` 16, `icon-md` 20, `icon-lg` 32.
- Décorative : `aria-hidden="true"`. Seule porteuse de sens : `aria-label`.
- Un seul style d'icônes dans tout le site.
- Licence gratuite **avec attribution obligatoire** : « Icônes : UIcons par Flaticon » avec un lien dans le footer.

Les 34 icônes de base sont dans Assets › Icons, et le composant Icon montre leur usage.

## Accessibilité (WCAG 2.2 AA)

- Contraste texte 4,5:1 (3:1 à partir de 24px), composants et icônes porteuses de sens 3:1.
- Focus visible partout : contour 2px `focus-ring`, décalé de 2px.
- Cibles cliquables de 44px mini (`target-min`).
- Hiérarchie de titres sans saut (un seul H1 par page).
- Liens soulignés dans le texte : la couleur seule ne suffit pas.
- Images : `alt` descriptif ; visuels décoratifs : `alt=""`.

## Ton et contenu

- Vouvoiement, phrases courtes, verbes d'action (« J'ai conçu », « Voir le projet »).
- Chaque projet affiche un résultat chiffré et vérifiable.
- Projets clients confidentiels : secteur générique, jamais de logo ni de donnée client.
- Pas de tiret long en milieu de phrase : virgule, deux-points ou parenthèses.

Les chiffres et projets montrés dans les aperçus de composants sont des exemples à remplacer par les vrais.

## Composants

| Composant | Rôle |
|---|---|
| Button | Action principale, secondaire, tertiaire, icône seule |
| Tag | Techno (tag) et distinction (badge or) |
| ProjectCard | Projet en 10 secondes : contexte, résultat, technos |
| KpiStat | Chiffre clé du parcours |
| Timeline | Parcours antichronologique |
| Icon | Usage des icônes UIcons |

Les styles sont dans `components/bundle.css`, en classes préfixées `xt-`. Ils ne consomment que des tokens sémantiques et composant.

## Intégration (React + Vite)

1. Importer `tokens.css` (généré par cette page) puis `components/bundle.css`.
2. Poser le thème sur `<html data-theme="light|dark">`, initialisé depuis `prefers-color-scheme` puis mémorisé dans `localStorage`.
3. Envelopper les classes `xt-` dans des composants React (`<Button variant="primary">`), sans valeurs en dur.

## Gouvernance

- Versionnage sémantique : patch pour une correction de valeur, mineure pour un ajout, majeure pour un renommage ou une suppression.
- Ajouter une couleur ? Ajouter d'abord la primitive, puis le rôle sémantique ; ne jamais référencer une primitive dans un composant.
- Avant chaque mise en ligne, vérifier les contrastes dans les deux thèmes et la navigation au clavier.
