#!/bin/bash
set -e

if [ -z "$1" ]; then
  echo "Usage: npm run ship \"your commit message\""
  exit 1
fi

echo "Building..."
npm run build

echo "Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "Committing and pushing to GitHub..."
git add -A
git commit -m "$1"
git push

echo "Done! App is live at https://spearheadscoretracker.web.app"
