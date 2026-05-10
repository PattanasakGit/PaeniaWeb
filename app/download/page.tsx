import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { downloadInfo, systemRequirements } from "@/lib/download";

export const metadata = {
  title: "Download Paenia for macOS",
  description:
    "Download page for Paenia, a native macOS theme editor for Cursor and VS Code-family editors. The DMG release is coming soon."
};

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="download-hero wrap" aria-labelledby="dl-title">
          <div className="download-copy">
            <p className="status-label">macOS download</p>
            <h1 id="dl-title">Download Paenia</h1>
            <p>
              The Paenia DMG release is coming soon. This page stays the permanent download destination —
              the file link will land here when the build is ready.
            </p>
            {downloadInfo.status === "available" ? (
              <a className="button primary" href={downloadInfo.dmgUrl}>
                Download Paenia {downloadInfo.version}
              </a>
            ) : (
              <button className="button disabled" type="button" disabled>
                DMG coming soon
              </button>
            )}
            <Link className="text-link" href="/">
              ← Back to overview
            </Link>
          </div>
          <div className="download-panel">
            <h2>What you&apos;ll get</h2>
            <ul>
              <li>Native SwiftUI macOS app</li>
              <li>Theme preset and palette editor</li>
              <li>Live IDE preview</li>
              <li>Safe apply flow with backups</li>
            </ul>
          </div>
        </section>

        <section className="download-details wrap" aria-label="Requirements and release notes">
          <div>
            <h2>System requirements</h2>
            <ul>
              {systemRequirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Future release metadata</h2>
            <p>
              When the DMG is uploaded, update <code>lib/download.ts</code> with the version, file size,
              optional SHA-256 checksum, and real download URL.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
