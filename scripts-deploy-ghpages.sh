#!/bin/sh
# Publie le site sur GitHub Pages (branche gh-pages), sous /Portfolio/.
# Usage : sh scripts-deploy-ghpages.sh "message"
set -e
ROOT=$(cd "$(dirname "$0")" && pwd)
W=$(mktemp -d)
cd "$ROOT"
npx vite build --base=/Portfolio/
cp dist/index.html dist/404.html
rm -f dist/_redirects
touch dist/.nojekyll
git worktree prune
git fetch -q origin gh-pages
git worktree add -q "$W/ghp" origin/gh-pages
cd "$W/ghp"
git checkout -q -B gh-pages
git rm -rq .
cp -R "$ROOT/dist/." .
git add -A
git commit -qm "Build: ${1:-mise à jour}"
git push -q origin gh-pages
cd "$ROOT"
git worktree remove --force "$W/ghp"
npm run build >/dev/null 2>&1
echo "Publié sur gh-pages"
