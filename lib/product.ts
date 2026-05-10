export const screenshots = [
  {
    id: "dark",
    src: "/images/paenia/screenshot-dark.png",
    alt: "Paenia dark mode workspace with presets, palette editing, and live preview",
    kicker: "Overview",
    capTitle: "Dark workspace",
    capDesc: "Presets, palette, and live preview together — the main surface you work in."
  },
  {
    id: "light",
    src: "/images/paenia/screenshot-light.png",
    alt: "Paenia light mode workspace",
    kicker: "Theme",
    capTitle: "Light workspace",
    capDesc: "Chrome and syntax tuned for comfortable reading in daylight."
  },
  {
    id: "palette",
    src: "/images/paenia/screenshot-palette.png",
    alt: "Paenia palette editing with live preview",
    kicker: "Editing",
    capTitle: "Palette mode",
    capDesc: "Shape base colors and tokens while the IDE preview updates beside you."
  }
] as const;

export const proofPoints = [
  {
    title: "78 presets",
    body: "Curated dark, light, and minimal starting points."
  },
  {
    title: "Live preview",
    body: "Workbench and syntax before anything is written to disk."
  },
  {
    title: "Safe apply",
    body: "Confirm, snapshot, patch, and validate every write."
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
    body: "Edit base colors (bg0, accent, blue, green, red, purple) or override individual workbench keys."
  },
  {
    title: "Presets and personal themes",
    body: "Start from curated presets, save your own snapshots, and reload them anytime."
  },
  {
    title: "Target-aware apply",
    body: "Cursor can receive full theme and Glass tint settings. Other editors receive color customizations so their theme stays intact."
  },
  {
    title: "Custom editor paths",
    body: "Add compatible settings.json locations with validation before Paenia writes anything."
  }
] as const;

export const workflowShowcases = [
  {
    label: "Workflow",
    title: "Presets first, precision when you need it.",
    body: "Palette mode and Detailed mode stack cleanly: tune the base system, then override individual workbench keys only where it matters.",
    images: [
      {
        src: "/images/paenia/screenshot-presets.png",
        alt: "Preset picker",
        kicker: "Workflow",
        capTitle: "Preset library",
        capDesc: "Search, filter, and open a direction without leaving the main window."
      },
      {
        src: "/images/paenia/screenshot-detailed.png",
        alt: "Detailed mode",
        kicker: "Workflow",
        capTitle: "Workbench keys",
        capDesc: "Fine-tune exact color keys when you need surgical control over the UI."
      },
      {
        src: "/images/paenia/screenshot-overrides.png",
        alt: "Overrides",
        kicker: "Workflow",
        capTitle: "Your overrides",
        capDesc: "Badges mark customized keys so the diff between preset and reality stays obvious."
      }
    ]
  },
  {
    label: "Targets",
    title: "Choose where the theme lands.",
    body: "Cursor, VS Code, Antigravity, Trae, and custom paths stay visible with status before any write — the marketing surface matches the confirmation UI.",
    images: [
      {
        src: "/images/paenia/screenshot-targets.png",
        alt: "Apply targets",
        kicker: "Apply",
        capTitle: "Where the theme lands",
        capDesc: "Each editor shows its settings path and state — you confirm targets before Paenia writes."
      }
    ]
  },
  {
    label: "Backups",
    title: "Recovery is designed in.",
    body: "Original snapshots and rolling backups are first-class screens — visitors see restore and retention before they download.",
    images: [
      {
        src: "/images/paenia/screenshot-original-backups.png",
        alt: "Original backups",
        kicker: "Safety",
        capTitle: "Original snapshots",
        capDesc: "Baseline copies of each target file — your safety net before deeper edits."
      },
      {
        src: "/images/paenia/screenshot-regular-backups.png",
        alt: "Regular backups",
        kicker: "Safety",
        capTitle: "Backup history",
        capDesc: "Rolling list of successful applies with retention you control — restore without drama."
      }
    ]
  }
] as const;

