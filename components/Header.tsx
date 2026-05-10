"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const primaryNav = [
  { label: "Features", href: "/#features" },
  { label: "Editors", href: "/#editors" },
  { label: "Safety", href: "/#safety" }
];

export function Header() {
  const pathname = usePathname();
  const isDownload = pathname === "/download";
  const headerRef = useRef<HTMLElement>(null);
  const navMobileRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const details = navMobileRef.current;
    if (!details) return;
    const links = details.querySelectorAll("a");
    const onLink = () => details.removeAttribute("open");
    links.forEach((a) => a.addEventListener("click", onLink));
    const onDoc = (e: MouseEvent) => {
      if (!details.open) return;
      const t = e.target;
      if (t instanceof Node && !details.contains(t)) details.removeAttribute("open");
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") details.removeAttribute("open");
    };
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      links.forEach((a) => a.removeEventListener("click", onLink));
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header ref={headerRef} className="site-header" id="site-header">
      <div className="header-inner wrap">
        <Link href="/" className="brand-link" aria-label="Paenia home">
          <Image src="/images/paenia/app-icon.png" alt="" width={36} height={36} priority />
          <span>Paenia</span>
        </Link>
        <div className="header-desktop">
          <nav className="site-nav" aria-label="Primary navigation">
            <ul className="site-nav-list">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              {isDownload ? (
                <li>
                  <Link href="/download" aria-current="page">
                    Download
                  </Link>
                </li>
              ) : null}
            </ul>
          </nav>
          {isDownload ? (
            <Link className="header-cta header-cta--ghost" href="/">
              Overview
            </Link>
          ) : (
            <Link className="header-cta" href="/download">
              Download
            </Link>
          )}
        </div>
        <details ref={navMobileRef} className="nav-mobile" id="nav-mobile">
          <summary className="nav-mobile-toggle">
            <span className="burger" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            Menu
          </summary>
          <div className="nav-mobile-panel">
            <nav aria-label="Mobile navigation">
              {primaryNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
              {isDownload ? (
                <Link href="/download" aria-current="page">
                  Download
                </Link>
              ) : null}
            </nav>
            {isDownload ? (
              <Link className="header-cta header-cta--ghost nav-mobile-cta" href="/">
                Back to overview
              </Link>
            ) : (
              <Link className="header-cta nav-mobile-cta" href="/download">
                Download for macOS
              </Link>
            )}
          </div>
        </details>
      </div>
    </header>
  );
}
