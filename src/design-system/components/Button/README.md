# Button

Déclenche une action ou mène vers une page clé : un seul bouton principal par écran.

## Variantes

| Classe | Rôle | Tokens |
|---|---|---|
| `xt-btn--primary` | L'action n°1 de la vue (voir les projets, me contacter) | `button-primary-from` → `button-primary-to`, texte `on-primary` |
| `xt-btn--secondary` | Action utile mais secondaire (télécharger le CV) | bordure et texte `primary` |
| `xt-btn--ghost` | Action tertiaire, lien d'appoint | texte `primary`, fond `surface` au survol |
| `xt-btn--icon` | Bouton icône seule (réseaux sociaux, thème) | carré de `target-min` |

## Règles

- Un seul `primary` visible à la fois. Deux actions égales : `secondary` pour les deux.
- Libellé = verbe à l'infinitif + objet, 3 mots max (« Voir les projets »).
- Icône à droite pour avancer (`arrow-right`), à gauche pour une action (`download`).
- Hauteur mini `target-min` (44px), au-delà du minimum WCAG 2.2 de 24px.
- Bouton icône seule : `aria-label` obligatoire.
- `<a>` pour naviguer, `<button>` pour agir.

## Ce que fournit le consommateur

Le libellé, l'icône SVG (classe `xt-icon`), `href` ou gestionnaire de clic.
