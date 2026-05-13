# frozen_string_literal: true

# Homebrew third-party tap — keep in sync with PaeniaWeb lib/download.ts (version, sha256, url).
# Repo layout: put this file at Casks/paenia.rb in github.com/PattanasakGit/homebrew-tap
# Users: brew tap PattanasakGit/homebrew-tap && brew install --cask paenia

cask "paenia" do
  version "0.0.96-beta"

  sha256 "f84b5b75093ae74a5e0fe099ef1ca9cf9fccd52d2086fb6bac8ea60b1ed92b08"

  url "https://github.com/PattanasakGit/Paenia/releases/download/v0.0.96-beta/Paenia-0.0.96-beta-macos.dmg",
      verified: "github.com/PattanasakGit/Paenia/"

  name "Paenia"
  desc "Native macOS theme editor for Cursor, VS Code, and VS Code-family editors"
  homepage "https://paenia.app/"

  depends_on macos: ">= :ventura"

  app "Paenia.app"

  caveats <<~EOS
    The unsigned .dmg can leave quarantine on the app (macOS may say it is “damaged”). After install or upgrade, strip quarantine using the path Homebrew reports:
      APP="$(brew list --cask paenia | grep -E 'Paenia[.]app$' | head -1)"; [ -n "$APP" ] && xattr -dr com.apple.quarantine "$APP"
    If APP is empty, you may have deleted Paenia.app manually while Homebrew still thinks it is installed — run: brew uninstall --cask paenia && brew install --cask paenia
  EOS
end
