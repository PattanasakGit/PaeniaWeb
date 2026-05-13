/**
 * Single source for the macOS .dmg download.
 *
 * Options (first match wins):
 * 1. `NEXT_PUBLIC_PAENIA_DMG_URL` — full URL to the .dmg (e.g. GitHub release asset).
 * 2. Build from `githubRepo` + `releaseTag` + `dmgFileName` when `githubRepo` is set
 *    (not empty and does not start with `YOUR_`).
 *
 * After `./scripts/make_dmg.sh`, upload `build/Paenia-<version>-macos.dmg` to a GitHub Release
 * and fill in the config or env var.
 */

const CONFIG = {
  /** Must match CFBundleShortVersionString in the Paenia app Info.plist */
  version: "0.0.96-beta",
  /** GitHub owner/repo where you attach the .dmg release asset */
  githubRepo: "PattanasakGit/Paenia",
  /** Git tag on the release — must match the tag on GitHub */
  releaseTag: "v0.0.96-beta",
  /** Must match output of scripts/make_dmg.sh */
  dmgFileName: "Paenia-0.0.96-beta-macos.dmg",
  /** From local build; update when you ship a new DMG */
  fileSize: "~4.1 MB",
  sha256: "f84b5b75093ae74a5e0fe099ef1ca9cf9fccd52d2086fb6bac8ea60b1ed92b08" as string | null
};

/** Marketing / UI — same as the shipped app version in CONFIG. */
export const paeniaAppVersion = CONFIG.version;

function envDmgUrl(): string | undefined {
  const u = process.env.NEXT_PUBLIC_PAENIA_DMG_URL?.trim();
  return u || undefined;
}

function githubReleaseDmgUrl(): string | null {
  const repo = CONFIG.githubRepo.trim();
  if (!repo || repo.startsWith("YOUR_")) return null;
  return `https://github.com/${repo}/releases/download/${CONFIG.releaseTag}/${CONFIG.dmgFileName}`;
}

function resolvedDmgUrl(): string | null {
  return envDmgUrl() ?? githubReleaseDmgUrl();
}

/** Git tag expected on GitHub (for copy on the download page). */
export const paeniaDownloadReleaseTag = CONFIG.releaseTag;

export type DownloadInfo =
  | {
      status: "coming-soon";
      version: null;
      dmgUrl: null;
      fileSize: null;
      sha256: null;
    }
  | {
      status: "available";
      version: string;
      dmgUrl: string;
      fileSize: string;
      sha256: string | null;
    };

export const downloadInfo: DownloadInfo = (() => {
  const url = resolvedDmgUrl();
  if (!url) {
    return {
      status: "coming-soon",
      version: null,
      dmgUrl: null,
      fileSize: null,
      sha256: null
    };
  }
  return {
    status: "available",
    version: CONFIG.version,
    dmgUrl: url,
    fileSize: CONFIG.fileSize.trim() || "—",
    sha256: CONFIG.sha256
  };
})();

export const unsignedDmgNotice =
  "This build is not Apple-notarized. After opening the disk image, drag Paenia into Applications. " +
  "On first launch, right-click the app → Open, or allow it under System Settings → Privacy & Security.";

/** Shown on /download — browser downloads add quarantine; macOS may say “damaged” even when the file is fine. */
export const gatekeeperQuarantineHint =
  "If macOS says the app is “damaged” after you downloaded with Chrome or Safari, that is usually Gatekeeper + quarantine, not a bad download. Remove quarantine after copying Paenia into Applications (see steps below).";

export const gatekeeperTerminalCommand =
  'xattr -dr com.apple.quarantine "$HOME/Applications/Paenia.app"';

export const gatekeeperAfterXattr =
  "Then open Paenia from Applications. If prompted, confirm once in System Settings → Privacy & Security, or right-click → Open.";

/** Thai summary for users who read Thai copy on the site. */
export const gatekeeperHintTh =
  "ถ้าโหลดผ่านเบราว์เซอร์แล้วขึ้นว่าแอป “เสียหาย” มักเป็นเพราะ quarantine ไม่ใช่ไฟล์พัง — ลบแอตทริบิวต์ตามคำสั่งด้านล่างหลังลากแอปไปที่ Applications";

/**
 * Third-party tap: GitHub repo must exist at github.com/{brewTapRepo} with Casks/paenia.rb
 * (copy from this repo’s homebrew-tap/Casks/paenia.rb — keep version + sha256 in sync with CONFIG).
 */
