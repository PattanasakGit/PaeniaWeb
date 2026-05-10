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
  version: "0.0.95-beta",
  /** GitHub owner/repo where you attach the .dmg release asset */
  githubRepo: "PattanasakGit/Paenia",
  /** Git tag on the release — must match the tag on GitHub */
  releaseTag: "v0.0.95-beta",
  /** Must match output of scripts/make_dmg.sh */
  dmgFileName: "Paenia-0.0.95-beta-macos.dmg",
  /** From local build; update when you ship a new DMG */
  fileSize: "~4.1 MB",
  sha256: "dae4cd57e8693e4b8dd1e982fdbcc00ccb706e83fa90748c233260b395dfd956" as string | null
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

/** Copy for the download page — keep minimal. */
export const downloadMachineChecklist = [
  "macOS 13 (Ventura) or later · Apple Silicon or Intel",
  "Use with a supported editor (e.g. Cursor or VS Code) — Paenia only changes that editor’s settings files"
] as const;

export const systemRequirements = downloadMachineChecklist;
