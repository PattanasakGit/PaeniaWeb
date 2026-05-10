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
  version: "0.0.95",
  /** GitHub owner/repo where you attach the .dmg release asset */
  githubRepo: "PattanasakGit/Paenia",
  /** Git tag on the release — must match the tag on GitHub */
  releaseTag: "v0.0.95",
  /** Must match output of scripts/make_dmg.sh */
  dmgFileName: "Paenia-0.0.95-macos.dmg",
  /** From local build; update when you ship a new DMG */
  fileSize: "~4.2 MB",
  sha256: "a4439c6fd24cf81dd97cd26c52a3e6b20347cfc60f80260d58ed48f24d083ed3" as string | null
};

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

/** Optional: link to GitHub releases list (set repo first) */
export function githubReleasesPageUrl(): string | null {
  const repo = CONFIG.githubRepo.trim();
  if (!repo || repo.startsWith("YOUR_")) return null;
  return `https://github.com/${repo}/releases`;
}

export const unsignedDmgNotice =
  "This build is not Apple-notarized. After opening the disk image, drag Paenia into Applications. " +
  "On first launch, right-click the app → Open, or allow it under System Settings → Privacy & Security.";

export const systemRequirements = [
  "macOS 13 or newer",
  "Native SwiftUI app",
  "No Node.js runtime required by the app",
  "Installs to ~/Applications/Paenia.app",
  "Uses ~/Library/Application Support/Paenia/theme.json"
] as const;
