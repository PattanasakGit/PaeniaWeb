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
      <main id="main-content" className="download-page-minimal" tabIndex={-1}>
        <div className="download-page-minimal__wrap">
          <h1 className="download-page-minimal__title">Paenia</h1>
          <p className="download-page-minimal__sub">macOS · Homebrew</p>

          <DownloadCopyRow label="Install" command={brewCurlInstallOneLiner} />
          <DownloadCopyRow label="Uninstall" command={brewCurlUninstallOneLiner} />

          <details className="download-page-minimal__more">
            <summary>Disk image</summary>
            <p className="download-page-minimal__more-p">
              <a href={paeniaGithubReleasesUrl} rel="noopener noreferrer">
                GitHub Releases
              </a>
            </p>
          </details>

          <Link className="download-page-minimal__home" href="/">
            ← Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
