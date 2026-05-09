"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { screenshots } from "@/lib/product";

type ScreenshotId = (typeof screenshots)[number]["id"];

export function HeroShowcase() {
  const [active, setActive] = useState<ScreenshotId>("dark");
  const activeScreenshot = useMemo(
    () => screenshots.find((screenshot) => screenshot.id === active) ?? screenshots[0],
    [active]
  );

  return (
    <div className="hero-showcase" data-active={active} aria-label="Interactive Paenia screenshots">
      {screenshots.map((screenshot) => (
        <button
          key={screenshot.id}
          className="hero-shot"
          data-shot={screenshot.id}
          type="button"
          onClick={() => setActive(screenshot.id)}
          aria-pressed={active === screenshot.id}
        >
          <Image src={screenshot.src} alt={screenshot.alt} fill sizes="(max-width: 900px) 88vw, 620px" priority={screenshot.id === "dark"} />
          <span>{screenshot.label}</span>
        </button>
      ))}
      <div className="hero-showcase-meta" aria-live="polite">
        <h2>{activeScreenshot.title}</h2>
        <p>{activeScreenshot.body}</p>
      </div>
      <div className="hero-showcase-picker" aria-label="Choose hero screenshot">
        {screenshots.map((screenshot) => (
          <button
            key={screenshot.id}
            type="button"
            data-active={active === screenshot.id}
            onClick={() => setActive(screenshot.id)}
            aria-label={`Show hero ${screenshot.label}`}
          >
            <span />
            {screenshot.label}
          </button>
        ))}
      </div>
    </div>
  );
}
