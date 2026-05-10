import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  downloadInfo,
  githubReleasesPageUrl,
  paeniaDownloadReleaseTag,
  systemRequirements,
  unsignedDmgNotice
} from "@/lib/download";

export const metadata = {
  title: "Download Paenia for macOS",
  description:
    "Download Paenia as a macOS disk image (.dmg). Native theme editor for Cursor and VS Code-family editors."
};

const highlights = [
  "Native SwiftUI macOS app",
  "Theme preset and palette editor",
  "Live IDE preview",
  "Safe apply flow with backups"
] as const;

export default function DownloadPage() {
  const releasesUrl = githubReleasesPageUrl();

  return (
    <>
      <Header />
      <main id="main-content" className="download-main" tabIndex={-1}>
        <div className="download-body wrap">
          <header className="download-header">
            <p className="download-eyebrow">macOS · Disk image</p>
            <h1>Download Paenia</h1>
            <p className="download-lede">
              {downloadInfo.status === "available"
                ? `Paenia ${downloadInfo.version} — open the disk image, drag the app to Applications, then launch. If the download returns 404, publish a GitHub Release with tag ${paeniaDownloadReleaseTag} and attach the matching .dmg.`
                : "The download link is enabled once you publish the .dmg on GitHub Releases (or set NEXT_PUBLIC_PAENIA_DMG_URL). See lib/download.ts."}
            </p>
            <div className="download-actions">
              {downloadInfo.status === "available" ? (
                <a
                  className="button primary"
                  href={downloadInfo.dmgUrl}
                  rel="noopener noreferrer"
                >
                  Download .dmg ({downloadInfo.version})
                </a>
              ) : (
                <button className="button button-waiting" type="button" disabled>
                  DMG link not configured
                </button>
              )}
              {releasesUrl ? (
                <a className="download-back" href={releasesUrl} rel="noopener noreferrer">
                  All releases
                </a>
              ) : null}
              <Link className="download-back" href="/">
                Back to overview
              </Link>
            </div>
            {downloadInfo.status === "available" && downloadInfo.sha256 ? (
              <p className="download-sha" aria-label="SHA-256 checksum">
                <span className="download-sha__label">SHA-256</span>
                <code className="download-sha__value">{downloadInfo.sha256}</code>
              </p>
            ) : null}
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

          <section className="download-block" aria-labelledby="dl-first-run">
            <h2 id="dl-first-run" className="download-h2">
              First launch (unsigned build)
            </h2>
            <p className="download-note">{unsignedDmgNotice}</p>
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
              For maintainers
            </h2>
            <p className="download-note">
              Run <code>./scripts/make_dmg.sh</code> in the Paenia repo, attach the .dmg to a GitHub Release,
              then set <code>githubRepo</code> / <code>releaseTag</code> in <code>lib/download.ts</code> or
              define <code>NEXT_PUBLIC_PAENIA_DMG_URL</code> (see <code>.env.example</code>).
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
