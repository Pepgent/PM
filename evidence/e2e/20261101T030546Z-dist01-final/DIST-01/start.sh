#!/bin/sh
set -eu
test -z "$(ls -A "$HOME")"
echo clean_home=true
mkdir -p /tmp/release /tmp/operator-data/omp /tmp/operator-state/omp /tmp/operator-cache/omp
export XDG_DATA_HOME=/tmp/operator-data XDG_STATE_HOME=/tmp/operator-state XDG_CACHE_HOME=/tmp/operator-cache
tar -xf /ci-release.tar -C /tmp/release
bun /tmp/release/install.ts --home "$HOME"
test -L "$HOME/.omp/plugins/node_modules/omp-soroi"
test ! -e /tmp/operator-data/omp/plugins
echo xdg_plugin_isolated=true
cp /client/models.yml "$HOME/.omp/agent/models.yml"
cp /client/config.yml "$HOME/.omp/agent/config.yml"
"$HOME/.local/bin/soroi" --model opencode-go/deepseek-v4.1-flash --no-context-files --no-lsp --config /probe/probe.yml --max-time 180
cp -R "$HOME/.omp/agent/sessions" /probe/out/sessions
test -z "$(find /tmp/operator-data/omp /tmp/operator-state/omp /tmp/operator-cache/omp -mindepth 1 -print -quit)"
echo xdg_runtime_isolated=true
