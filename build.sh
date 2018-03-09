#!/usr/bin/env bash

commit=$1
if [ -z ${commit} ]; then
    commit=$(git tag | tail -n 1)
    if [ -z ${commit} ]; then
        commit="master";
    fi
fi

# Remove old release
rm -rf DnVariantSwitch DnVariantSwitch-*.zip

# Build new release
mkdir -p DnVariantSwitch
git archive ${commit} | tar -x -C DnVariantSwitch
composer install --no-dev -n -o -d DnVariantSwitch
zip -r DnVariantSwitch-${commit}.zip DnVariantSwitch