export const brewTapRepo = "PattanasakGit/homebrew-tap";

/** Production static file on Vercel — change if project name / domain changes */
export const installScriptUrlVercel = "https://paenia-web.vercel.app/install-paenia.sh";

/** Mirror: no dependency on deploy; branch must match default branch */
export const installScriptUrlGitHubRaw =
  "https://raw.githubusercontent.com/PattanasakGit/PaeniaWeb/master/public/install-paenia.sh";

/** When paenia.app DNS is configured */
export const installScriptUrlSite = "https://paenia.app/install-paenia.sh";

/** One-liner uses Vercel-hosted script */
export const installScriptUrl = installScriptUrlVercel;

/** Inspect before piping to bash */
export const installScriptSourceUrl =
  "https://github.com/PattanasakGit/PaeniaWeb/blob/master/public/install-paenia.sh";

export const brewCurlInstallOneLiner = `curl -fsSL ${installScriptUrl} | bash`;

/** Served next to install-paenia.sh on the same host */
export const uninstallScriptUrlVercel = "https://paenia-web.vercel.app/uninstall-paenia.sh";

export const brewCurlUninstallOneLiner = `curl -fsSL ${uninstallScriptUrlVercel} | bash`;

/** Advanced / disk image builds */
export const paeniaGithubReleasesUrl = `https://github.com/${CONFIG.githubRepo}/releases`;

export const brewCurlInstallNote =
  "Piping to bash trusts this script — read it first if you prefer (link below). Requires Homebrew. Script is served from the Vercel deployment.";

export const brewCurlInstallNoteTh =
  "สคริปต์โหลดจาก Vercel — ถ้าโปรเจกต์เปลี่ยนโดเมนให้อัปเดต URL ในเว็บ — ต้องมี Homebrew";

/**
 * Resolves Paenia.app wherever Homebrew put it (default /Applications, or ~/Applications, or custom --appdir).
 */
export const brewQuarantineStripCommand = String.raw`APP="$(brew list --cask paenia 2>/dev/null | grep -E 'Paenia[.]app$' | head -1)"
if [ -n "$APP" ] && [ -d "$APP" ]; then xattr -dr com.apple.quarantine "$APP"; else
  for p in "/Applications/Paenia.app" "$HOME/Applications/Paenia.app"; do
    [ -d "$p" ] && xattr -dr com.apple.quarantine "$p" && break
  done
fi`;

export const brewTapCommands = `brew tap ${brewTapRepo}
brew install --cask paenia
${brewQuarantineStripCommand}`;

export const brewInstallExplanation =
  "Homebrew still unpacks the same unsigned .dmg, and macOS can leave quarantine on Paenia.app (the misleading “damaged” dialog). Use the one-liner to tap, install, and strip quarantine automatically. Expand “manual steps” only if you prefer copy-paste without a script.";

export const brewInstallExplanationTh =
  "ติดตั้งด้วย brew แล้วต้องรันบรรทัด xattr ทุกครั้ง (หลังติดตั้งหรืออัปเกรด) เพื่อลบ quarantine — ไม่ใช่แค่โหลดจากเบราว์เซอร์เท่านั้นที่โดน";

export const brewOrphanedCaskHint =
  "If you moved Paenia.app to Trash by hand, Homebrew may still think the cask is installed while the app bundle is gone — brew list can be empty or xattr finds nothing. Fix: brew uninstall --cask paenia, then brew install --cask paenia, then run the quarantine block again.";

export const brewOrphanedCaskHintTh =
  "ถ้าเคยลบ Paenia.app เอง Homebrew อาจยังบันทึกว่าติดตั้งแล้ว แต่ไม่มีแอปในเครื่อง — รัน brew uninstall --cask paenia แล้วติดตั้งใหม่ จากนั้นค่อยรันบล็อก xattr";

export const brewTapSetupHint =
  "If install fails with “Unknown tap”, create the GitHub repo, add Casks/paenia.rb from the PaeniaWeb repository (folder homebrew-tap/), update version and sha256 when you ship a new DMG, then try again.";

/** Copy for the download page — keep minimal. */
export const downloadMachineChecklist = [
  "macOS 13 (Ventura) or later · Apple Silicon or Intel",
  "Use with a supported editor (e.g. Cursor or VS Code) — Paenia only changes that editor’s settings files"
] as const;

export const systemRequirements = downloadMachineChecklist;
