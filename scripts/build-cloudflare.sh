#!/usr/bin/env bash
set -euo pipefail

rm -rf dist
mkdir -p dist

find . -maxdepth 1 -type f \
  ! -name '*.md' \
  ! -name '.gitignore' \
  -exec cp {} dist/ \;

printf 'Cloudflare build prepared in dist/\n'
