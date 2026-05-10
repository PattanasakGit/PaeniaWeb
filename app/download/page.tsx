import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  downloadInfo,
  downloadMachineChecklist,
  paeniaAppVersion
} from "@/lib/download";

const displayVersion =
  downloadInfo.status === "available" ? downloadInfo.version : paeniaAppVersion;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Download Paenia ${displayVersion} for macOS (beta)`,
    description: `Download Paenia ${displayVersion} beta for macOS (.dmg). Native theme editor for Cursor and VS Code-family editors.`
  };
}

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="download-main" tabIndex={-1}>
        <div className="download-body wrap">
          <article className="download-card">
            <header className="download-card__header">
              <p className="download-kicker">macOS 13 or later</p>
              <div className="download-card__title-row">
                <h1 className="download-card__title">Download Paenia</h1>
                <span className="download-beta" title="Early release — feedback welcome">
                  Beta
                </span>
              </div>
              <p className="download-card__version" aria-label={`Software version ${displayVersion}`}>
                v{displayVersion}
                <span className="download-card__version-sep" aria-hidden>
                  {" "}
                  ·{" "}
                </span>
                <span className="download-card__version-muted">macOS disk image</span>
              </p>
              <p className="download-card__lede">
                {downloadInfo.status === "available"
                  ? "Open the disk image, then drag Paenia into Applications."
                  : "The installer link is not configured yet."}
              </p>
            </header>

            <div className="download-card__cta">
              {downloadInfo.status === "available" ? (
                <a
                  className="button primary download-card__button"
                  href={downloadInfo.dmgUrl}
                  rel="noopener noreferrer"
                >
                  Download v{displayVersion} (.dmg)
                </a>
              ) : (
                <button className="button button-waiting download-card__button-wait" type="button" disabled>
                  Coming soon
                </button>
              )}
              <Link className="download-card__home" href="/">
                Back to home
              </Link>
            </div>

            <section className="download-panel" aria-labelledby="download-reqs-title">
              <h2 id="download-reqs-title" className="download-panel__title">
                Before you download
              </h2>
              <ul className="download-panel__list">
                {downloadMachineChecklist.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            {downloadInfo.status === "available" ? (
              <details className="download-disclosure">
                <summary>Checksum and first launch</summary>
                <div className="download-disclosure__body">
                  {downloadInfo.sha256 ? (
                    <div className="download-disclosure__block">
                      <span className="download-disclosure__label">SHA-256 (v{displayVersion})</span>
                      <code className="download-disclosure__hash">{downloadInfo.sha256}</code>
                    </div>
                  ) : null}
                  <p className="download-disclosure__note">
                    This build is not Apple-notarized. The first time you open it, right-click Paenia in
                    Applications and choose Open, or allow it under System Settings → Privacy & Security.
                  </p>
                </div>
              </details>
            ) : null}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
