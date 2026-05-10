import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  brewCurlInstallNote,
  brewCurlInstallNoteTh,
  brewCurlInstallOneLiner,
  brewInstallExplanation,
  brewInstallExplanationTh,
  brewOrphanedCaskHint,
  brewOrphanedCaskHintTh,
  brewTapCommands,
  brewTapSetupHint,
  downloadInfo,
  downloadMachineChecklist,
  gatekeeperAfterXattr,
  gatekeeperHintTh,
  gatekeeperQuarantineHint,
  gatekeeperTerminalCommand,
  installScriptSourceUrl,
  installScriptUrlGitHubRaw,
  installScriptUrlSite,
  installScriptUrlVercel,
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
              <section className="download-panel download-panel--brew" aria-labelledby="brew-title">
                <h2 id="brew-title" className="download-panel__title">
                  Recommended: Homebrew (smoothest without notarization)
                </h2>
                <p className="download-panel__lede">{brewInstallExplanation}</p>
                <p className="download-panel__lede download-panel__lede--th" lang="th">
                  {brewInstallExplanationTh}
                </p>
                <p className="download-panel__brew-note">
                  Requires{" "}
                  <a href="https://brew.sh" rel="noopener noreferrer">
                    Homebrew
                  </a>
                  . Unsigned builds still need the quarantine strip — the one-liner script does tap, install, and
                  xattr for you.
                </p>
                <p className="download-panel__lede download-panel__lede--compact">{brewCurlInstallNote}</p>
                <p className="download-panel__lede download-panel__lede--th" lang="th">
                  {brewCurlInstallNoteTh}
                </p>
                <pre className="download-terminal download-terminal--brew download-terminal--hero" tabIndex={0}>
                  <code>{brewCurlInstallOneLiner}</code>
                </pre>
                <p className="download-panel__script-links">
                  <a href={installScriptUrlVercel} rel="noopener noreferrer">
                    Script (Vercel)
                  </a>
                  <span aria-hidden="true"> · </span>
                  <a href={installScriptUrlGitHubRaw} rel="noopener noreferrer">
                    Mirror (GitHub raw)
                  </a>
                  <span aria-hidden="true"> · </span>
                  <a href={installScriptUrlSite} rel="noopener noreferrer">
                    paenia.app
                  </a>
                  <span aria-hidden="true"> · </span>
                  <a href={installScriptSourceUrl} rel="noopener noreferrer">
                    View on GitHub
                  </a>
                </p>
                <details className="download-disclosure download-disclosure--inner">
                  <summary>Copy-paste: manual steps (same as the script)</summary>
                  <pre className="download-terminal download-terminal--brew">
                    <code>{brewTapCommands}</code>
                  </pre>
                </details>
                <p className="download-panel__footnote">{brewTapSetupHint}</p>
                <p className="download-panel__footnote">{brewOrphanedCaskHint}</p>
                <p className="download-panel__footnote download-panel__lede--th" lang="th">
                  {brewOrphanedCaskHintTh}
                </p>
              </section>
            ) : null}

            {downloadInfo.status === "available" ? (
              <section className="download-panel download-panel--accent" aria-labelledby="gatekeeper-title">
                <h2 id="gatekeeper-title" className="download-panel__title">
                  Browser .dmg download (Chrome / Safari)
                </h2>
                <p className="download-panel__lede">{gatekeeperQuarantineHint}</p>
                <p className="download-panel__lede download-panel__lede--th" lang="th">
                  {gatekeeperHintTh}
                </p>
                <ol className="download-panel__steps">
                  <li>Open the .dmg and drag <strong>Paenia</strong> into your <strong>Applications</strong> folder.</li>
                  <li>
                    Open <strong>Terminal</strong> and run:
                    <pre className="download-terminal">
                      <code>{gatekeeperTerminalCommand}</code>
                    </pre>
                  </li>
                  <li>{gatekeeperAfterXattr}</li>
                </ol>
                <p className="download-panel__footnote">
                  For fewer Gatekeeper surprises, prefer <strong>Homebrew</strong> above. The steps here are the
                  standard fix when the .dmg was downloaded in a browser.
                </p>
              </section>
            ) : null}

            {downloadInfo.status === "available" ? (
              <details className="download-disclosure">
                <summary>Checksum and notarization note</summary>
                <div className="download-disclosure__body">
                  {downloadInfo.sha256 ? (
                    <div className="download-disclosure__block">
                      <span className="download-disclosure__label">SHA-256 (v{displayVersion})</span>
                      <code className="download-disclosure__hash">{downloadInfo.sha256}</code>
                    </div>
                  ) : null}
                  <p className="download-disclosure__note">
                    This build is not Apple-notarized. Verify the file against the SHA-256 above if you suspect a
                    bad download; otherwise follow &quot;First open after a browser download&quot; for Gatekeeper.
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
