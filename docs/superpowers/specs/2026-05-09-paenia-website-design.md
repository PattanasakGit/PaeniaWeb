# Paenia Website Design Spec

Date: 2026-05-09
Status: Approved design direction, pending written-spec review

## Goal

Build a static Next.js website for Paenia, a native macOS app for editing VS Code-family editor theme colors. The website should introduce the product, support SEO and AI search, and include an internal download page where the future `.dmg` link can be added later.

The first version is a focused product site, not a large documentation portal.

## Source Product Context

Paenia is a native SwiftUI macOS app that edits theme colors for Cursor, Visual Studio Code, Antigravity, Trae, Windsurf, VSCodium, Kiro, Positron, Code - OSS, and compatible VS Code-family `User/settings.json` locations.

Core product facts to use in site copy:

- Native macOS app.
- Supports macOS 13 or newer.
- Edits VS Code-compatible `settings.json` theme customizations.
- Uses `theme.json` as the source of truth.
- Includes 78 themed presets grouped by Dark and Light, plus user presets.
- Provides live IDE preview.
- Supports Palette mode for base colors and Detailed mode for exact workbench keys.
- Applies per target: Cursor receives full theme plus Glass tint settings; other editors receive color customizations so their selected theme stays intact.
- Uses confirmation before apply.
- Creates backups before successful writes.
- Uses brace-balanced patching and refuses structurally broken settings files.
- Keeps regular backups, with restore support.
- Includes Thai labels and tooltips in the app.

## Visual Direction

Use the approved A4 direction:

- Apple-clean product page composition.
- Light paper background with dot-grid texture for subtle art surface.
- Paenia neon accents from the app palette: pink `#FF4FD8`, cyan `#00D4FF`, violet `#C77DFF`.
- Large, readable typography.
- Primary copy positioned left.
- Real Paenia app screenshots stacked on the right.
- Screenshot stack changes active image through scroll-driven interaction and also supports hover/click/tap.
- Design should feel clean and useful, not like a dense developer tool dashboard.

Approved visual companion reference:

- `.superpowers/brainstorm/85583-1778339807/content/visual-direction-v4-scroll-active.html`

## Site Architecture

Use Next.js with static output-friendly pages.

Routes:

- `/` - product homepage.
- `/download` - internal download page, ready for future `.dmg` link.

Recommended implementation shape:

- `app/page.tsx` for homepage.
- `app/download/page.tsx` for download page.
- Shared components for header, footer, screenshot stack, feature sections, FAQ, and download CTA.
- Central product/download metadata object so the future `.dmg` URL can be added in one place.

## Homepage Content

### Header

Header should be minimal:

- Brand: Paenia with app mark/logo.
- Navigation: Features, Editors, Safety, Download.
- Primary action: Download.

Header should stay readable over the dot-grid background and use light blur or a restrained surface only if needed.

### Hero

Hero headline:

`Design your editor color system.`

Hero body:

Paenia is a native macOS app for shaping Cursor, VS Code, Antigravity, Trae and other VS Code-family themes with live preview, presets, and safe apply.

Hero actions:

- `Download for macOS` links to `/download`.
- `Explore features` scrolls to feature/story section.

Proof points:

- `78 presets`
- `Live IDE preview`
- `Backup-safe writes`

### Interactive Screenshot Story

Use three real screenshots from the Paenia app:

- `/Users/pattanasak/Desktop/Paenia/images/home/Screenshot 2569-05-09 at 21.26.18.png`
- `/Users/pattanasak/Desktop/Paenia/images/home/Screenshot 2569-05-09 at 21.26.56.png`
- `/Users/pattanasak/Desktop/Paenia/images/home/Screenshot 2569-05-09 at 21.27.21.png`

They should be copied into the web project public assets before implementation.

Story steps:

1. Choose a visual direction.
   Explain presets as the fast starting point.

2. Preview light and dark modes.
   Explain that Paenia chrome follows the loaded preset.

3. Edit palette keys with confidence.
   Explain Palette and Detailed modes, source-of-truth theme model, and preview.

Interaction:

- On scroll, the active story step updates the active screenshot.
- On hover/click/tap, the chosen screenshot becomes active.
- Motion should be polished but not disruptive.
- Respect `prefers-reduced-motion`.

### Features

Feature sections should be clear and readable, optimized for search and AI summaries:

