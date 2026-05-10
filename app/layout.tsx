import type { Metadata } from "next";
import { SiteEffects } from "@/components/SiteEffects";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://paenia.app"),
  title: {
    default: "Paenia - macOS Theme Editor for Cursor and VS Code",
    template: "%s | Paenia"
  },
  description:
    "Paenia is a native macOS app for editing Cursor, VS Code, Antigravity, Trae and VS Code-family theme colors with live preview, presets, backups, and safe apply.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Paenia - Design your editor color system",
    description:
      "A native macOS theme editor for Cursor, VS Code-family editors, live preview, presets, and safe settings.json writes.",
    url: "https://paenia.app",
    siteName: "Paenia",
    images: ["/images/paenia/screenshot-dark.png"],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Paenia - macOS Theme Editor for Cursor and VS Code",
    description: "Design editor themes with live preview, presets, and safe settings.json writes."
  }
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Paenia",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "macOS 13 or newer",
  description:
    "Native macOS app for editing theme colors in Cursor, VS Code, Antigravity, Trae, and other VS Code-family editors.",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/PreOrder",
    price: "0",
    priceCurrency: "USD"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
        <SiteEffects />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </body>
    </html>
  );
}
