set -e
echo "Current version:" $(grep version package.json | sed -E 's/^.*"([0-9][^"]+)".*$/\1/')
echo "Enter version e.g., 4.0.1: "
read VERSION

read -p "Releasing v$VERSION - are you sure? (y/n)" -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  echo "Releasing v$VERSION ..."

  # clear existing ts cache
  rm -rf node_modules/.rts2_cache

  # generate the version so that the changelog can be generated too
  yarn version $VERSION

  yarn run build
  yarn run build:dts

  # changelog
  yarn run changelog
  echo "Please check the git history and the changelog and press enter"
  read OKAY

  # commit and tag
  git add CHANGELOG.md package.json .yarn/versions/*
  git commit -m "release: v$VERSION"
  git tag "v$VERSION"

  # commit
  yarn npm publish

  # publish
  git push origin refs/tags/v$VERSION
  git push
fi