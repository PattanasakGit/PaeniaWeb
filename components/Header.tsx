import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Features", href: "/#features" },
  { label: "Editors", href: "/#editors" },
  { label: "Safety", href: "/#safety" },
  { label: "Download", href: "/download" }
];

export function Header() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="Paenia home">
        <Image src="/images/paenia/app-icon.png" alt="" width={32} height={32} priority />
        <span>Paenia</span>
      </Link>
      <nav className="site-nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
