import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SiteEffects } from "@/components/SiteEffects";
import "./globals.css";

const ogImage = "/images/paenia/webp/screenshot-dark.webp";

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
  icons: {
    icon: [
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  appleWebApp: {
    capable: true,
    title: "Paenia",
    statusBarStyle: "default"
  },
  openGraph: {
    title: "Paenia - Design your editor color system",
    description:
      "A native macOS theme editor for Cursor, VS Code-family editors, live preview, presets, and safe settings.json writes.",
    url: "https://paenia.app",
    siteName: "Paenia",
    images: [ogImage],
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Paenia - macOS Theme Editor for Cursor and VS Code",
    description: "Design editor themes with live preview, presets, and safe settings.json writes.",
    images: [ogImage]
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1b1f" }
  ]
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
      <head>
        <link rel="preload" href="/images/paenia/webp/screenshot-dark.webp" as="image" type="image/webp" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-root">{children}</div>
        <SiteEffects />
        <Analytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </body>
    </html>
  );
}
