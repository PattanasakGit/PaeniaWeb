# Paenia Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static Next.js product website for Paenia with an SEO-ready homepage, an internal coming-soon download page, real app screenshots, and the approved Apple-clean dot-grid visual direction.

**Architecture:** Scaffold a small Next.js App Router project in `/Users/pattanasak/Desktop/PaeniaWeb`. Keep product facts and download state in typed data modules, render reusable sections as focused React components, and copy Paenia screenshots into `public/images/paenia/` for reliable static delivery.

**Tech Stack:** Next.js App Router, React, TypeScript, CSS Modules or global CSS, static image assets, Playwright/browser verification through local dev server.

---

## File Structure

Create this project structure:

```text
/Users/pattanasak/Desktop/PaeniaWeb/
  package.json
  next.config.ts
  tsconfig.json
  eslint.config.mjs
  app/
    globals.css
    layout.tsx
    page.tsx
    download/
      page.tsx
  components/
    Footer.tsx
    Header.tsx
    ScreenshotStory.tsx
    SectionShell.tsx
  lib/
    download.ts
    product.ts
  public/
    images/
      paenia/
        app-icon.png
        screenshot-dark.png
        screenshot-light.png
        screenshot-palette.png
```

Responsibilities:

- `lib/product.ts`: single source for Paenia facts, features, supported editors, FAQ, and screenshot metadata.
- `lib/download.ts`: single source for current download state and future `.dmg` URL.
- `components/Header.tsx`: global navigation and brand.
- `components/Footer.tsx`: footer navigation and product summary.
- `components/SectionShell.tsx`: shared section layout primitive.
- `components/ScreenshotStory.tsx`: scroll/click active screenshot stack.
- `app/page.tsx`: homepage composition.
- `app/download/page.tsx`: download page composition.
- `app/layout.tsx`: metadata, root shell, structured data.
- `app/globals.css`: tokens, layout, responsive behavior, motion, dot-grid background, and component styling.

## Task 1: Scaffold Next.js Project

**Files:**
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/package.json`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/next.config.ts`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/tsconfig.json`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/eslint.config.mjs`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/app/globals.css`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/app/layout.tsx`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/app/page.tsx`

- [ ] **Step 1: Create minimal Next project files**

Create `package.json`:

```json
{
  "name": "paenia-web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@eslint/eslintrc": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "typescript": "latest"
  }
}
```

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

Create `eslint.config.mjs`:

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript")
];

export default eslintConfig;
```

Create `app/globals.css`:

```css
:root {
  --paper: #f7f7f5;
  --paper-strong: #ffffff;
  --ink: #15121a;
  --muted: #5a5363;
  --muted-2: #746d7d;
  --line: rgba(21, 18, 26, 0.14);
  --pink: #ff4fd8;
  --cyan: #00d4ff;
  --violet: #c77dff;
  --green: #5cff95;
  --shadow: 0 28px 80px rgba(21, 18, 26, 0.12);
  --max: 1180px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at 82% 8%, rgba(255, 79, 216, 0.2), transparent 28rem),
    radial-gradient(circle at 92% 24%, rgba(0, 212, 255, 0.12), transparent 24rem),
    var(--paper);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  background-image: radial-gradient(circle at 1px 1px, rgba(21, 18, 26, 0.13) 1px, transparent 0);
  background-size: 22px 22px;
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.52) 58%, rgba(0, 0, 0, 0.16));
  z-index: -1;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

Create `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paenia - macOS Theme Editor for Cursor and VS Code",
  description:
    "Paenia is a native macOS app for editing Cursor, VS Code, Antigravity, Trae and VS Code-family theme colors with live preview, presets, backups, and safe apply.",
  openGraph: {
    title: "Paenia - Design your editor color system",
    description:
      "A native macOS theme editor for Cursor, VS Code-family editors, live preview, presets, and safe settings.json writes.",
    images: ["/images/paenia/screenshot-dark.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Create `app/page.tsx`:

```tsx
export default function HomePage() {
  return <main>Paenia homepage</main>;
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
bun install
```

Expected: `bun.lock` is created and dependencies install successfully.

- [ ] **Step 3: Run typecheck**

Run:

```bash
bun run typecheck
```

Expected: PASS with no TypeScript errors.

- [ ] **Step 4: Run build**

Run:

```bash
bun run build
```

Expected: PASS and static export output is generated.

## Task 2: Copy Static Assets

**Files:**
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/public/images/paenia/app-icon.png`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/public/images/paenia/screenshot-dark.png`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/public/images/paenia/screenshot-light.png`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/public/images/paenia/screenshot-palette.png`

- [ ] **Step 1: Create destination directory**

Run:

```bash
mkdir -p public/images/paenia
```

Expected: directory exists.

- [ ] **Step 2: Copy app icon and screenshots**

Run:

```bash
cp /Users/pattanasak/Desktop/Paenia/assets/AppIcon.png public/images/paenia/app-icon.png
cp "/Users/pattanasak/Desktop/Paenia/images/home/Screenshot 2569-05-09 at 21.26.18.png" public/images/paenia/screenshot-dark.png
cp "/Users/pattanasak/Desktop/Paenia/images/home/Screenshot 2569-05-09 at 21.26.56.png" public/images/paenia/screenshot-light.png
cp "/Users/pattanasak/Desktop/Paenia/images/home/Screenshot 2569-05-09 at 21.27.21.png" public/images/paenia/screenshot-palette.png
```

Expected: four files exist under `public/images/paenia/`.

- [ ] **Step 3: Verify asset dimensions**

Run:

```bash
sips -g pixelWidth -g pixelHeight public/images/paenia/*.png
```

Expected: screenshots are large enough for hero rendering; icon exists.

## Task 3: Add Product And Download Data

**Files:**
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/lib/product.ts`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/lib/download.ts`

- [ ] **Step 1: Create product data module**

Create `lib/product.ts`:

```ts
export const screenshots = [
  {
    id: "dark",
    src: "/images/paenia/screenshot-dark.png",
    alt: "Paenia dark mode workspace with presets, palette editing, and live preview",
    label: "Dark workspace",
    title: "Start from a preset.",
    body: "Choose from curated dark and light presets, then refine the palette without leaving the app."
  },
  {
    id: "light",
    src: "/images/paenia/screenshot-light.png",
    alt: "Paenia light mode workspace showing the app chrome following a light preset",
    label: "Light preset",
    title: "Preview the whole chrome.",
    body: "Paenia follows the loaded preset, so light themes and dark themes both feel native on macOS."
  },
  {
    id: "palette",
    src: "/images/paenia/screenshot-palette.png",
    alt: "Paenia palette editing screen with syntax colors and live editor preview",
    label: "Palette editing",
    title: "Tune palette keys live.",
    body: "Palette edits cascade across workbench colors, while Detailed mode can override exact VS Code keys."
  }
] as const;

export const proofPoints = [
  {
    title: "78 presets",
    body: "Grouped Dark, Light, and minimal palettes give users a fast starting point."
  },
  {
    title: "Live IDE preview",
    body: "Preview workbench colors and syntax tokens before writing editor settings."
  },
  {
    title: "Backup-safe writes",
    body: "Confirm, back up, patch, and validate each settings.json update."
  }
] as const;

export const storySteps = [
  {
    screenshotId: "dark",
    title: "Choose a visual direction.",
    body: "Presets give users a fast starting point while keeping every color editable through a source-of-truth theme file."
  },
  {
    screenshotId: "light",
    title: "Preview light and dark modes.",
    body: "The Paenia app chrome follows the loaded preset, so the design experience stays readable across theme styles."
  },
  {
    screenshotId: "palette",
    title: "Edit palette keys with confidence.",
    body: "Use Palette mode for base color systems or Detailed mode for exact workbench.colorCustomizations keys."
  }
] as const;

export const features = [
  {
    title: "Palette and Detailed editing",
    body: "Edit base colors such as bg0, accent, blue, green, red, and purple, or override individual VS Code workbench keys."
  },
  {
    title: "Presets and personal themes",
    body: "Start from curated presets, save your own palette snapshots, and reload them whenever you want."
  },
  {
    title: "Target-aware apply",
    body: "Cursor can receive full theme and Glass tint settings. Other editors receive color customizations so their selected theme stays intact."
  },
  {
    title: "Custom editor paths",
    body: "Add compatible VS Code-family settings.json locations with path validation before Paenia writes anything."
  }
] as const;

export const safetyItems = [
  "Confirmation modal before Apply",
  "Backup before successful writes",
  "Brace-balanced settings.json patching",
  "Restore from original and regular snapshots",
  "Recent backup retention per editor"
] as const;

export const supportedEditors = [
  "Cursor",
  "Visual Studio Code",
  "Antigravity",
  "Trae",
  "Windsurf",
  "VSCodium",
  "Kiro",
  "Positron",
  "Code - OSS",
  "Custom VS Code-family path"
] as const;

export const faqs = [
  {
    question: "What is Paenia?",
    answer:
      "Paenia is a native macOS app for editing theme colors in Cursor, VS Code, Antigravity, Trae, and other VS Code-family editors."
  },
  {
    question: "Which editors does Paenia support?",
    answer:
      "Paenia supports Cursor, Visual Studio Code, Antigravity, Trae, Windsurf, VSCodium, Kiro, Positron, Code - OSS, and custom compatible User/settings.json paths."
  },
  {
    question: "Does Paenia overwrite my whole settings file?",
    answer:
      "Paenia patches editor color customization sections instead of replacing the whole settings file, and it checks brace balance before writing."
  },
  {
    question: "Is there a backup before applying?",
    answer:
      "Yes. Paenia snapshots target settings.json files before successful writes and includes restore workflows for backups."
  },
  {
    question: "Does Paenia support Cursor Glass tint?",
    answer:
      "Yes. Cursor can receive the full theme configuration plus Glass tint settings. Other editors receive color customizations."
  },
  {
    question: "What macOS version is required?",
    answer: "Paenia is designed for macOS 13 or newer."
  },
  {
    question: "Where can I download Paenia?",
    answer:
      "The website includes a download page. The macOS DMG release will be added there when it is ready."
  }
] as const;
```

- [ ] **Step 2: Create download state module**

Create `lib/download.ts`:

```ts
export type DownloadInfo =
  | {
      status: "coming-soon";
      version: null;
      dmgUrl: null;
      fileSize: null;
      sha256: null;
    }
  | {
      status: "available";
      version: string;
      dmgUrl: string;
      fileSize: string;
      sha256: string | null;
    };

export const downloadInfo: DownloadInfo = {
  status: "coming-soon",
  version: null,
  dmgUrl: null,
  fileSize: null,
  sha256: null
};

export const systemRequirements = [
  "macOS 13 or newer",
  "Native SwiftUI app",
  "No Node.js runtime required by the app",
  "Installs to ~/Applications/Paenia.app",
  "Uses ~/Library/Application Support/Paenia/theme.json"
] as const;
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
bun run typecheck
```

Expected: PASS.

## Task 4: Build Shared Layout Components

**Files:**
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/components/Header.tsx`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/components/Footer.tsx`
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/components/SectionShell.tsx`
- Modify: `/Users/pattanasak/Desktop/PaeniaWeb/app/globals.css`

- [ ] **Step 1: Create header component**

Create `components/Header.tsx`:

```tsx
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
```

- [ ] **Step 2: Create footer component**

Create `components/Footer.tsx`:

```tsx
import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Paenia</strong>
        <p>Native macOS theme editing for Cursor and VS Code-family editors.</p>
      </div>
      <div className="footer-links">
        <Link href="/#features">Features</Link>
        <Link href="/#safety">Safety</Link>
        <Link href="/download">Download</Link>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Create section shell component**

Create `components/SectionShell.tsx`:

```tsx
import type { ReactNode } from "react";

type SectionShellProps = {
  id?: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export function SectionShell({ id, title, intro, children }: SectionShellProps) {
  return (
    <section id={id} className="section-shell">
      <div className="section-heading">
        <h2>{title}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
      {children}
    </section>
  );
}
```

- [ ] **Step 4: Add shared component CSS**

Append to `app/globals.css`:

```css
.site-header,
.site-footer,
.section-shell,
.hero-section,
.download-hero {
  width: min(var(--max), calc(100% - 40px));
  margin: 0 auto;
}

.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  background: rgba(247, 247, 245, 0.78);
  border-bottom: 1px solid rgba(21, 18, 26, 0.08);
  backdrop-filter: blur(22px);
}

.brand-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--ink);
  font-size: 15px;
  font-weight: 720;
  text-decoration: none;
}

.brand-link img {
  border-radius: 9px;
  box-shadow: 0 8px 22px rgba(255, 79, 216, 0.2);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--muted);
  font-size: 13px;
  font-weight: 650;
}

.site-nav a,
.footer-links a {
  text-decoration: none;
}

.section-shell {
  padding: 96px 0;
}

.section-heading {
  max-width: 720px;
  margin-bottom: 32px;
}

.section-heading h2 {
  margin: 0 0 12px;
  font-size: clamp(34px, 4vw, 54px);
  line-height: 1;
  letter-spacing: 0;
}

.section-heading p {
  margin: 0;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.58;
}

.site-footer {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  padding: 48px 0;
  border-top: 1px solid var(--line);
  color: var(--muted);
}

.site-footer strong {
  color: var(--ink);
}

.site-footer p {
  margin: 8px 0 0;
}

.footer-links {
  display: flex;
  gap: 18px;
  font-size: 14px;
  font-weight: 650;
}

@media (max-width: 760px) {
  .site-nav {
    display: none;
  }

  .site-footer {
    flex-direction: column;
  }

  .section-shell {
    padding: 72px 0;
  }
}
```

- [ ] **Step 5: Run typecheck**

Run:

```bash
bun run typecheck
```

Expected: PASS.

## Task 5: Build Screenshot Story Component

**Files:**
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/components/ScreenshotStory.tsx`
- Modify: `/Users/pattanasak/Desktop/PaeniaWeb/app/globals.css`

- [ ] **Step 1: Create client screenshot story component**

Create `components/ScreenshotStory.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { screenshots, storySteps } from "@/lib/product";

type ScreenshotId = (typeof screenshots)[number]["id"];

export function ScreenshotStory() {
  const [active, setActive] = useState<ScreenshotId>("dark");
  const activeScreenshot = useMemo(
    () => screenshots.find((screenshot) => screenshot.id === active) ?? screenshots[0],
    [active]
  );

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-story-step]"));
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const next = visible?.target.getAttribute("data-story-step") as ScreenshotId | null;
        if (next) setActive(next);
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-22% 0px -38% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="story-section" aria-label="Paenia workflow screenshots">
      <div className="story-copy">
        {storySteps.map((step) => (
          <article
            key={step.screenshotId}
            className="story-step"
            data-story-step={step.screenshotId}
            onMouseEnter={() => setActive(step.screenshotId)}
          >
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
      <div className="story-stage-wrap">
        <div className="story-stage" data-active={active}>
          {screenshots.map((screenshot) => (
            <button
              key={screenshot.id}
              className="story-shot"
              data-shot={screenshot.id}
              type="button"
              onClick={() => setActive(screenshot.id)}
              aria-pressed={active === screenshot.id}
            >
              <Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 900px) 88vw, 640px" />
              <span>{screenshot.label}</span>
            </button>
          ))}
          <div className="story-meta" aria-live="polite">
            <h3>{activeScreenshot.title}</h3>
            <p>{activeScreenshot.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add screenshot story CSS**

Append to `app/globals.css`:

```css
.story-section {
  width: min(var(--max), calc(100% - 40px));
  margin: 0 auto;
  padding: 70px 0 110px;
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(560px, 1.14fr);
  gap: 44px;
}

.story-copy {
  display: grid;
  gap: 22px;
}

.story-step {
  min-height: 230px;
  border-left: 2px solid rgba(21, 18, 26, 0.12);
  padding: 18px 0 18px 22px;
}

.story-step h2 {
  margin: 0 0 8px;
  font-size: clamp(28px, 3vw, 38px);
  line-height: 1.02;
  letter-spacing: 0;
}

.story-step p {
  margin: 0;
  max-width: 500px;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.62;
}

.story-stage-wrap {
  position: sticky;
  top: 104px;
  height: 540px;
}

.story-stage {
  position: relative;
  height: 100%;
  perspective: 1400px;
}

.story-shot {
  position: absolute;
  width: min(640px, 52vw);
  aspect-ratio: 2838 / 2012;
  border: 1px solid rgba(255, 255, 255, 0.48);
  border-radius: 26px;
  overflow: hidden;
  background: #120b20;
  box-shadow: 0 28px 70px rgba(36, 22, 66, 0.24);
  cursor: pointer;
  padding: 0;
  transition: transform 0.62s cubic-bezier(0.2, 0.82, 0.18, 1), filter 0.62s, opacity 0.62s, box-shadow 0.62s;
  transform-origin: 50% 100%;
}

.story-shot img {
  object-fit: cover;
  object-position: center top;
}

.story-shot span {
  position: absolute;
  left: 18px;
  bottom: 16px;
  border-radius: 999px;
  padding: 8px 12px;
  background: rgba(8, 6, 15, 0.76);
  color: #fff7ff;
  font-size: 11px;
  font-weight: 720;
  backdrop-filter: blur(14px);
}

.story-shot[data-shot="dark"] {
  right: 2px;
  top: 28px;
  z-index: 3;
  transform: rotate(-2.2deg) translate3d(0, 0, 0);
}

.story-shot[data-shot="light"] {
  right: 72px;
  top: 112px;
  z-index: 2;
  opacity: 0.86;
  filter: saturate(0.9) brightness(0.96);
  transform: rotate(4.4deg) scale(0.9) translate3d(-42px, 0, -90px);
}

.story-shot[data-shot="palette"] {
  right: -8px;
  top: 204px;
  z-index: 1;
  opacity: 0.76;
  filter: saturate(0.86) brightness(0.9);
  transform: rotate(-7.2deg) scale(0.8) translate3d(-102px, 4px, -180px);
}

.story-stage[data-active="dark"] .story-shot[data-shot="dark"],
.story-stage[data-active="light"] .story-shot[data-shot="light"],
.story-stage[data-active="palette"] .story-shot[data-shot="palette"],
.story-shot:hover,
.story-shot:focus-visible {
  z-index: 9;
  opacity: 1;
  filter: saturate(1.02) brightness(1);
  transform: rotate(0) scale(1.05) translate3d(-28px, -30px, 120px);
  box-shadow: 0 36px 86px rgba(36, 22, 66, 0.32);
  outline: none;
}

.story-stage[data-active="dark"] .story-shot:not([data-shot="dark"]),
.story-stage[data-active="light"] .story-shot:not([data-shot="light"]),
.story-stage[data-active="palette"] .story-shot:not([data-shot="palette"]) {
  opacity: 0.62;
  filter: saturate(0.76) brightness(0.92);
}

.story-meta {
  position: absolute;
  right: 10px;
  bottom: 0;
  width: min(440px, 43vw);
  padding: 18px 20px;
  border: 1px solid rgba(21, 18, 26, 0.1);
  border-radius: 20px;
  background: rgba(247, 247, 245, 0.78);
  box-shadow: 0 20px 50px rgba(21, 18, 26, 0.08);
  backdrop-filter: blur(20px);
}

.story-meta h3 {
  margin: 0 0 6px;
  font-size: 18px;
}

.story-meta p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.5;
}

@media (max-width: 1050px) {
  .story-section {
    grid-template-columns: 1fr;
  }

  .story-stage-wrap {
    position: relative;
    top: auto;
  }

  .story-shot {
    width: min(88vw, 620px);
  }

  .story-meta {
    width: min(430px, 82vw);
  }
}
```

- [ ] **Step 3: Run typecheck**

Run:

```bash
bun run typecheck
```

Expected: PASS.

## Task 6: Implement Homepage

**Files:**
- Modify: `/Users/pattanasak/Desktop/PaeniaWeb/app/page.tsx`
- Modify: `/Users/pattanasak/Desktop/PaeniaWeb/app/globals.css`

- [ ] **Step 1: Replace homepage composition**

Replace `app/page.tsx` with:

```tsx
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScreenshotStory } from "@/components/ScreenshotStory";
import { SectionShell } from "@/components/SectionShell";
import { faqs, features, proofPoints, safetyItems, supportedEditors } from "@/lib/product";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-section">
          <div className="hero-copy">
            <h1>Design your editor color system.</h1>
            <p>
              Paenia is a native macOS app for shaping Cursor, VS Code, Antigravity, Trae and other
              VS Code-family themes with live preview, presets, and safe apply.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/download">
                Download for macOS
              </Link>
              <a className="button secondary" href="#story">
                Explore features
              </a>
            </div>
            <div className="proof-grid">
              {proofPoints.map((point) => (
                <div key={point.title} className="proof-card">
                  <strong>{point.title}</strong>
                  <span>{point.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ScreenshotStory />

        <SectionShell
          id="ai-search"
          title="What is Paenia?"
          intro="Paenia is a native macOS app for editing theme colors in Cursor, VS Code, Antigravity, Trae, and other VS Code-family editors."
        >
          <div className="answer-block">
            <p>
              Paenia writes safe color customizations to each editor&apos;s <code>settings.json</code>,
              supports presets and live preview, and creates backups before applying changes. It is
              designed for people who want precise editor color control without manually editing
              <code> workbench.colorCustomizations</code> and <code>editor.tokenColorCustomizations</code>.
            </p>
          </div>
        </SectionShell>

        <SectionShell
          id="features"
          title="Built for precise theme work"
          intro="Paenia combines visual preset editing with real VS Code-compatible theme keys, so the interface stays approachable without hiding the system underneath."
        >
          <div className="card-grid">
            {features.map((feature) => (
              <article key={feature.title} className="info-card">
                <h3>{feature.title}</h3>
                <p>{feature.body}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="safety"
          title="Safe apply by design"
          intro="Paenia treats editor settings as user-owned files. The apply flow confirms targets, snapshots settings, patches carefully, and reports the result."
        >
          <ul className="safety-list">
            {safetyItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell
          id="editors"
          title="For Cursor, VS Code, and AI editors"
          intro="Paenia targets editors that use VS Code-compatible User/settings.json files and support workbench color customizations."
        >
          <div className="editor-grid">
            {supportedEditors.map((editor) => (
              <span key={editor}>{editor}</span>
            ))}
          </div>
        </SectionShell>

        <SectionShell
          id="faq"
          title="FAQ"
          intro="Short answers for people and search engines."
        >
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} open={faq.question === "What is Paenia?"}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </SectionShell>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add homepage CSS**

Append to `app/globals.css`:

```css
.hero-section {
  min-height: 88vh;
  display: grid;
  align-items: center;
  padding: 92px 0 54px;
}

.hero-copy {
  max-width: 720px;
}

.hero-copy h1 {
  margin: 0 0 24px;
  max-width: 700px;
  font-size: clamp(56px, 7vw, 92px);
  line-height: 0.9;
  letter-spacing: 0;
}

.hero-copy p {
  margin: 0 0 30px;
  max-width: 610px;
  color: var(--muted);
  font-size: 20px;
  line-height: 1.52;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 32px;
}

.button {
  display: inline-flex;
  min-height: 46px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 13px 21px;
  font-size: 14px;
  font-weight: 760;
  text-decoration: none;
}

.button.primary {
  background: #15121a;
  color: #fff;
  box-shadow: 0 14px 36px rgba(21, 18, 26, 0.22);
}

.button.secondary {
  border: 1px solid #c8c2cf;
  background: rgba(255, 255, 255, 0.5);
  color: var(--ink);
}

.proof-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  max-width: 720px;
}

.proof-card {
  min-height: 86px;
  border-top: 1px solid var(--line);
  padding-top: 14px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.45;
}

.proof-card strong {
  display: block;
  margin-bottom: 4px;
  color: var(--ink);
  font-size: 13px;
}

.answer-block {
  max-width: 850px;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.58);
  padding: 28px;
  box-shadow: 0 18px 50px rgba(21, 18, 26, 0.06);
}

.answer-block p {
  margin: 0;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.65;
}

code {
  color: var(--ink);
  font-family: "SF Mono", ui-monospace, Menlo, monospace;
  font-size: 0.92em;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.info-card {
  min-height: 220px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.56);
  padding: 20px;
  box-shadow: 0 18px 50px rgba(21, 18, 26, 0.06);
}

.info-card h3 {
  margin: 0 0 10px;
  font-size: 18px;
}

.info-card p {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
}

.safety-list {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.safety-list li,
.editor-grid span {
  border: 1px solid var(--line);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.58);
  padding: 16px;
  color: var(--ink);
  font-size: 14px;
  font-weight: 650;
}

.editor-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.faq-list {
  display: grid;
  gap: 10px;
  max-width: 880px;
}

.faq-list details {
  border: 1px solid var(--line);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.58);
  padding: 18px 20px;
}

.faq-list summary {
  cursor: pointer;
  color: var(--ink);
  font-weight: 720;
}

.faq-list p {
  margin: 12px 0 0;
  color: var(--muted);
  line-height: 1.55;
}

@media (max-width: 1050px) {
  .card-grid,
  .safety-list,
  .editor-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .hero-section {
    min-height: auto;
    padding-top: 72px;
  }

  .proof-grid,
  .card-grid,
  .safety-list,
  .editor-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 3: Run typecheck and build**

Run:

```bash
bun run typecheck
bun run build
```

Expected: both PASS.

## Task 7: Implement Download Page

**Files:**
- Create: `/Users/pattanasak/Desktop/PaeniaWeb/app/download/page.tsx`
- Modify: `/Users/pattanasak/Desktop/PaeniaWeb/app/globals.css`

- [ ] **Step 1: Create download page**

Create `app/download/page.tsx`:

```tsx
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { downloadInfo, systemRequirements } from "@/lib/download";

export const metadata = {
  title: "Download Paenia for macOS",
  description:
    "Download page for Paenia, a native macOS theme editor for Cursor and VS Code-family editors. The DMG release is coming soon."
};

export default function DownloadPage() {
  const isAvailable = downloadInfo.status === "available";

  return (
    <>
      <Header />
      <main>
        <section className="download-hero">
          <div className="download-copy">
            <p className="status-label">macOS download</p>
            <h1>Download Paenia for macOS</h1>
            <p>
              The Paenia DMG release is coming soon. This page is the permanent download destination,
              and the real file link will be added here when it is ready.
            </p>
            {isAvailable ? (
              <a className="button primary" href={downloadInfo.dmgUrl}>
                Download Paenia {downloadInfo.version}
              </a>
            ) : (
              <button className="button disabled" type="button" disabled>
                DMG coming soon
              </button>
            )}
            <Link className="text-link" href="/">
              Back to overview
            </Link>
          </div>
          <div className="download-panel">
            <h2>What you&apos;ll get</h2>
            <ul>
              <li>Native SwiftUI macOS app</li>
              <li>Theme preset and palette editor</li>
              <li>Live IDE preview</li>
              <li>Safe apply flow with backups</li>
            </ul>
          </div>
        </section>

        <section className="download-details">
          <div>
            <h2>System requirements</h2>
            <ul>
              {systemRequirements.map((requirement) => (
                <li key={requirement}>{requirement}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Future release metadata</h2>
            <p>
              When the DMG is uploaded, update <code>lib/download.ts</code> with the version, file
              size, optional SHA-256 checksum, and real download URL.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Add download page CSS**

Append to `app/globals.css`:

```css
.download-hero {
  min-height: 78vh;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 420px;
  gap: 32px;
  align-items: center;
  padding: 90px 0;
}

.download-copy {
  max-width: 720px;
}

.status-label {
  margin: 0 0 14px;
  color: var(--pink);
  font-size: 13px;
  font-weight: 760;
}

.download-copy h1 {
  margin: 0 0 22px;
  font-size: clamp(48px, 6vw, 82px);
  line-height: 0.92;
  letter-spacing: 0;
}

.download-copy > p:not(.status-label) {
  margin: 0 0 28px;
  max-width: 620px;
  color: var(--muted);
  font-size: 20px;
  line-height: 1.52;
}

.button.disabled {
  border: 1px solid #c8c2cf;
  background: rgba(255, 255, 255, 0.62);
  color: var(--muted);
  cursor: not-allowed;
}

.text-link {
  display: inline-flex;
  margin-left: 16px;
  color: var(--muted);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.download-panel,
.download-details > div {
  border: 1px solid var(--line);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.6);
  padding: 24px;
  box-shadow: 0 18px 50px rgba(21, 18, 26, 0.06);
}

.download-panel h2,
.download-details h2 {
  margin: 0 0 14px;
  font-size: 24px;
}

.download-panel ul,
.download-details ul {
  margin: 0;
  padding-left: 20px;
  color: var(--muted);
  line-height: 1.7;
}

.download-details {
  width: min(var(--max), calc(100% - 40px));
  margin: 0 auto 90px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
}

.download-details p {
  margin: 0;
  color: var(--muted);
  line-height: 1.6;
}

@media (max-width: 860px) {
  .download-hero,
  .download-details {
    grid-template-columns: 1fr;
  }

  .text-link {
    margin: 16px 0 0;
  }
}
```

- [ ] **Step 3: Run typecheck and build**

Run:

```bash
bun run typecheck
bun run build
```

Expected: both PASS.

## Task 8: Add Structured Data And Metadata Refinement

**Files:**
- Modify: `/Users/pattanasak/Desktop/PaeniaWeb/app/layout.tsx`

- [ ] **Step 1: Add JSON-LD structured data**

Replace `app/layout.tsx` with:

```tsx
import type { Metadata } from "next";
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
    description:
      "Design editor themes with live preview, presets, and safe settings.json writes."
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
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Run build**

Run:

```bash
bun run build
```

Expected: PASS.

## Task 9: Browser Verification And Polish

**Files:**
- Modify files found during verification only.

- [ ] **Step 1: Start dev server**

Run:

```bash
bun run dev
```

Expected: Next.js dev server starts, usually at `http://localhost:3000`.

- [ ] **Step 2: Verify homepage desktop**

Open `http://localhost:3000/`.

Expected:

- Header appears with Paenia brand and nav.
- Dot-grid background is visible but does not reduce readability.
- Hero text is large and readable.
- CTA links to `/download`.
- Screenshot story uses three real images.
- Scrolling story steps updates active screenshot.
- Feature, safety, editors, answer block, and FAQ sections render.

- [ ] **Step 3: Verify download page desktop**

Open `http://localhost:3000/download`.

Expected:

- Page says `Download Paenia for macOS`.
- Page clearly says DMG release is coming soon.
- Disabled button says `DMG coming soon`.
- No fake `.dmg` URL appears.
- Back link returns to homepage.

- [ ] **Step 4: Verify mobile layout**

Use a mobile viewport around `390x844`.

Expected:

- No horizontal overflow.
- Header brand remains visible.
- Hero text wraps cleanly.
- Screenshot stack fits within viewport.
- Feature, safety, editor, FAQ, and download sections collapse to one column.

- [ ] **Step 5: Run Playwright console check**

Run a Playwright script against the local server:

```bash
bun -e "const { chromium } = await import('playwright'); const browser = await chromium.launch({ headless: true }); const page = await browser.newPage({ viewport: { width: 1280, height: 900 } }); const logs = []; page.on('console', (msg) => logs.push({ type: msg.type(), text: msg.text() })); page.on('pageerror', (error) => logs.push({ type: 'pageerror', text: error.stack || error.message })); await page.goto('http://127.0.0.1:3000/', { waitUntil: 'domcontentloaded', timeout: 10000 }); await page.waitForTimeout(1500); const homeText = await page.evaluate(() => document.body.innerText); await page.goto('http://127.0.0.1:3000/download', { waitUntil: 'domcontentloaded', timeout: 10000 }); await page.waitForTimeout(800); const downloadText = await page.evaluate(() => document.body.innerText); await browser.close(); console.log(JSON.stringify({ hasHomeHeadline: homeText.includes('Design your editor color system.'), hasComingSoon: downloadText.includes('DMG coming soon'), logs }, null, 2));"
```

Expected:

```json
{
  "hasHomeHeadline": true,
  "hasComingSoon": true,
  "logs": []
}
```

- [ ] **Step 6: Stop dev server**

Stop the dev server cleanly after verification.

Expected: no needed process remains running.

## Task 10: Final Build Verification

**Files:**
- Modify files found during final verification only.

- [ ] **Step 1: Run final typecheck**

Run:

```bash
bun run typecheck
```

Expected: PASS.

- [ ] **Step 2: Run final build**

Run:

```bash
bun run build
```

Expected: PASS.

- [ ] **Step 3: Inspect generated static output**

Run:

```bash
find out -maxdepth 2 -type f | sort | sed -n '1,80p'
```

Expected:

- `out/index.html`
- `out/download/index.html`
- static assets for scripts/styles/images.

- [ ] **Step 4: Summarize completion**

Final response should include:

- Files created.
- Verification commands run and results.
- Local URL used during verification.
- Download page status remains coming soon.
- Any remaining limitation, especially no real `.dmg` link yet.
