#!/usr/bin/env sh

# Setup:
#   chmod +x deploy.sh

# abort on errors
set -e

# Increase version
# Which will commit the change version number; which is then available at build time
# Docs https://docs.npmjs.com/cli/v8/commands/npm-version
npm version patch

# build
npm run build

# navigate into the build output directory
cd dist

# place .nojekyll to bypass Jekyll processing
echo > .nojekyll

# copy our app (index.html) as 404.html so our routing works with "open in new tab" (by serving and using the 404 page)
cp index.html 404.html

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git checkout -B main
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git main

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# https://osmberlin.github.io/osm-tag-updater/
git push -f git@github.com:osmberlin/osm-tag-updater.git main:gh-pages

open https://osmberlin.github.io/osm-tag-updater/
open https://github.com/osmberlin/osm-tag-updater/actions

cd -
