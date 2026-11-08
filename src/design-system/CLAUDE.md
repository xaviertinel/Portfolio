# Morpho irisé : consignes pour Claude Code

Design system du portfolio de Xavier Tinel (React 19 + TypeScript + Vite). Lire `README.md` avant toute UI.

## Fichiers

- `tokens.json` : source des tokens (primitives, sémantiques, composants ; thèmes light/dark).
- `tokens.css` : variables CSS générées depuis tokens.json. Thème via `<html data-theme="light|dark">`.
- `components/bundle.css` : classes `xt-*` (boutons, tags, cartes, KPI, timeline, typo fluide).
- `components/<Comp>/README.md` + `preview.html` : règles et markup de référence de chaque composant.
- `src/icons.ts` + `src/Icon.tsx` : icônes Flaticon UIcons en SVG inline. `assets/icons/` : mêmes icônes en fichiers.

## Intégration

1. Copier le dossier dans `src/design-system/`, importer `tokens.css` puis `components/bundle.css` dans `main.tsx`.
2. Créer les composants React (`Button`, `Tag`, `Badge`, `ProjectCard`, `KpiStat`, `Timeline`) en reprenant le markup des `preview.html`.
3. Thème : initialiser depuis `prefers-color-scheme`, mémoriser dans `localStorage`, bouton icône `sun`/`moon`.

## Règles

- Ne jamais écrire de couleur, taille ou espacement en dur : uniquement `var(--token)`.
- Composants : tokens sémantiques ou composant seulement, jamais de primitive (`blue-600`…).
- Bleu `primary` pour l'interaction ; dégradé `decor-from` → `decor-to` décoratif seulement (pas de texte dessus) ; or rare (`accent`, `accent-text`, badge).
- WCAG 2.2 AA : focus visible, cibles de 44px, `aria-label` sur les boutons icône, `prefers-reduced-motion` respecté.
- Un seul style d'icônes (UIcons Regular Rounded). Mention « Icônes : UIcons par Flaticon » + lien dans le footer.
- Pas de tiret long (—) en milieu de phrase dans les textes.
- Les chiffres des aperçus sont des exemples à remplacer.
