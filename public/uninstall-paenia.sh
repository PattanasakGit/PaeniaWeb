#!/usr/bin/env bash
# Remove Paenia Homebrew cask (and app bundle if Homebrew manages it).
#   curl -fsSL https://paenia-web.vercel.app/uninstall-paenia.sh | bash

set -euo pipefail

if ! command -v brew >/dev/null 2>&1; then
  echo "Paenia: Homebrew not found. Remove Paenia.app from Applications manually." >&2
  exit 1
fi

echo "Paenia: brew uninstall --cask paenia"
brew uninstall --cask paenia || true

echo "Paenia: done."
