#!/bin/sh
set -eu
test -z "$(ls -A "$HOME")"
echo clean_home=true
mkdir -p /tmp/release /tmp/operator-data/omp /tmp/operator-state/omp /tmp/operator-cache/omp
export XDG_DATA_HOME=/tmp/operator-data XDG_STATE_HOME=/tmp/operator-state XDG_CACHE_HOME=/tmp/operator-cache
tar -xf /ci-release.tar -C /tmp/release
bun /tmp/release/install.ts --home "$HOME"
echo outside_home_files_start
find /tmp/operator-data /tmp/operator-state /tmp/operator-cache -mindepth 2 -print
echo outside_home_files_end
echo home_plugin_link
ls -ld "$HOME/.omp/plugins/node_modules/omp-soroi" || true
