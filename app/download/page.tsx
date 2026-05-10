import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { downloadInfo, systemRequirements } from "@/lib/download";

export const metadata = {
  title: "Download Paenia for macOS",
  description:
    "Download page for Paenia, a native macOS theme editor for Cursor and VS Code-family editors. The DMG release is coming soon."
};

const highlights = [
  "Native SwiftUI macOS app",
  "Theme preset and palette editor",
  "Live IDE preview",
  "Safe apply flow with backups"
] as const;

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="download-main" tabIndex={-1}>
        <div className="download-body wrap">
          <header className="download-header">
            <p className="download-eyebrow">macOS</p>
            <h1>Download Paenia</h1>
            <p className="download-lede">
              The DMG release is coming soon. This page stays the download destination — the file link will
              appear here when the build is ready.
            </p>
            <div className="download-actions">
              {downloadInfo.status === "available" ? (
                <a className="button primary" href={downloadInfo.dmgUrl}>
                  Download Paenia {downloadInfo.version}
                </a>
              ) : (
                <button className="button button-waiting" type="button" disabled>
                  DMG coming soon
                </button>
              )}
              <Link className="download-back" href="/">
                Back to overview
              </Link>
            </div>
          </header>

          <hr className="download-rule" />

          <section className="download-block" aria-labelledby="dl-includes">
            <h2 id="dl-includes" className="download-h2">
              Included
            </h2>
            <ul className="download-list">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <hr className="download-rule" />

          <section className="download-block" aria-labelledby="dl-req">
            <h2 id="dl-req" className="download-h2">
              Requirements
            </h2>
            <ul className="download-list">
              {systemRequirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </section>

          <hr className="download-rule" />

          <section className="download-block" aria-labelledby="dl-meta">
            <h2 id="dl-meta" className="download-h2">
              Release metadata
            </h2>
            <p className="download-note">
              When the DMG is uploaded, update <code>lib/download.ts</code> with the version, file size,
              optional SHA-256 checksum, and download URL.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
