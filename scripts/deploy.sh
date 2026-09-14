#!/usr/bin/env bash
# Publie le site sur GitHub Pages (branche gh-pages).
# Usage : npm run deploy
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
WORKTREE="${TMPDIR:-/tmp}/portfolio-ghpages"
NAME="Xavier Tinel"
EMAIL="tejada.xavier@gmail.com"

cd "$ROOT"

echo "→ Build"
npm run build

# GitHub Pages ne connaît pas les routes du SPA (/projets, /a-propos…).
# Servir index.html en 404 fait retomber toute URL sur l'application.
cp dist/index.html dist/404.html
# Empêche Jekyll d'ignorer les fichiers commençant par un underscore.
touch dist/.nojekyll

echo "→ Préparation de la branche gh-pages"
git worktree remove --force "$WORKTREE" 2>/dev/null || true
git worktree prune
git worktree add -q --detach "$WORKTREE"

cd "$WORKTREE"
git checkout -q gh-pages 2>/dev/null || git checkout -q -b gh-pages origin/gh-pages
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} +
cp -r "$ROOT/dist/." .

echo "→ Publication"
git add -A
if git diff --cached --quiet; then
  echo "Aucun changement à publier."
else
  git -c user.name="$NAME" -c user.email="$EMAIL" \
    commit -q -m "Build: ${1:-mise à jour du site}"
  git push -q origin gh-pages
  echo "✓ Publié sur https://xaviertinel.github.io/Portfolio/"
fi

cd "$ROOT"
git worktree remove --force "$WORKTREE" 2>/dev/null || true
git branch -D gh-pages 2>/dev/null || true
git worktree prune
