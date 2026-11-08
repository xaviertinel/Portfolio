# ProjectCard

Présente un projet en 10 secondes : contexte, résultat chiffré et technos, pour un recruteur qui survole.

## Anatomie (de haut en bas)

1. `xt-card__media` : capture du projet en 16:9, ou dégradé décoratif + icône `icon-lg` si confidentiel.
2. `xt-card__meta` : surtitre `xt-eyebrow` (secteur · type) + badge or éventuel.
3. Titre `xt-h3` : le problème résolu, pas le nom de code interne.
4. Résumé `xt-small` : 1 à 2 lignes.
5. `xt-card__tags` : 3 à 5 tags de techno.
6. `xt-card__impact` : un KPI en `font-code`, couleur `accent-text`.

## Règles

- Toujours un impact chiffré : c'est ce que retient un recruteur.
- Projet client confidentiel : secteur générique (« Gestionnaire de réseau ») et visuel décoratif, jamais de logo client.
- Toute la carte est le lien (`<a class="xt-card">`) : un seul arrêt de tabulation.
- Survol : `shadow-md`, bordure `primary-strong`, translation de 2px (coupée si `prefers-reduced-motion`).
- Grille : 1 colonne mobile, 2 dès `bp-md`, 3 dès `bp-lg`, gouttière `space-4`.

## Ce que fournit le consommateur

Image ou icône, textes, tags, valeur et libellé du KPI, URL.
