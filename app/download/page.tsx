import type { Metadata } from "next";
import Link from "next/link";
import { DownloadCopyRow } from "@/components/DownloadCopyRow";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  brewCurlInstallOneLiner,
  brewCurlUninstallOneLiner,
  paeniaAppVersion,
  paeniaGithubReleasesUrl
} from "@/lib/download";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Download",
    description: `Install Paenia ${paeniaAppVersion} on macOS with Homebrew.`
  };
}

export default function DownloadPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="download-luxe" tabIndex={-1}>
        <div className="download-luxe__ambient" aria-hidden="true" />
        <div className="download-luxe__shell wrap">
          <article className="download-luxe__card">
            <header className="download-luxe__masthead">
              <h1 className="download-luxe__title">Paenia</h1>
              <p className="download-luxe__kicker">macOS · Homebrew</p>
            </header>

            <div className="download-luxe__blocks">
              <DownloadCopyRow variant="install" label="Install" command={brewCurlInstallOneLiner} />
              <div className="download-luxe__hairline" role="presentation" />
              <DownloadCopyRow variant="uninstall" label="Uninstall" command={brewCurlUninstallOneLiner} />
            </div>

            <footer className="download-luxe__card-foot">
              <details className="download-luxe__details">
                <summary className="download-luxe__details-sum">Disk image</summary>
                <p className="download-luxe__details-body">
                  <a href={paeniaGithubReleasesUrl} rel="noopener noreferrer">
                    GitHub Releases
                  </a>
                </p>
              </details>
              <Link className="download-luxe__back" href="/">
                ← Home
              </Link>
            </footer>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