export const galleryImages = [
  {
    src: "/images/paenia/screenshot-dark.png",
    alt: "Paenia dark workspace with palette editing and live preview",
    width: 2838,
    height: 2012,
    size: "featured" as const,
    kicker: "Overview",
    capTitle: "Dark workspace",
    capDesc: "The full layout: navigation, editor, and preview without decorative crops."
  },
  {
    src: "/images/paenia/screenshot-light.png",
    alt: "Light preset workspace",
    width: 2838,
    height: 2012,
    size: "rail" as const,
    kicker: "Theme",
    capTitle: "Light workspace",
    capDesc: "A bright preset with balanced chrome and syntax contrast."
  },
  {
    src: "/images/paenia/screenshot-palette.png",
    alt: "Palette editing",
    width: 2926,
    height: 2100,
    size: "rail" as const,
    kicker: "Editing",
    capTitle: "Palette controls",
    capDesc: "Dial in accents and token colors with immediate visual feedback."
  },
  {
    src: "/images/paenia/screenshot-presets.png",
    alt: "Preset picker",
    width: 3168,
    height: 2122,
    size: "rail" as const,
    kicker: "Library",
    capTitle: "Preset picker",
    capDesc: "Browse dark, light, and minimal starts — search and filter in one list."
  },
  {
    src: "/images/paenia/screenshot-detailed.png",
    alt: "Detailed mode",
    width: 3168,
    height: 2122,
    size: "rail" as const,
    kicker: "Precision",
    capTitle: "Detailed keys",
    capDesc: "Edit individual VS Code workbench keys when palette-level control is not enough."
  },
  {
    src: "/images/paenia/screenshot-overrides.png",
    alt: "Overrides",
    width: 3080,
    height: 2034,
    size: "rail" as const,
    kicker: "Custom",
    capTitle: "Override badges",
    capDesc: "See which keys you have touched — no guesswork in a long list."
  },
  {
    src: "/images/paenia/screenshot-targets.png",
    alt: "Apply targets",
    width: 3168,
    height: 2122,
    size: "rail" as const,
    kicker: "Apply",
    capTitle: "Editor targets",
    capDesc: "Pick Cursor, VS Code, and compatible apps — paths and readiness before any write."
  },
  {
    src: "/images/paenia/screenshot-original-backups.png",
    alt: "Original backups",
    width: 3080,
    height: 2034,
    size: "rail" as const,
    kicker: "Safety",
    capTitle: "Original snapshots",
    capDesc: "First-line restore points captured before your theme changes stack up."
  },
  {
    src: "/images/paenia/screenshot-regular-backups.png",
    alt: "Regular backups",
    width: 3168,
    height: 2122,
    size: "rail" as const,
    kicker: "History",
    capTitle: "Rolling backups",
    capDesc: "Recent applies kept in order — restore a known-good settings.json in one step."
  }
] as const;

export const safetyPillars = [
  {
    title: "Confirm before Apply",
    hint: "Review targets and paths in a modal — nothing writes until you agree."
  },
  {
    title: "Backup on success",
    hint: "Snapshots are taken when a write succeeds, so you can roll back with confidence."
  },
  {
    title: "Brace-balanced patches",
    hint: "Only the color sections are merged; the file is validated before it hits disk."
  },
  {
    title: "Restore from snapshots",
    hint: "Original and rolling backups are first-class — recovery is part of the product."
  },
  {
    title: "Retention per editor",
    hint: "Recent backups are kept tidy per target so lists stay readable."
  }
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
  "Custom path"
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
      "Cursor, Visual Studio Code, Antigravity, Trae, Windsurf, VSCodium, Kiro, Positron, Code - OSS, and custom compatible User/settings.json paths."
  },
  {
    question: "Does Paenia overwrite my whole settings file?",
    answer:
      "It patches color customization sections instead of replacing the file, and checks brace balance before writing."
  },
  {
    question: "Is there a backup before applying?",
    answer:
      "Yes — target settings.json files are snapshotted before successful writes, with restore workflows for backups."
  },
  {
    question: "Does Paenia support Cursor Glass tint?",
    answer:
      "Yes. Cursor can receive the full theme configuration plus Glass tint settings. Other editors receive color customizations."
  },
  {
    question: "What macOS version is required?",
    answer: "macOS 13 or newer."
  },
  {
    question: "Where can I download Paenia?",
    answer: "Use the download page; the DMG link will appear there when the release is ready."
  }
] as const;
