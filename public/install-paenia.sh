#!/usr/bin/env bash
# Paenia — Homebrew cask install + strip Gatekeeper quarantine (unsigned builds).
# Docs: https://paenia-web.vercel.app/download/
# One-liner (Vercel):
#   curl -fsSL https://paenia-web.vercel.app/install-paenia.sh | bash
# Mirrors: GitHub raw + https://paenia.app/install-paenia.sh (when DNS is ready)

set -euo pipefail

TAP_REPO="${PAENIA_BREW_TAP:-PattanasakGit/homebrew-tap}"

if ! command -v brew >/dev/null 2>&1; then
  echo "Paenia: Homebrew not found. Install from https://brew.sh" >&2
  exit 1
fi

echo "Paenia: brew tap ${TAP_REPO}"
brew tap "${TAP_REPO}"

echo "Paenia: brew install --cask paenia"
brew install --cask paenia

strip_quarantine() {
  local app=""
  app="$(brew list --cask paenia 2>/dev/null | grep -E 'Paenia[.]app$' | head -1 || true)"
  if [[ -n "${app}" && -d "${app}" ]]; then
    echo "Paenia: xattr (quarantine) -> ${app}"
    xattr -dr com.apple.quarantine "${app}"
    return 0
  fi
  for p in "/Applications/Paenia.app" "${HOME}/Applications/Paenia.app"; do
    if [[ -d "${p}" ]]; then
      echo "Paenia: xattr (quarantine) -> ${p}"
      xattr -dr com.apple.quarantine "${p}"
      return 0
    fi
  done
  return 1
}

if ! strip_quarantine; then
  echo "Paenia: could not find Paenia.app after install. If you deleted the app earlier, run:" >&2
  echo "  brew uninstall --cask paenia && brew install --cask paenia" >&2
  exit 1
fi

echo "Paenia: finished. Launch: open -a Paenia"
