# #!/bin/bash
set -e

BUMP_LIST=("major" "minor" "patch")

echo "Current version:" $(grep version package.json | sed -E 's/^.*"([0-9][^"]+)".*$/\1/')
echo
for i in "${!BUMP_LIST[@]}"; do
    echo " $(($i + 1)). ${BUMP_LIST[$i]}"
done
read -p "Select version  👉" -n 1 -r
BUMP=${BUMP_LIST[$REPLY - 1]}

# Bump version
yarn version $BUMP
yarn build

VERSION=$(grep version package.json | sed -E 's/^.*"([0-9][^"]+)".*$/\1/')


# ChangeLog
yarn changelog
echo "Please check the git history and the changelog and press enter"
read OKAY

# Commit and tag
git add CHANGELOG.md package.json .yarn/versions/*
git commit -m "release: v$VERSION"
git tag "v$VERSION"


# publish
yarn npm publish
git push origin refs/tags/v$VERSION
git push