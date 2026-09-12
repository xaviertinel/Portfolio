# Portfolio — Xavier Tinel

Site portfolio personnel. Construit avec **Vite + React + TypeScript**.

## Développement

```bash
npm install
npm run dev
```

Le site est servi sur http://localhost:5173

## Build de production

```bash
npm run build      # génère dist/
npm run preview    # prévisualise le build
```

## Ajouter un projet

Tout se passe dans **`src/data/projects.ts`**. Duplique un bloc dans le tableau
`projects`, change les valeurs, sauvegarde — la grille se met à jour toute seule.

Champs disponibles : `slug`, `title`, `tagline`, `description`, `tags`, `year`,
et en option `liveUrl`, `repoUrl`, `image`, `featured`.

Pour une image, place-la dans `public/projects/` et renseigne
`image: "/projects/mon-image.png"`.

## Infos personnelles

Nom, rôle, email et liens sociaux sont dans **`src/data/site.ts`**.
