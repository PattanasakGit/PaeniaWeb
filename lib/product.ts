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

export const workflowShowcases = [
  {
    title: "Start with presets, then refine exact keys.",
    body: "The preset picker, Palette mode, and Detailed mode work together: users can choose a theme direction, tune base colors, then override exact workbench keys only when they need precision.",
    images: [
      {
        src: "/images/paenia/screenshot-presets.png",
        alt: "Paenia preset picker with search and preset filters",
        label: "Preset picker"
      },
      {
        src: "/images/paenia/screenshot-detailed.png",
        alt: "Paenia Detailed mode showing individual VS Code workbench color keys",
        label: "Detailed mode"
      },
      {
        src: "/images/paenia/screenshot-overrides.png",
        alt: "Paenia Detailed mode with custom override badges",
        label: "Custom overrides"
      }
    ]
  },
  {
    title: "Choose exactly where the theme applies.",
    body: "Apply Targets makes the site story concrete: Cursor, VS Code, Antigravity, Trae and custom settings paths are visible, with status and paths shown before writing anything.",
    images: [
      {
        src: "/images/paenia/screenshot-targets.png",
        alt: "Paenia Apply Targets settings showing editor paths and target status",
        label: "Apply targets"
      }
    ]
  },
  {
    title: "Backups are part of the design, not an afterthought.",
    body: "Original snapshots and regular backups give the website a trust section with real UI evidence. Visitors can see how restore and retention work before they download.",
    images: [
      {
        src: "/images/paenia/screenshot-original-backups.png",
        alt: "Paenia backup settings showing original snapshots",
        label: "Original snapshots"
      },
      {
        src: "/images/paenia/screenshot-regular-backups.png",
        alt: "Paenia backup settings showing regular backup list and restore controls",
        label: "Regular backups"
      }
    ]
  }
] as const;

export const galleryImages = [
  {
    src: "/images/paenia/screenshot-dark.png",
    alt: "Paenia dark workspace with palette editing and live editor preview",
    label: "Dark workspace",
    width: 2838,
    height: 2012,
    tone: "The core workspace"
  },
  {
    src: "/images/paenia/screenshot-light.png",
    alt: "Paenia light preset workspace",
    label: "Light preset",
    width: 2838,
    height: 2012,
    tone: "Light and readable"
  },
  {
    src: "/images/paenia/screenshot-palette.png",
    alt: "Paenia palette editing screen with syntax color controls",
    label: "Palette editing",
    width: 2926,
    height: 2100,
    tone: "Color system controls"
  },
  {
    src: "/images/paenia/screenshot-presets.png",
    alt: "Paenia preset picker with theme list and palette swatches",
    label: "Preset picker",
    width: 3168,
    height: 2122,
    tone: "Start fast"
  },
  {
    src: "/images/paenia/screenshot-detailed.png",
    alt: "Paenia detailed mode showing exact VS Code color keys",
    label: "Detailed mode",
    width: 3168,
    height: 2122,
    tone: "Exact keys"
  },
  {
    src: "/images/paenia/screenshot-overrides.png",
    alt: "Paenia custom override badges in detailed mode",
    label: "Overrides",
    width: 3080,
    height: 2034,
    tone: "Precise adjustments"
  },
  {
    src: "/images/paenia/screenshot-targets.png",
    alt: "Paenia apply targets settings for supported editors",
    label: "Apply targets",
    width: 3168,
    height: 2122,
    tone: "Choose editors"
  },
  {
    src: "/images/paenia/screenshot-original-backups.png",
    alt: "Paenia original backup snapshot settings",
    label: "Original backups",
    width: 3080,
    height: 2034,
    tone: "Original snapshots"
  },
  {
    src: "/images/paenia/screenshot-regular-backups.png",
    alt: "Paenia regular backup list and restore controls",
    label: "Regular backups",
    width: 3168,
    height: 2122,
    tone: "Restore safely"
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