- Presets and user presets.
- Palette mode and Detailed mode.
- Live IDE preview.
- Per-target apply rules.
- Custom targets and path validation.
- Thai UI labels and tooltips.

Avoid repeating generic marketing claims. Use concrete product behavior.

### Safety

Safety section should make trust explicit:

- Confirm before apply.
- Backup before write.
- Brace-balanced patching.
- Failed writes discard invalid snapshots.
- Restore from backups.
- Retain recent backups per editor.

### Supported Editors

Show supported target editors:

- Cursor
- Visual Studio Code
- Antigravity
- Trae
- Windsurf
- VSCodium
- Kiro
- Positron
- Code - OSS
- Custom VS Code-family `User/settings.json` path

Cursor can be described as the full-theme target with Glass tint support. Other targets should be described as receiving workbench and token color customizations.

### SEO / AI Search Answer Block

Include a plain-language answer block on the homepage:

Question:

`What is Paenia?`

Answer:

Paenia is a native macOS app for editing theme colors in Cursor, VS Code, Antigravity, Trae, and other VS Code-family editors. It writes safe color customizations to each editor's `settings.json`, supports presets and live preview, and creates backups before applying changes.

This block should be visible text, not metadata only.

### FAQ

Initial FAQ:

- What is Paenia?
- Which editors does Paenia support?
- Does Paenia overwrite my whole settings file?
- Is there a backup before applying?
- Does Paenia support Cursor Glass tint?
- What macOS version is required?
- Where can I download Paenia?

FAQ answers should be concise and fact-based.

## Download Page

Route: `/download`

Purpose:

Provide a stable destination for all download CTAs before the `.dmg` is uploaded.

Current state:

- The `.dmg` file is not uploaded yet.
- The page should clearly say the macOS download is coming soon.
- Do not pretend the file is available.

Main content:

- Heading: `Download Paenia for macOS`
- Status: `DMG release coming soon`
- Disabled or inactive CTA: `DMG coming soon`
- Short note: the `.dmg` file will be added here when ready.

Requirements:

- macOS 13 or newer.
- Native SwiftUI app.
- No Node.js runtime required by the app.
- Installs to `~/Applications/Paenia.app`.
- Uses `~/Library/Application Support/Paenia/theme.json`.

Future-ready implementation:

- Store download state in a small config object:
  - `status: "coming-soon" | "available"`
  - `version`
  - `dmgUrl`
  - `fileSize`
  - `sha256` if available later
- When `status` becomes `available`, the button should become a real download link.

## SEO Requirements

Metadata:

- Title should include Paenia, macOS, and editor themes.
- Description should mention Cursor, VS Code-family editors, live preview, presets, and safe apply.
- Open Graph metadata should use Paenia branding and screenshot imagery.
- Add canonical URLs when deployment URL is known.

Structured content:

- Use semantic headings.
- Include FAQ content in visible text.
- Include product facts in prose, not only cards.
- Use descriptive alt text for real screenshots.
- Keep core product explanation near the top.

AI search optimization:

- Include direct answer paragraphs for "what is Paenia", "what editors does Paenia support", and "is Paenia safe".
- Avoid vague claims without product details.
- Use exact terms like `settings.json`, `workbench.colorCustomizations`, `editor.tokenColorCustomizations`, and `VS Code-family editors` where appropriate.

## Accessibility

- All navigation links and buttons must be keyboard accessible.
- Screenshot stack should not require hover only; click/tap should also work.
- Active screenshot state should have visible affordance.
- Respect reduced motion preferences.
- Maintain readable contrast on dot-grid background.
- Add alt text for all screenshots.

## Testing And Verification

Before final handoff:

- Run typecheck/build if the project provides scripts.
- Start local dev server.
- Verify `/` and `/download`.
- Use browser verification on desktop and mobile widths.
- Confirm screenshot assets load.
- Confirm scroll-driven screenshot activation works.
- Confirm CTA from homepage routes to `/download`.
- Confirm download page honestly shows coming-soon state.
- Check for text overflow and mobile readability.

## Out Of Scope For First Version

- Real `.dmg` hosting.
- GitHub release integration.
- Blog/docs portal.
- User accounts or analytics dashboard.
- App update feed.
- Payment/subscription flows.

## Open Implementation Note

`PaeniaWeb` was empty and not a git repository during design. The implementation can initialize a standard Next.js project in place, but committing the design spec was not possible until a git repository exists.
