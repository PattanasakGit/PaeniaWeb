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

export const downloadInfo: DownloadInfo = {
  status: "coming-soon",
  version: null,
  dmgUrl: null,
  fileSize: null,
  sha256: null
};

export const systemRequirements = [
  "macOS 13 or newer",
  "Native SwiftUI app",
  "No Node.js runtime required by the app",
  "Installs to ~/Applications/Paenia.app",
  "Uses ~/Library/Application Support/Paenia/theme.json"
] as const;
