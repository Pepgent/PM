#!/bin/sh
set -eu
if [ -n "$(ls -A "$HOME")" ]; then echo HOME_NOT_EMPTY; exit 1; fi
echo clean_home=true
mkdir /tmp/release
tar -xf /ci-release.tar -C /tmp/release
bun /tmp/release/install.ts --home "$HOME"
cp /client/models.yml "$HOME/.omp/agent/models.yml"
cp /client/config.yml "$HOME/.omp/agent/config.yml"
exec "$HOME/.local/bin/soroi" --model opencode-go/deepseek-v4.1-flash --no-context-files --no-lsp --config /probe/probe.yml --max-time 300
