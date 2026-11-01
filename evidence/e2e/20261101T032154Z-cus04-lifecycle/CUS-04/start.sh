#!/bin/sh
set -eu
test -z "$(ls -A "$HOME")"
echo clean_home=true
mkdir -p /tmp/release
tar -xf /ci-release.tar -C /tmp/release
bun /tmp/release/install.ts --home "$HOME"
cp /client/models.yml "$HOME/.omp/agent/models.yml"
cp /client/config.yml "$HOME/.omp/agent/config.yml"
"$HOME/.local/bin/soroi" --model opencode-go/deepseek-v4.1-flash --no-context-files --no-lsp --config /probe/probe.yml --max-time 300
cp -R "$HOME/.omp/agent/sessions" /probe/out/sessions
