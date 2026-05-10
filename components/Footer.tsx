import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer wrap">
      <div>
        <strong>Paenia</strong>
        <p>Native macOS theme editing for Cursor and VS Code-family editors.</p>
      </div>
      <div className="footer-links">
        <Link href="/#features">Features</Link>
        <Link href="/#safety">Safety</Link>
        <Link href="/#faq">FAQ</Link>
        <Link href="/download">Download</Link>
      </div>
    </footer>
  );
}
